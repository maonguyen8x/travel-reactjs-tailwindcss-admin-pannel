import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COLORS, ROUTERS, FOOD_DETAIL_TYPE, EVENTS } from 'app/constants';
import {
  getDataFoodDetail,
  formatTime,
  getTitleHeaderFoodView,
  getPhotoPostByUser,
  showConfirmDeletePageFoodPopup,
} from 'app/utils';
import Images from 'app/assets/images';
import NoDataView from 'app/components/View/NoDataView';
import { t } from 'app/i18n';
import debounce from 'lodash/debounce';
import { EventRegister } from 'app/services/EventRegister';
import { IProps } from './DetailFoodPage.type';

const FormFood = (props: IProps) => {
  const {
    getFoodPageById,
    history,
    foodPageDetail,
    match,
    lockPage,
    delPage,
  } = props;
  const paramsId = match?.params?.id;

  const ref: any = useRef(null);

  const [state, setState] = useState({
    data: [{}, {}, {}],
    offset: 10,
    switchType: FOOD_DETAIL_TYPE.FOLLOWING,
    isShowModalMenu: false,
    isShowModalView: false,
    count: 0,
    fetching: false,
  });

  const {
    isShowModalMenu,
    isShowModalView,
    switchType,
    offset,
    count,
    fetching,
  } = state;

  useEffect(() => {
    getFoodPageById(paramsId);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockPage(data.id, { reason: data.reason, detail: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [paramsId]);

  const onToggleModalMenu = (id: any) => {
    setState({
      ...state,
      isShowModalMenu: !isShowModalMenu,
    });
  };

  const onToggleModalView = (id: any) => {
    setState({
      ...state,
      isShowModalView: !isShowModalView,
    });
  };

  const onGetListFollowingByFood = async () => {
    const data = await getFoodPageById(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: FOOD_DETAIL_TYPE.FOLLOWING,
      fetching: true,
    });
  };

  const onGetListPostByFood = async () => {
    const data = await getFoodPageById(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: FOOD_DETAIL_TYPE.POST,
      fetching: true,
    });
  };

  const onGetListMenuByFood = async () => {
    const data = await getFoodPageById(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: FOOD_DETAIL_TYPE.MENU,
      fetching: true,
    });
  };

  const onGetListServiceByFood = async () => {
    const data = await getFoodPageById(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: FOOD_DETAIL_TYPE.SERVICE,
      fetching: true,
    });
  };

  const onGetListMReviewByFood = async () => {
    const data = await getFoodPageById(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: FOOD_DETAIL_TYPE.REVIEW,
      fetching: true,
    });
  };

  const onDetailOwner = () => () => {
    history?.push(ROUTERS.USER_DETAIL.replace(':id', foodPageDetail?.userId));
  };

  const renderRestaurant = () => {
    const DATA = [
      {
        key: t('food.name'),
        value: foodPageDetail?.name,
        titleColor: COLORS.T_TEXT_DEFAULT,
        bold: true,
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
              className={`break-all ml-12 text-default w-60 font-semibold ${
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

  const renderListFollowingByFood = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <>
        <div className="bg-white p-3 mb-10-2 border-4 w-full">
          {getDataFoodDetail(foodPageDetail)?.map(
            (items: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col my-3 cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-0">
                      <div className="relative">
                        <img
                          className="w-40 h-40 rounded-md bg-cover"
                          src={
                            items?.urlTiny ||
                            items?.backgroundPost?.url ||
                            items?.sourcePost?.backgroundPost?.url ||
                            Images.noDisplay.default
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </>
    );
  };

  const renderListPostByFood = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        {getDataFoodDetail(foodPageDetail)?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3 cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-md bg-cover"
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
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="h-full flex flex-col justify-between"></div>
                </div>
              </div>
            </div>
          );
        })}

        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  const renderListMenuByFood = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        {getDataFoodDetail(foodPageDetail)?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3 cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-md bg-cover"
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
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="h-full flex flex-col justify-between"></div>
                </div>
              </div>
            </div>
          );
        })}

        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  const renderListServiceByFood = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        {getDataFoodDetail(foodPageDetail)?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3 cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-md bg-cover"
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
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="h-full flex flex-col justify-between"></div>
                </div>
              </div>
            </div>
          );
        })}

        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  const renderListReviewByFood = () => {
    if (!count)
      return (
        <div className="bg-white p-3 mb-10-2 border-4 w-full min-h-40vh">
          {fetching && <NoDataView />}
        </div>
      );
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        {getDataFoodDetail(foodPageDetail)?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3 cursor-pointer"
              onClick={() => {}}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-md bg-cover"
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
                  </div>
                </div>
                <div className="flex flex-1">
                  <div className="h-full flex flex-col justify-between"></div>
                </div>
              </div>
            </div>
          );
        })}

        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  const onSwitchView = (type: string) => {
    switch (type) {
      case FOOD_DETAIL_TYPE.FOLLOWING:
        return renderListFollowingByFood();
      case FOOD_DETAIL_TYPE.POST:
        return renderListPostByFood();
      case FOOD_DETAIL_TYPE.MENU:
        return renderListMenuByFood();
      case FOOD_DETAIL_TYPE.SERVICE:
        return renderListServiceByFood();
      case FOOD_DETAIL_TYPE.REVIEW:
        return renderListReviewByFood();
      default:
        return null;
    }
  };

  const renderInformation = useCallback(() => {
    const DATA = [
      {
        key: t('food.address'),
        value: foodPageDetail?.location?.formatedAddress,
      },
      {
        key: t('food.creator'),
        value: foodPageDetail?.user?.name,
        color: COLORS.T_BLUE,
        bold: true,
        url: foodPageDetail?.avatar?.url,
        onDetail: () =>
          history.push(
            ROUTERS.USER_DETAIL.replace(':id', foodPageDetail?.userId)
          ),
      },
      {
        key: t('food.created'),
        value: formatTime(foodPageDetail?.createdAt),
      },
      {
        key: t('food.average'),
        value: 'Waiting for BE' || 0,
      },
      {
        key: t('food.average.jgo'),
        value: '' || 0,
      },
      {
        key: t('food.total_followings'),
        value: foodPageDetail?.user?.totalFollowing || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListFollowingByFood(),
      },
      {
        key: t('food.detail.total_posts'),
        value: foodPageDetail?.totalFollowing || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListPostByFood(),
      },
      {
        key: t('food.detail.menu'),
        value: 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListMenuByFood(),
      },
      {
        key: t('food.detail.service.no'),
        value: 'waiting for BE' || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListServiceByFood(),
      },
      {
        key: t('food.detail.review.no'),
        value: foodPageDetail?.location?.totalReview || 0,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListMReviewByFood(),
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
                className={`flex justify-start items-center w-full text-${items?.titleColor}`}
              >
                {items?.key}
              </span>
              <span
                className={`flex justify-end items-center w-full break-all text-${
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
  }, [foodPageDetail]);

  const onLockFoodPage = () => () => {
    if (!props?.foodPageDetail?.blockMessage) {
      props?.LOCK_FOOD(paramsId);
    } else {
      props?.UN_LOCK_FOOD(paramsId);
    }
  };

  const onDeleteFoodPage = () => () => {
    showConfirmDeletePageFoodPopup(paramsId, delPage, true);
  };

  const onScrollListPostByUser = debounce(
    async () => {
      if (
        ref.current.offsetHeight + ref.current.scrollTop ===
          ref.current.scrollHeight &&
        offset <= Math.floor(count / 10) * 10
      ) {
        //
      }
    },
    300,
    {
      leading: true,
    }
  );

  const renderHeader = () => {
    return (
      <div className="flex justify-between border-b-2 border-white py-3">
        <div className="space-x-10">
          <span
            className={`text-default text-2xl font-medium cursor-pointer p-3 ${
              switchType === FOOD_DETAIL_TYPE.REVIEW && 'bg-blue-100'
            }`}
          >
            {getTitleHeaderFoodView(switchType)}
          </span>
          {switchType === FOOD_DETAIL_TYPE.REVIEW && (
            <>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('food.detail.review.high')}
              </span>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('food.detail.review.low')}
              </span>
            </>
          )}
        </div>
        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  return (
    <div className="">
      <div className={'flex flex-row items-center justify-between pb-16 '}>
        <div className=""></div>
        <div className="flex flex-row items-center justify-center">
          <span className="pr-2">
            <button
              className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={onLockFoodPage()}
            >
              {foodPageDetail?.blockMessage
                ? t('food.un_block')
                : t('food.block')}
            </button>
          </span>
          <span>
            <button
              className="bg-gray-400 py-3 px-10 text-white text-xl shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={onDeleteFoodPage()}
            >
              {t('activity.delete')}
            </button>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="px-6 border-r">
          <div className="flex flex-wrap">
            <div className="w-32">
              <img
                className="w-32 h-32 rounded-full shadow"
                src={foodPageDetail?.avatar?.url}
                alt="avatar"
              />
            </div>
            <div className="flex flex-1 flex-col pl-4 py-5">
              {renderRestaurant()}
            </div>
          </div>

          {renderInformation()}

          <div className="flex justify-between items-center my-3">
            <span className="flex justify-start items-center w-full">
              {t('food.detail.verify')}
              <i className="fas fa-shield-alt bg-red-500 mx-3 p-2 rounded-full text-white cursor-pointer" />
            </span>
            <span className="flex justify-end items-center w-full">
              {foodPageDetail?.isActive
                ? t('food.verified')
                : t('food.canceled')}
            </span>
          </div>
          <div className="flex justify-between items-center py-6">
            <span
              className={
                'flex justify-start items-center w-full font-semibold text-default text-2xl'
              }
            >
              {t('food.detail.intro')}
            </span>
          </div>
          <div>
            <span className="">
              {foodPageDetail?.introduction || 'Waiting for BE'}
            </span>
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
export default FormFood;
