import React, { useEffect, useState, useCallback } from 'react';
import {
  formatTime,
  getTitleHeaderActivityView,
  getPhotoPostByUser,
  showConfirmDeleteActivityPopup,
} from 'app/utils';
import { COLORS, ROUTERS, ACTIVITY_POST_TYPES, EVENTS } from 'app/constants';
import Breadcrunb from 'app/components/layout/Header/SubHeader/Breadcrumb';
import Images from 'app/assets/images';
import NoDataView from 'app/components/View/NoDataView';
import { t } from 'app/i18n';
import { getActivityById } from 'app/store/sagas/ActivitiesSaga';
import { formatTimeNow } from 'app/utils';
import { EventRegister } from 'app/services/EventRegister';
import { IProps } from './DetailActivities.type';

const VerifiAccountDetail = (props: IProps) => {
  const {
    activitiesById,
    activitiesDetail,
    history,
    delActivity,
    lockActivity,
  } = props;

  const [state, setState] = useState({
    isShowMap: false,
    switchType: ACTIVITY_POST_TYPES.MEDIA,
    isShowModal: false,
    count: 0,
    fetching: false,
    data: [{}, {}, {}],
  });

  const { switchType, count, fetching } = state;
  const { id } = props.match.params;

  useEffect(() => {
    activitiesById(id);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockActivity(data.id, { reason: data.reason, detail: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onLockActivity = () => {
    if (!props?.activitiesDetail?.blockMessage) {
      props?.LOCK_ACTIVITY(id);
    } else {
      props?.UN_LOCK_ACTIVITY(id);
    }
  };

  const onDelete = (id: number) => () => {
    showConfirmDeleteActivityPopup(id, delActivity, true);
  };

  const onGetListMediaImagesByActivity = () => {
    const countImages = activitiesDetail?.mediaContents;
    setState({
      ...state,
      count: countImages?.length,
      switchType: ACTIVITY_POST_TYPES.MEDIA,
    });
  };

  const onGetListLikeByActivity = () => {
    const countLikeCommentShare =
      activitiesDetail?.totalLike +
      activitiesDetail?.totalComment +
      activitiesDetail?.totalShare;
    setState({
      ...state,
      count: countLikeCommentShare || 0,
      switchType: ACTIVITY_POST_TYPES.LIKE,
    });
  };

  const onGetListMemberJoinByActivity = () => {
    const participantCount = activitiesDetail?.participantCount;
    setState({
      ...state,
      count: participantCount?.length,
      switchType: ACTIVITY_POST_TYPES.MEMBER_JOIN,
    });
  };

  const renderInformationActivity = useCallback(() => {
    const DATA = [
      {
        key: t('activity.name'),
        value: activitiesDetail?.name,
        titleColor: COLORS.T_TEXT_DEFAULT,
        bold: true,
      },
      {
        key: t('activity.address'),
        value: activitiesDetail?.location?.formatedAddress,
      },
      {
        key: t('activity.creator'),
        value: activitiesDetail?.createdBy?.name,
        color: COLORS.T_BLUE,
        bold: true,
        url: activitiesDetail?.createdBy?.profiles?.avatars?.mediaContent?.url,
        onDetail: () =>
          history.push(
            ROUTERS.USER_DETAIL.replace(':id', activitiesDetail?.createdBy?.id)
          ),
      },
      {
        key: t('activity.created'),
        value: formatTime(activitiesDetail?.createdAt),
      },
      {
        key: t('activity.startDate'),
        value: formatTime(activitiesDetail?.from),
      },
      {
        key: t('activity.endDate'),
        value: formatTime(activitiesDetail?.to),
      },
      {
        key: t('activity.price'),
        value: `${activitiesDetail?.price} vnđ`,
      },
      {
        key: t('activity.status'),
        value: activitiesDetail?.status,
      },
      {
        key: t('activity.average'),
        value: activitiesDetail?.location?.averagePoint,
      },
      {
        key: t('activity.average.jgo'),
        value: 0,
      },
      {
        key: t('activity.image'),
        value: activitiesDetail?.mediaContents?.length || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListMediaImagesByActivity(),
      },
      {
        key: t('activity.count_member_join'),
        value: activitiesDetail?.participantCount || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListMemberJoinByActivity(),
      },
      {
        key: t('activity.like.share.comment'),
        value:
          activitiesDetail?.post?.totalComment +
            activitiesDetail?.post?.totalLike +
            activitiesDetail?.post?.totalShare || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListLikeByActivity(),
      },
    ];
    return (
      <>
        {DATA.map((items: any, index: number) => (
          <div key={index}>
            <div
              className={`flex justify-between items-center py-6 ${
                !!items?.titleColor && 'cursor-pointer'
              }`}
              onClick={!!items?.titleColor && items?.path}
            >
              <span
                className={`flex justify-start items-center w-full font-semibold text-${items?.titleColor}`}
              >
                {items?.key}
              </span>
              <span
                className={`flex justify-end items-center w-full text-${
                  items?.color
                } ${items?.bold && 'font-semibold'} ${
                  items?.url && 'cursor-pointer'
                }`}
                onClick={() => items?.url && items?.onDetail()}
              >
                {items?.value}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  }, [activitiesDetail]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between border-b-2 border-white py-3">
        <div className="space-x-10">
          {switchType === ACTIVITY_POST_TYPES.LIKE ||
          switchType === ACTIVITY_POST_TYPES.COMMENT ||
          switchType === ACTIVITY_POST_TYPES.SHARE ? (
            <>
              <span
                onClick={() =>
                  setState({ ...state, switchType: ACTIVITY_POST_TYPES.LIKE })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  switchType === ACTIVITY_POST_TYPES.LIKE && 'bg-blue-100'
                }`}
              >
                {t('activity.like')}
              </span>
              <span
                onClick={() =>
                  setState({
                    ...state,
                    switchType: ACTIVITY_POST_TYPES.COMMENT,
                  })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  switchType === ACTIVITY_POST_TYPES.COMMENT && 'bg-blue-100'
                }`}
              >
                {t('activity.comment')}
              </span>
              <span
                onClick={() =>
                  setState({ ...state, switchType: ACTIVITY_POST_TYPES.SHARE })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  switchType === ACTIVITY_POST_TYPES.SHARE && 'bg-blue-100'
                }`}
              >
                {t('activity.share')}
              </span>
            </>
          ) : (
            <span
              className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                (switchType === ACTIVITY_POST_TYPES.MEDIA ||
                  switchType === ACTIVITY_POST_TYPES.MEMBER_JOIN) &&
                'bg-blue-100'
              }`}
            >
              {getTitleHeaderActivityView(switchType)}
            </span>
          )}
        </div>
        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  const renderListImagesByActivity = () => {
    const dataMediaContents = activitiesDetail?.mediaContents || [];
    return (
      <>
        <div className="bg-white p-3 mb-10-2 border-4 w-full h-full">
          <div className="grid grid-cols-5 gap-6">
            {dataMediaContents?.map((items: any, index: number) => {
              return (
                <div key={index} className="" onClick={() => {}}>
                  <div className="flex flex-row space-x-3">
                    <img
                      className="w-60 h-60 rounded-md bg-cover"
                      src={
                        items?.urlTiny ||
                        items?.backgroundPost?.url ||
                        items?.sourcePost?.backgroundPost?.url ||
                        Images.noDisplay.default
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderListUsersJoinByActivity = () => {
    const listMembersJoin =
      activitiesDetail?.activityParticipants?.length > 0
        ? activitiesDetail?.activityParticipants
        : [
          <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
            {fetching && <NoDataView />}
          </div>,
          ];

    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="flex flex-row items-center space-x-3 mt-3">
          {listMembersJoin.map((items: any, index: number) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-4 py-3"
            >
              <img
                className="w-10 h-10 bg-cover rounded-full flex flex-0"
                src={
                  items?.user?.profiles?.avatars?.mediaContent?.urlTiny ||
                  items?.user?.profiles?.avatars?.mediaContent?.backgroundPost
                    ?.url ||
                  items?.user?.profiles?.avatars?.mediaContent?.sourcePost
                    ?.backgroundPost?.url
                }
              />
              <div className="flex flex-1 flex-col">
                <span className="text-blue-400 font-semibold truncate">
                  {items?.user?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListLikeByActivity = () => {
    const listLike = activitiesDetail?.post?.likes || [];
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="flex flex-row items-center space-x-3 mt-3">
          {listLike.map((items: any, index: number) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-4 py-3"
            >
              <img
                className="w-10 h-10 bg-cover rounded-full flex flex-0"
                src={
                  items?.user?.profiles?.avatars?.mediaContent?.urlTiny ||
                  items?.user?.profiles?.avatars?.mediaContent?.backgroundPost
                    ?.url ||
                  items?.user?.profiles?.avatars?.mediaContent?.sourcePost
                    ?.backgroundPost?.url
                }
              />
              <div className="flex flex-1 flex-col">
                <span className="text-blue-400 font-semibold truncate">
                  {items?.user?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListCommentByActivity = () => {
    const listComments = activitiesDetail?.post?.comments || [];
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="min-h-75vh max-h-75vh overflow-y-scroll">
          {listComments?.map((items: any, index: number) => (
            <div key={index}>
              <div className="flex flex-row items-start mt-4 mx-4 mb-16">
                <div
                  style={{
                    backgroundImage: `url(${items?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                  }}
                  className="w-20 h-20 bg-cover rounded-full mx-3"
                />
                <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                  <span className="text-2xl text-blue-400 font-medium">
                    {items?.user?.name}
                    {items?.totalLike > 0 && (
                      <span className="absolute right-5">
                        <i className="fas fa-heart mx-2 text-red-500" />
                        {items?.totalLike}
                      </span>
                    )}
                  </span>
                  <span className="mt-5">{items?.content}</span>
                  <span className="absolute -bottom-8">
                    {formatTimeNow(items?.createdAt)}
                  </span>
                </div>
              </div>
              {items?.childComments?.map((child: any, index: number) => (
                <div
                  className="flex flex-row items-start mt-5 mr-4 mb-16 ml-28"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `url(${child?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                    }}
                    className="w-20 h-20 bg-cover rounded-full mx-3"
                  />
                  <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                    <span className="text-2xl text-blue-400 font-medium">
                      {child?.user?.name}
                      {child?.totalLike > 0 && (
                        <span className="absolute right-5">
                          <i className="fas fa-heart mx-2 text-red-500" />
                          {child?.totalLike}
                        </span>
                      )}
                    </span>
                    <span className="mt-5">{child?.content}</span>
                    <span className="absolute -bottom-8">
                      {formatTimeNow(items?.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListShareByActivity = () => {
    const listShares = activitiesDetail?.post?.shares || [];
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="min-h-75vh max-h-75vh overflow-y-scroll">
          {listShares?.map((items: any, index: number) => (
            <div key={index}>
              <div className="flex flex-row items-start mt-4 mx-4 mb-16">
                <div
                  style={{
                    backgroundImage: `url(${items?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                  }}
                  className="w-20 h-20 bg-cover rounded-full mx-3"
                />
                <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                  <span className="text-2xl text-blue-400 font-medium">
                    {items?.user?.name}
                    {items?.totalLike > 0 && (
                      <span className="absolute right-5">
                        <i className="fas fa-heart mx-2 text-red-500" />
                        {items?.totalLike}
                      </span>
                    )}
                  </span>
                  <span className="mt-5">{items?.content}</span>
                  <span className="absolute -bottom-8">
                    {formatTimeNow(items?.createdAt)}
                  </span>
                </div>
              </div>
              {items?.childComments?.map((child: any, index: number) => (
                <div
                  className="flex flex-row items-start mt-5 mr-4 mb-16 ml-28"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `url(${child?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                    }}
                    className="w-20 h-20 bg-cover rounded-full mx-3"
                  />
                  <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                    <span className="text-2xl text-blue-400 font-medium">
                      {child?.user?.name}
                      {child?.totalLike > 0 && (
                        <span className="absolute right-5">
                          <i className="fas fa-heart mx-2 text-red-500" />
                          {child?.totalLike}
                        </span>
                      )}
                    </span>
                    <span className="mt-5">{child?.content}</span>
                    <span className="absolute -bottom-8">
                      {formatTimeNow(items?.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const onSwitchView = (type: string) => {
    switch (type) {
      case ACTIVITY_POST_TYPES.MEDIA:
        return renderListImagesByActivity();
      case ACTIVITY_POST_TYPES.MEMBER_JOIN:
        return renderListUsersJoinByActivity();
      case ACTIVITY_POST_TYPES.LIKE:
        return renderListLikeByActivity();
      case ACTIVITY_POST_TYPES.COMMENT:
        return renderListCommentByActivity();
      case ACTIVITY_POST_TYPES.SHARE:
        return renderListShareByActivity();
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className={'flex flex-row items-center justify-between pb-16 '}>
        <div className=""></div>
        <div className="flex flex-row items-center justify-center">
          <span className="pr-2">
            <button
              className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={onLockActivity}
            >
              {!!props?.activitiesDetail?.blockMessage
                ? t('activity.unblock')
                : t('activity.block')}
            </button>
          </span>
          <span>
            <button
              className="bg-gray-400 py-3 px-10 text-white text-xl shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={onDelete(props?.activitiesDetail?.id)}
            >
              {t('activity.delete')}
            </button>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-1 border-right px-4">
          {renderInformationActivity()}
          <div className="flex justify-between items-center py-6">
            <span
              className={
                'flex justify-start items-center w-full font-semibold text-default text-2xl'
              }
            >
              {t('activity.intro')}
            </span>
          </div>
          <div>
            <span className="">{activitiesDetail?.introduction}</span>
          </div>
        </div>

        <div className="col-span-2 mx-3 px-2 bg-gray-100">
          <div>{renderHeader()}</div>
          <div className="overflow-y-scroll max-h-full h-75vh">
            {onSwitchView(switchType)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiAccountDetail;
