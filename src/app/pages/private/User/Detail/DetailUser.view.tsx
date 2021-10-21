import React, {
  useState,
  useEffect,
  useRef,
  memo,
  useLayoutEffect,
} from 'react';
import {
  VND,
  ROUTERS,
  POST_TYPES,
  DASHBOARD_TYPES,
  MY_MAP_TYPES,
  EVENTS,
} from 'app/constants';
import {
  checkPageTypes,
  formatDay,
  formatTime,
  getMyMapType,
  getStatusOrderTour,
  getPhotoPostByUser,
  getTitleHeaderView,
  formatMoney,
  getTotalCount,
  getTypeUsers,
} from 'app/utils';
import { t } from 'app/i18n';
import ModalPost from 'app/components/ModalPost';
import debounce from 'lodash/debounce';
import Images from 'app/assets/images';
import NoDataView from 'app/components/View/NoDataView';
import Breadcrunb from 'app/components/layout/Header/SubHeader/Breadcrumb';
import { EventRegister } from 'app/services/EventRegister';
import {
  getListPostByUser,
  getListLocationByUser,
  getListWishListByUser,
  getListPlanByUser,
  getListBoobmarkLocationByUser,
} from './service';

const FormUser = (props: any) => {
  const {
    userDetail,
    getUserById,
    listBooking,
    listPage,
    getPostById,
    postDetail,
    listPost,
    history,
    lockUser,
  } = props;

  const id = props.match.params?.id;

  const ref: any = useRef(null);

  const [state, setState]: any = useState({
    data: [{}, {}, {}],
    fetching: false,
    offset: 10,
    isShowModal: false,
    count: 0,
    switchType: DASHBOARD_TYPES.POST,
    listLocation: [{}, {}, {}],
    wishList: [{}, {}, {}],
    listPlan: [{}, {}, {}],
    customListPage: null,
  });

  const {
    data,
    isShowModal,
    count,
    switchType,
    listLocation,
    fetching,
    listPlan,
    customListPage,
    offset,
  } = state;

  const onLockUser = () => {
    if (!props?.userDetail?.blockMessage) {
      props?.LOCK_USER();
    } else {
      props?.UN_LOCK_USER();
    }
  };

  const onGetListPostByUser = async () => {
    const result = await getListPostByUser(id);
    setState({
      ...state,
      data: result?.data,
      count: result?.count,
      fetching: true,
      switchType: DASHBOARD_TYPES.POST,
      offset: 10,
    });
    ref.current.scrollTop = 0;
  };

  const onGetListPlanByUser = async () => {
    const resultPlan = await getListPlanByUser(id);
    setState({
      ...state,
      listPlan: resultPlan?.data,
      count: resultPlan?.count,
      switchType: DASHBOARD_TYPES.PLAN,
      fetching: true,
      offset: 10,
    });
    ref.current.scrollTop = 0;
  };

  const onGetListLocationByUser = async () => {
    const resultLocation = await getListLocationByUser(id);
    setState({
      ...state,
      listLocation: resultLocation?.data,
      count: resultLocation?.count,
      switchType: DASHBOARD_TYPES.LOCATION,
      fetching: true,
      offset: 10,
    });
    ref.current.scrollTop = 0;
  };

  const onGetListBookmarkLocationByUser = async () => {
    const resultBookmarkLocation = await getListBoobmarkLocationByUser(id);
    setState({
      ...state,
      listLocation: resultBookmarkLocation?.data,
      count: userDetail?.totalBookmarks,
      switchType: DASHBOARD_TYPES.BOOKMARK,
      fetching: true,
      offset: 10,
    });
    ref.current.scrollTop = 0;
  };

  const onGetWishListByUser = async (type: string) => {
    const resultWishList = await getListWishListByUser(id);
    setState({
      ...state,
      listLocation: getMyMapType(resultWishList?.data, type),
      count: getTotalCount(resultWishList?.data, type),
      switchType: type,
      fetching: true,
    });
  };

  useLayoutEffect(() => {
    if (!!listPost?.count) {
      setState({
        ...state,
        data: listPost?.data,
        count: listPost?.count,
      });
    }
  }, [listPost?.count]);

  useEffect(() => {
    getUserById(id);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockUser(data.id, { reason: data.reason, detail: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [id]);

  const onToggleModal = (id: any) => {
    if (!!id) {
      getPostById(id);
    }
    setState({
      ...state,
      isShowModal: !isShowModal,
    });
  };

  const onDetailPlan = (id: string) => () => {
    history.push(ROUTERS.PLAN_DETAIL.replace(':id', id));
  };

  const onDetailLocation = (id: string) => () => {
    history.push(ROUTERS.LOCATION_DETAIL.replace(':id', id));
  };

  const onFilterPage = (type: string) => () => {
    const data = listPage?.data?.filter((items: any) => items?.type === type);
    setState({
      ...state,
      customListPage: data,
    });
  };

  const renderInformation = () => {
    const DATA_INFOR = [
      {
        key: t('user.birthday'),
        value: !!userDetail?.profiles?.birthday?.birthday
          ? formatDay(userDetail?.profiles?.birthday?.birthday)
          : '',
      },

      {
        key: t('user.gender'),
        value: getTypeUsers(userDetail?.profiles?.gender?.gender),
      },
      {
        key: t('user.job'),
        value: userDetail?.profiles?.work?.work,
      },
      {
        key: t('user.created'),
        value: formatTime(userDetail?.createdAt),
      },
      {
        key: t('user.email'),
        value: userDetail?.email?.email,
      },
      {
        key: t('user.phone'),
        value: userDetail?.profiles?.phone?.phone,
      },
      {
        key: t('user.web'),
        value: userDetail?.profiles?.website?.website,
      },
      {
        key: t('user.address'),
        value: userDetail?.profiles?.address?.address,
      },
    ];

    return (
      <>
        {DATA_INFOR.map((items: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-center my-7">
              <span className="flex justify-start items-center font-semibold w-full">
                {items?.key}
              </span>
              <span className="flex justify-end w-full">{items?.value}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderUserCreated = () => {
    const DATA_USER_CREATED = [
      {
        key: t('user.created.location'),
        value: userDetail?.totalLocations,
        active: true,
        path: () => onGetListLocationByUser(),
      },
      {
        key: t('user.created.location_complete'),
        value: userDetail?.totalCompleted,
        active: true,
        path: () => onGetWishListByUser(MY_MAP_TYPES.HAD_CAME),
      },
      {
        key: t('user.created.location_wish_list'),
        value: userDetail?.totalWishList,
        active: true,
        path: () => onGetWishListByUser(MY_MAP_TYPES.WISH_CAME),
      },
      {
        key: t('user.created.place'),
        value: userDetail?.totalBookmarks,
        active: true,
        path: () => onGetListBookmarkLocationByUser(),
      },
      {
        key: t('user.created.plans'),
        value: userDetail?.totalPlans,
        active: true,
        path: () => onGetListPlanByUser(),
      },
      {
        key: t('user.created.posts'),
        value: userDetail?.totalPosts,
        active: true,
        path: () => onGetListPostByUser(),
      },
      {
        key: t('user.created.blocked'),
        value: userDetail?.totalBlockedOtherUser,
        active: false,
      },
      {
        key: t('user.created.block'),
        value: userDetail?.totalBlockedByOtherUser,
        active: false,
      },
    ];

    return (
      <>
        {DATA_USER_CREATED.map((items: any, index: number) => (
          <div
            className="flex justify-between items-center mb-8"
            key={index}
            onClick={items?.path}
          >
            <span
              className={`font-semibold ${
                items?.active && 'text-blue-400 cursor-pointer'
              }`}
            >
              {items?.key}
            </span>
            <span
              className={`${items?.active && 'text-blue-400 cursor-pointer'}`}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  const renderfamousSocial = () => {
    const DATA = [
      {
        key: t('user.name'),
        value: userDetail?.name,
        style: true,
      },
      {
        key: t('user.follower'),
        value: userDetail?.totalFollower,
      },
      {
        key: t('user.followings'),
        value: userDetail?.totalFollowing,
      },
    ];
    return (
      <>
        {DATA.map((item: any, index: number) => (
          <div className="flex items-start justify-between mt-2" key={index}>
            <span className="break-all font-semibold text-default">
              {item?.key}
            </span>
            <span
              className={`break-all ml-12 text-default ${
                item?.style && 'font-semibold'
              }`}
            >
              {item?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  const onScrollListView = debounce(
    async () => {
      if (
        ref.current.offsetHeight + ref.current.scrollTop ===
          ref.current.scrollHeight &&
        offset <= Math.floor(count / 10) * 10
      ) {
        if (switchType === DASHBOARD_TYPES.POST) {
          const result = await getListPostByUser(id, offset);
          setState({
            ...state,
            data: data?.concat(result?.data),
            offset: offset + 10,
          });
        }
        if (switchType === DASHBOARD_TYPES.LOCATION) {
          const result = await getListLocationByUser(id, offset);
          setState({
            ...state,
            listLocation: listLocation?.concat(result?.data),
            offset: offset + 10,
          });
        }
        if (switchType === DASHBOARD_TYPES.PLAN) {
          const result = await getListPlanByUser(id, offset);
          setState({
            ...state,
            listPlan: listPlan?.concat(result?.data),
            offset: offset + 10,
          });
        }
        if (switchType === DASHBOARD_TYPES.BOOKMARK) {
          const result = await getListBoobmarkLocationByUser(id, offset);
          setState({
            ...state,
            listLocation: listLocation?.concat(result?.data),
            offset: offset + 10,
          });
        }
      }
    },
    300,
    {
      leading: true,
    }
  );

  const onSwitchView = (type: string) => {
    switch (type) {
      case DASHBOARD_TYPES.POST:
        return renderListPostsCreated();
      case DASHBOARD_TYPES.LOCATION:
        return renderLocationCreated();
      case MY_MAP_TYPES.WISH_CAME:
        return renderLocationCreated();
      case MY_MAP_TYPES.HAD_CAME:
        return renderLocationCreated();
      case DASHBOARD_TYPES.BOOKMARK:
        return renderLocationCreated();
      case DASHBOARD_TYPES.PLAN:
        return renderListPlanCreated();
      default:
        return null;
    }
  };

  const renderListPostsCreated = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        {data?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3"
              onClick={() => onToggleModal(items?.id)}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-20 h-20 rounded-md bg-cover"
                      src={
                        mediaContents?.[0]?.urlTiny ||
                        items?.backgroundPost?.url ||
                        items?.sourcePost?.backgroundPost?.url ||
                        Images.noDisplay.default
                      }
                    />
                    {mediaContents?.length > 1 && (
                      <div className="absolute left-1 bottom-0 text-white text-sm">
                        <i className="far fa-clone" />
                      </div>
                    )}
                    {items?.postType === POST_TYPES.SHARED && (
                      <div className="absolute top-0 right-1 text-white text-sm">
                        <i className="far fa-paper-plane" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <span className="cursor-pointer font-medium text-blue-400 limit-rows">
                      {items?.content}
                    </span>
                    <div className="flex justify-between mt-2 space-x-10">
                      <div className="text-gray-600 space-x-6">
                        <i className="far fa-heart">&#160;{items?.totalLike}</i>
                        <i className="far fa-comment">
                          &#160;{items?.totalComment}
                        </i>
                        <i className="far fa-paper-plane">
                          &#160;{items?.totalShare}
                        </i>
                        <i className="fas fa-poll">
                          &#160;{items?.totalRanking}
                        </i>
                      </div>
                      <span className="text-gray-400 text-lg">
                        {formatTime(items?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderLocationCreated = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
        {listLocation?.map((items: any, index: number) => (
          <div className="mb-2" key={index}>
            <span className="font-semibold">{index + 1}/ </span>
            <span
              className="font-semibold text-blue-400 break-all cursor-pointer"
              onClick={onDetailLocation(items?.id)}
            >
              {items?.name || items?.location?.name}
            </span>
            <div className="flex flex-col ml-5">
              <span className="italic">
                {items?.formatedAddress || items?.location?.formatedAddress}
              </span>
              <span className="text-lg text-gray-400">
                {formatTime(items?.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListPlanCreated = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-2 m-1 min-h-40vh">
        <table className="border-collapse border w-full h-auto">
          <thead>
            <tr className="bg-tab-active text-white text-xl">
              <th className="border p-3">{t('plan.name')}</th>
              <th className="border p-3">{t('plan.go')}</th>
              <th className="border p-3">{t('plan.back')}</th>
            </tr>
          </thead>
          {listPlan?.map((items: any, index: number) => (
            <tbody key={index}>
              <tr onClick={onDetailPlan(items?.id)}>
                <td className="border text-lg text-blue-400 font-semibold p-3">
                  {items?.planName}
                </td>
                <td className="border text-lg p-3">
                  {formatDay(items?.startDate)}
                </td>
                <td className="border text-lg p-3">
                  {formatDay(items?.endDate)}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <span className="text-default text-2xl font-medium">
          {getTitleHeaderView(switchType)}
        </span>
        <span className="text-default font-medium">{count}</span>
      </>
    );
  };

  return (
    <div>
      <div className={'flex flex-row items-center justify-between pb-16 '}>
        <Breadcrunb path={''} subPath={''} highlight={''} />
        <div className="flex flex-row items-center justify-center">
          <button
            className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={onLockUser}
          >
            {props?.userDetail?.blockMessage
              ? t('user.un_block')
              : t('user.block')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="px-6 border-r">
          <div className="flex flex-wrap">
            <div className="w-32">
              <img
                className="w-32 h-32 rounded-full shadow"
                src={userDetail?.profiles?.avatars?.mediaContent?.url}
                alt="avatar"
              />
            </div>

            <div className="flex flex-1 flex-col pl-4">
              <span className="text-right text-danger font-weight-bold text-sm">
                {`${t('user.id')}: ${userDetail?.id || 0}`}
              </span>
              {renderfamousSocial()}
            </div>
          </div>
          {renderInformation()}
          <div>
            <span className="flex justify-start items-center font-semibold w-full">
              {t('user.intro')}
            </span>
          </div>
          <div className="my-2">
            <span className="flex justify-end w-full">
              {userDetail?.profiles?.introduce?.introduce}
            </span>
          </div>
        </div>
        <div className="px-6">
          <div className="min-h-40vh mb-10">{renderUserCreated()}</div>
          <div className="py-10">
            <div className="flex justify-between items-end">
              <span className="text-default text-2xl font-semibold">
                {t('user.created.page')}
              </span>
              <span>{listPage?.count || 0}</span>
            </div>
            <div className="my-2 space-x-2">
              <button
                className="bg-yellow-500 text-white text-xl py-2 px-3 rounded-lg"
                onClick={onFilterPage(DASHBOARD_TYPES.STAY)}
              >
                {t('user.stay')}
              </button>
              <button
                className="bg-red-500 text-white text-xl py-2 px-3 rounded-lg"
                onClick={onFilterPage(DASHBOARD_TYPES.FOOD)}
              >
                {t('user.food')}
              </button>
              <button
                onClick={onFilterPage(DASHBOARD_TYPES.TOUR)}
                className="bg-blue-500 text-white text-xl py-2 px-3 rounded-lg"
              >
                {t('user.tour')}
              </button>
            </div>
            <div className="overflow-y-scroll min-h-40vh max-h-40vh">
              {(customListPage || listPage?.data)?.map(
                (items: any, index: number) => (
                  <div
                    className="flex flex-1 flex-row items-center flex-wrap mt-3"
                    key={index}
                  >
                    <img
                      style={{
                        backgroundImage: `url(${items?.avatarMedia?.url})`,
                      }}
                      className={`ring-${checkPageTypes(
                        items?.type
                      )} w-20 h-20 bg-cover ring-2 rounded-full m-1 flex flex-0 `}
                    />
                    <div className="px-2 flex flex-1 flex-col">
                      <span className="text-blue-400 font-semibold limit-rows break-all">
                        {items?.name}
                      </span>
                      <div className="text-gray-500 space-x-2">
                        <i className="fas fa-poll">
                          &#160;&#160;{items?.totalReview}&#160;&#160;
                        </i>
                        <i className="fas fa-user-plus">
                          &#160;&#160;{items?.totalFollow}&#160;&#160;
                        </i>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="px-6">
          <div>
            <div className="bg-gray-200 p-2 w-full flex justify-between items-center">
              {renderHeader()}
            </div>
            <div
              className="bg-gray-200 min-h-40vh max-h-40vh  overflow-y-scroll"
              ref={ref}
              onScroll={() => onScrollListView()}
            >
              {onSwitchView(switchType)}
              <ModalPost
                isShowModal={isShowModal}
                toggle={() => onToggleModal('')}
                data={postDetail}
              />
            </div>
          </div>
          <div className="py-10">
            <div className="flex justify-between items-end">
              <span className="text-default text-2xl font-semibold">
                {t('user.created.booking')}
              </span>
              <span>{listBooking?.length || 0}</span>
            </div>
            <div className="mt-10 overflow-y-scroll min-h-40vh max-h-40vh">
              {listBooking?.map((items: any, index: number) => (
                <div
                  className="flex flex-row items-center space-x-3 mt-3"
                  key={index}
                >
                  <img
                    style={{
                      backgroundImage: `url(${items?.service?.page?.avatarMedia.urlTiny})`,
                    }}
                    className={'w-20 h-20 bg-cover rounded-full flex flex-0 '}
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-blue-400 font-semibold truncate">
                      {items?.service?.name}
                    </span>
                    <div className="sub-time">
                      <span className="py-1 pr-2">
                        {`${formatDay(
                          items?.tourReservation?.startDate
                        )} - ${formatDay(items?.tourReservation?.endDate)}`}
                      </span>
                      <span className="px-2">
                        {getStatusOrderTour(items?.status)}
                      </span>
                      <span className="py-1 pr-2 font-semibold">
                        {formatMoney(VND, items?.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FormUser);
