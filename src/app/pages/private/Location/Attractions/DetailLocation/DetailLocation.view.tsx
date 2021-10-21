import React, { useState, useEffect, useCallback } from 'react';
import { t } from 'app/i18n';
import Modal from 'app/components/Modal';
import Map from 'app/components/GoogleMap/map';
import {
  formatTime,
  getPhotoPostByUser,
  getTitleHeaderLocationView,
} from 'app/utils';
import {
  COLORS,
  EVENTS,
  LOCATION_POST_TYPE,
  POST_TYPES,
  ROUTERS,
} from 'app/constants';
import Breadcrunb from 'app/components/layout/Header/SubHeader/Breadcrumb';
import { EventRegister } from 'app/services/EventRegister';
import Images from 'app/assets/images';
import NoDataView from 'app/components/View/NoDataView';
import { IProps } from './DetailLocation.type';
import { getListPostByLocationId } from './service';

const DATA = [
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
  {
    name: 'Manh Hoan',
  },
];

const LocationDetail = (props: IProps) => {
  const {
    match,
    getLocationById,
    locationDetail,
    history,
    lockLocation,
  } = props;

  const [state, setState] = useState({
    isShowMap: false,
    switchType: LOCATION_POST_TYPE.POST,
    data: [{}, {}, {}],
    count: 0,
    fetching: false,
  });

  const { isShowMap, switchType, count, data, fetching } = state;

  const paramsId = match?.params?.id;

  const onToggleModalMap = () => setState({ ...state, isShowMap: !isShowMap });

  const center = {
    lat: locationDetail?.latitude,
    lng: locationDetail?.longitude,
  };

  const onDetailChangeLocation = () => {
    history.push(
      ROUTERS.DETAIL_REQUEST_CHANGE_LOCATION.replace(':id', paramsId)
    );
  };

  const onDetailPost = (postId: string) => {
    history.push(`/app/location/detail/${locationDetail?.id}/post/${postId} `);
  };

  const onLockLocation = () => {
    if (!props?.locationDetail?.blockMessage) {
      props?.LOCK_LOCATION(paramsId);
    } else {
      props?.UN_LOCK_LOCATION(paramsId);
    }
  };

  useEffect(() => {
    getLocationById(paramsId);
    onGetListPostByLocation();
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockLocation(data.id, { reason: data.reason, detail: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [paramsId]);

  const onGetListPostByLocation = async () => {
    const data = await getListPostByLocationId(paramsId);
    setState({
      ...state,
      data,
      count: data?.length,
      switchType: LOCATION_POST_TYPE.POST,
      fetching: true,
    });
  };

  const onGetListActivityByLocation = () => {
    setState({
      ...state,
      switchType: LOCATION_POST_TYPE.ACTIVITY,
    });
  };

  const onGetListReportByLocation = () => {
    setState({
      ...state,
      switchType: LOCATION_POST_TYPE.REPORT,
    });
  };

  const onGetListRankingByLocation = () => {
    setState({
      ...state,
      switchType: LOCATION_POST_TYPE.RANKING,
    });
  };

  const renderListPostByLocation = () => {
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
              className="flex flex-col my-3 cursor-pointer"
              onClick={() => onDetailPost(items?.id)}
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
                    {items?.postType === POST_TYPES.SHARED && (
                      <div className="absolute top-0 right-1 text-white text-sm">
                        <i className="far fa-paper-plane" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative flex flex-1">
                  <div className="h-full flex flex-col justify-between">
                    <span className="cursor-pointer font-medium text-blue-400 limit-rows">
                      {items?.content}
                    </span>
                    <div className="flex mt-2 space-x-10">
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
                      <span className="absolute right-0 text-gray-400 text-lg">
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

  const renderListActivityByLocation = () => {
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="flex flex-col my-3 cursor-pointer">
          {DATA.map((items: any, index: number) => (
            <div key={index} className="flex flex-row space-x-3 py-3">
              <div className="flex flex-0">
                <div className="relative">
                  <img
                    className="w-24 h-24 bg-cover"
                    src={Images.avatar_defautl.default}
                  />
                </div>
              </div>
              <div className="relative flex flex-1">
                <div className="h-full flex flex-col justify-between">
                  <span className="cursor-pointer font-medium text-blue-400 limit-rows">
                    {'Chợ Đêm Sơn Trà'}
                  </span>
                  <span className="cursor-pointer limit-rows">
                    {'Mai Hắc Đế, An Hải Trung, Sơn Trà, Đà Nẵng'}
                  </span>
                  <div className="flex space-x-20">
                    <span className="cursor-pointer text-lg text-gray-500">
                      {`${t(
                        'location.detail.start_date'
                      )}: 2021.06.23 12:00 - ${t(
                        'location.detail.end_date'
                      )}: 2021.06.23 20:00`}
                    </span>
                    <span className="absolute right-0 cursor-pointer text-lg text-gray-500">
                      {`${t('location.detail.price')}: 0 VNĐ`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListReportByLocation = () => {
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="flex flex-col my-3 cursor-pointer">
          {DATA.map((items: any, index: number) => (
            <div key={index} className="flex flex-row space-x-3 py-3">
              <div className="flex flex-1 px-2">
                <div className="flex flex-row items-center space-x-4">
                  <img
                    className="w-24 h-24 bg-cover rounded-full"
                    src={Images.avatar_defautl.default}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{items?.name}</span>
                    <span className="text-lg text-gray-400">
                      {'2021.07.01 12:00'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 px-2">
                <span className="text-blue-400">
                  {`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListRankingByLocation = () => {
    return (
      <div className="bg-white p-3 mb-10-2 border-4 w-full">
        <div className="grid grid-cols-2 my-3 cursor-pointer">
          {DATA.map((items: any, index: number) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-4 py-3"
            >
              <img
                className="w-24 h-24 bg-cover rounded-full"
                src={Images.avatar_defautl.default}
              />
              <div className="flex flex-col">
                <span className="font-semibold">{items?.name}</span>
                <span className="text-lg text-gray-400">
                  {'2021.07.01 12:00'}
                </span>
                <span className="text-gray-500">
                  <i className="fas fa-poll mr-2" />
                  {'100'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const onSwitchView = (type: string) => {
    switch (type) {
      case LOCATION_POST_TYPE.POST:
        return renderListPostByLocation();
      case LOCATION_POST_TYPE.ACTIVITY:
        return renderListActivityByLocation();
      case LOCATION_POST_TYPE.RANKING:
        return renderListRankingByLocation();
      case LOCATION_POST_TYPE.REPORT:
        return renderListReportByLocation();
      default:
        return null;
    }
  };

  const renderInformationLocation = useCallback(() => {
    const DATA = [
      {
        key: t('location.form.name'),
        value: locationDetail?.name,
        titleColor: COLORS.T_TEXT_DEFAULT,
        bold: true,
      },
      {
        key: t('location.address'),
        value: locationDetail?.formatedAddress,
      },
      {
        key: t('location.form.creator'),
        value: locationDetail?.creator?.name,
        color: COLORS.T_BLUE,
        bold: true,
        url: locationDetail?.creator?.profiles?.avatars?.mediaContent?.url,
        onDetail: () =>
          history.push(
            ROUTERS.USER_DETAIL.replace(':id', locationDetail?.creator?.id)
          ),
      },
      {
        key: t('location.created'),
        value: formatTime(locationDetail?.createdAt),
      },
      {
        key: t('location.detail.total_ranking'),
        value: locationDetail?.averagePoint,
      },
      {
        key: t('location.detail.total_ranking_jg'),
        value: '',
      },
      {
        key: t('location.detail.total_posts'),
        value: locationDetail?.totalPost,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListPostByLocation(),
      },
      {
        key: t('location.detail.total_checkin'),
        value: locationDetail?.totalReview,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListRankingByLocation(),
      },
      {
        key: t('location.total_activity'),
        value: locationDetail?.totalActivity,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListActivityByLocation(),
      },
      {
        key: t('location.detail.total_report'),
        value: locationDetail?.totalReports,
        titleColor: COLORS.T_BLUE,
        path: () => onGetListReportByLocation(),
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
                {items?.url && (
                  <img
                    src={items?.url}
                    className="w-16 h-16 shadow rounded-full mx-6"
                    alt="avatar"
                  />
                )}
                {items?.value}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  }, [locationDetail]);

  const renderModalMap = useCallback(() => {
    return (
      <Modal
        isShowModal={isShowMap}
        toggle={onToggleModalMap}
        body={
          <Map
            center={center}
            draggable={false}
            height="500px"
            zoom={15}
            options={{
              scrollwheel: false,
              draggable: false,
              disableDoubleClickZoom: true,
              zoomControl: false,
              clickableIcons: false,
            }}
          />
        }
      />
    );
  }, [isShowMap, center]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between border-b-2 border-white py-3">
        <div className="space-x-10">
          <span
            className={`text-default text-2xl font-medium cursor-pointer p-3 ${
              switchType === LOCATION_POST_TYPE.RANKING && 'bg-blue-100'
            }`}
          >
            {getTitleHeaderLocationView(switchType)}
          </span>
          {switchType === LOCATION_POST_TYPE.RANKING && (
            <>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('location.detail.list_ranking_asc')}
              </span>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('location.detail.list_ranking_desc')}
              </span>
            </>
          )}
        </div>
        <span className="text-default font-medium">{count}</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className={'flex flex-row items-center justify-between pb-16 '}>
        <Breadcrunb
          path={t('breadcrumb.location.path')}
          subPath={t('breadcrumb.location.detail.sub_path')}
          highlight={locationDetail?.id}
        />
        <div className="flex flex-row items-center justify-center">
          <button
            className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={onLockLocation}
          >
            {props?.locationDetail?.blockMessage
              ? t('location.un_block')
              : t('location.block')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 border-right px-4">
          {renderInformationLocation()}
          {!!locationDetail?.totalRequestChangeLocation && (
            <div className="flex justify-between items-center py-6">
              <span
                className={
                  'flex justify-start items-center w-full font-semibold text-blue-400'
                }
              >
                {t('location.change_required')}
              </span>
              <span
                className={
                  'flex justify-end items-center w-full cursor-pointer'
                }
              >
                <i
                  onClick={onDetailChangeLocation}
                  className="fas fa-pen text-red-400"
                />
              </span>
            </div>
          )}
          <div className="text-center">
            <button
              className="bg-default text-white text-xl py-3 px-6 rounded-md"
              onClick={onToggleModalMap}
            >
              {t('view_map')}
            </button>
          </div>
          {renderModalMap()}
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

export default LocationDetail;
