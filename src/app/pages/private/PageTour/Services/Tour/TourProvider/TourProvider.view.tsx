import React, { useState, useEffect } from 'react';
import {
  POST_TYPES,
  ROUTERS,
  STATUS_ORDER_TOUR,
  TOUR_DETAIL_TYPES,
} from 'app/constants';
import {
  formatTime,
  getTitleTourProvider,
  getPhotoPostByUser,
  onDeleteTourPage,
} from 'app/utils';
import { t } from 'app/i18n';
import Images from 'app/assets/images';

const DATA = [
  {
    name: 'Manh Hoan',
    type: 'Confirm',
  },
  {
    name: 'Nguyễn Hoa Phượng',
    type: 'On Tour',
  },
  {
    name: 'Độc Toàn Thân',
    type: 'Confirm',
  },
  {
    name: 'Nguyễn Huỳnh Thảo Nhi',
    type: 'Completed',
  },
  {
    name: 'Võ Thị Huyền Trân',
    type: 'Confirm',
  },
  {
    name: 'Nguyễn Thái Long',
    type: 'Cancelled',
  },
  {
    name: 'Độc Toàn Thân',
    type: 'Cancelled',
  },
  {
    name: 'Manh Hoan',
    type: 'Completed',
  },
  {
    name: 'Nguyễn Huỳnh Thảo Nhi',
    type: 'Confirm',
  },
  {
    name: 'Nguyễn Hoa Phượng',
    type: 'Cancelled',
  },
  {
    name: 'Manh Hoan',
    type: 'Completed',
  },
];

const FormProviderTour = (props: any) => {
  const { tourDetail, getTourById, history } = props;
  const { id } = props.match.params;

  const [state, setState] = useState({
    data: [{}, {}, {}],
    offset: 10,
    isShowModal: false,
    count: DATA.length,
    switchType: TOUR_DETAIL_TYPES.TOUR,
    fetching: false,
    bookingTypes: '',
  });

  const { switchType, data, isShowModal, offset, count, bookingTypes } = state;

  useEffect(() => {
    getTourById(id);
  }, []);

  const onToggleModal = (id: any) => {
    setState({
      ...state,
      isShowModal: !isShowModal,
    });
  };

  const onDetailOwner = () => () => {
    history?.push(ROUTERS.USER_DETAIL.replace(':id', tourDetail?.userId));
  };

  const onGetListTour = async () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.TOUR,
    });
  };

  const onGetListBooking = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.BOOKING,
    });
  };

  const onGetListPost = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.POST,
    });
  };

  const onGetListRanking = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.RANKING,
    });
  };

  const onGetListFollow = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.FOLLOW,
    });
  };

  const renderInformation = () => {
    const DATA = [
      {
        key: t('tour.owner'),
        value: tourDetail?.user?.name,
        active: true,
      },
      {
        key: t('tour.address'),
        value: tourDetail?.location?.address,
      },
      {
        key: t('tour.created'),
        value: formatTime(tourDetail?.createdAt),
      },
      {
        key: t('location.detail.total_ranking'),
        value: '',
      },
      {
        key: t('location.detail.total_ranking_jg'),
        value: '',
      },
      {
        key: t('tour.total_tour'),
        value: tourDetail?.totalLike || 0,
        titleColor: true,
        path: () => onGetListTour(),
      },
      {
        key: t('tour.total_booking'),
        value: tourDetail?.totalComment || 0,
        titleColor: true,
        path: () => onGetListBooking(),
      },
      {
        key: t('tour.detail.total_posts'),
        value: tourDetail?.totalPosts || 0,
        titleColor: true,
        path: () => onGetListPost(),
      },
      {
        key: t('tour.total_ranking'),
        value: tourDetail?.totalRanking || 0,
        titleColor: true,
        path: () => onGetListRanking(),
      },
      {
        key: t('tour.total_followers'),
        value: tourDetail?.totalFollowing || 0,
        titleColor: true,
        path: () => onGetListFollow(),
      },
    ];
    return (
      <>
        {DATA.map((items: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-3">
            <span
              onClick={items?.titleColor && items.path}
              className={`flex justify-start items-center w-full font-semibold ${
                items?.titleColor && 'text-blue-400 cursor-pointer'
              }`}
            >
              {items?.key}
            </span>
            <span
              className={`flex justify-end items-center w-full ${
                items?.active && 'font-semibold text-blue-400 cursor-pointer'
              }`}
              onClick={onDetailOwner()}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  const onSwitchView = (type: string) => {
    switch (type) {
      case TOUR_DETAIL_TYPES.TOUR:
        return renderListTour();
      case TOUR_DETAIL_TYPES.BOOKING:
        return renderListBooking();
      case TOUR_DETAIL_TYPES.RANKING:
        return renderListReport();
      case TOUR_DETAIL_TYPES.POST:
        return renderListPost();
      case TOUR_DETAIL_TYPES.FOLLOW:
        return renderListFollow();
      default:
        return null;
    }
  };

  const renderListTour = () => {
    return (
      <div>
        {DATA.map((item: any, index: number) => (
          <div key={index} className="flex flex-row space-x-3 p-3">
            <div className="flex flex-0">
              <div className="relative">
                <img
                  className="w-24 h-24 bg-cover object-cover rounded-md"
                  src={
                    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                  }
                  alt="travel"
                />
              </div>
            </div>
            <div className="flex flex-1">
              <div className="h-full flex flex-col justify-between">
                <span className="cursor-pointer font-medium text-blue-400 limit-rows">
                  {
                    ' Tour du lịch Đà Nẵng - Hội An - Quảng Bình - Huế - Hầ Nội - Vịnh Hạ Long - Sài Gòn - Vũng Tàu'
                  }
                </span>
                <span className="cursor-pointer text-lg text-gray-500">
                  {`${t('tour.service.type')}: Daily tour`}
                </span>
                <div className="flex space-x-20">
                  <span className="cursor-pointer text-lg text-gray-500 limit-rows">
                    {`${t(
                      'tour.detail.destination'
                    )}: Đà Nẵng, Huế, Quãng Bình, Quãng Trị`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListPost = () => {
    return (
      <div className="bg-white px-3 w-full">
        {DATA?.map((items: any, index: number) => {
          const mediaContents = getPhotoPostByUser(items);
          return (
            <div
              key={index}
              className="flex flex-col my-3 cursor-pointer"
              // onClick={() => onDetailPost(items?.id)}
            >
              <div className="flex flex-row space-x-3">
                <div className="flex flex-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-md bg-cover object-cover"
                      src={
                        mediaContents?.[0]?.urlTiny ||
                        items?.backgroundPost?.url ||
                        items?.sourcePost?.backgroundPost?.url ||
                        'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYXZlbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
                <div className="relative flex flex-1 w-full">
                  <div className=" flex flex-col justify-between">
                    <span className="cursor-pointer font-medium text-blue-400 limit-rows">
                      {'Tôi đã đến nơi này thực sự rất tuyệt vời nhé các bạn,'}
                    </span>
                    <div className="flex justify-between mt-2 space-x-10">
                      <div className="text-gray-600 space-x-6">
                        <i className="far fa-heart">
                          &#160;{items?.totalLike || 0}
                        </i>
                        <i className="far fa-comment">
                          &#160;{items?.totalComment || 0}
                        </i>
                        <i className="far fa-paper-plane">
                          &#160;{items?.totalShare || 0}
                        </i>
                        <i className="fas fa-poll">
                          &#160;{items?.totalRanking || 0}
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

  const renderListReport = () => {
    return (
      <div className="bg-white px-3 w-full">
        <div className="flex flex-col my-3 cursor-pointer">
          {DATA.map((items: any, index: number) => (
            <div key={index} className="flex flex-row space-x-3 py-3">
              <div className="flex flex-1 px-2">
                <div className="flex flex-row items-center space-x-4">
                  <img
                    className="w-20 h-20 bg-cover rounded-full shadow"
                    src={Images.avatar_defautl.default}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{items?.name}</span>
                    <span className="text-lg text-gray-400">
                      {'2021.07.01 12:00'}
                    </span>
                    <span className="text-lg">
                      <i className="fas fa-poll mr-3" />
                      <span>{'20'}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 px-2 text-justify">
                <span className="leading-relaxed ">
                  {`Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. `}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListFollow = () => {
    return (
      <div className="grid grid-cols-3">
        {DATA.map((item: any, index: number) => (
          <div key={index} className="flex flex-row items-center p-3">
            <img
              className="w-16 h-16 bg-cover object-cover rounded-full shadow"
              src={Images.avatar_defautl.default}
              alt="avatar"
            />
            <span className="text-blue-400 font-semibold mx-3">
              {item?.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderListBooking = () => {
    const getBookingTypes = (type: string) => {
      switch (type) {
        case 'Confirm':
          return 'text-yellow-500';
        case 'On Tour':
          return 'text-green-500';
        case 'Completed':
          return 'text-gray-500';
        case 'Cancelled':
          return 'text-red-500';
        default:
          return '';
      }
    };

    const getListDataBooking = (type: string) => {
      switch (type) {
        case STATUS_ORDER_TOUR.CONFIRMED:
          return DATA.filter((item: any) => item?.type === 'Confirm');
        case STATUS_ORDER_TOUR.REQUEST:
          return DATA.filter((item: any) => item?.type === 'On Tour');
        case STATUS_ORDER_TOUR.COMPLETED:
          return DATA.filter((item: any) => item?.type === 'Completed');
        case STATUS_ORDER_TOUR.CANCELED:
          return DATA.filter((item: any) => item?.type === 'Cancelled');
        default:
          return DATA;
      }
    };

    return (
      <div className="grid grid-cols-2">
        {getListDataBooking(bookingTypes)?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-row items-center  p-3 border-right"
          >
            <img
              className="w-20 h-20 bg-cover object-cover rounded-full shadow"
              src={Images.avatar_defautl.default}
              alt="avatar"
            />
            <div className="flex flex-col mx-3">
              <span className="font-semibold">{item?.name}</span>
              <span className="text-lg text-gray-400">
                {'manhhoan@gmail.com'}
              </span>
              <span className={`${getBookingTypes(item?.type)} limit-rows`}>
                {item?.type}
                <span className="text-blue-400 mx-2 ">
                  {
                    'Complete Tour du lịch phố cổ Hội An-Tour du lịch phố cổ Hội An-Tour du lịch phố cổ Hội An-Tour '
                  }
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between border-b-2 border-white py-3">
        <div className="space-x-2">
          <span
            onClick={() =>
              setState({
                ...state,
                bookingTypes: '',
              })
            }
            className={`text-default text-2xl font-medium cursor-pointer capitalize px-3 ${
              (switchType === TOUR_DETAIL_TYPES.RANKING ||
                (switchType === TOUR_DETAIL_TYPES.BOOKING && !bookingTypes)) &&
              'bg-blue-100 p-3'
            }`}
          >
            {getTitleTourProvider(switchType)}
          </span>
          {switchType === TOUR_DETAIL_TYPES.RANKING && (
            <>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('location.detail.list_ranking_asc')}
              </span>
              <span className="text-default text-2xl font-medium cursor-pointer p-3">
                {t('location.detail.list_ranking_desc')}
              </span>
            </>
          )}
          {switchType === TOUR_DETAIL_TYPES.BOOKING && (
            <>
              <span
                onClick={() =>
                  setState({
                    ...state,
                    bookingTypes: STATUS_ORDER_TOUR.COMPLETED,
                  })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  bookingTypes === STATUS_ORDER_TOUR.COMPLETED && 'bg-blue-100'
                }`}
              >
                {t('tour.detail.completed')}
              </span>
              <span
                onClick={() =>
                  setState({
                    ...state,
                    bookingTypes: STATUS_ORDER_TOUR.REQUEST,
                  })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  bookingTypes === STATUS_ORDER_TOUR.REQUEST && 'bg-blue-100'
                }`}
              >
                {t('tour.detail.on_tour')}
              </span>
              <span
                onClick={() =>
                  setState({
                    ...state,
                    bookingTypes: STATUS_ORDER_TOUR.CONFIRMED,
                  })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  bookingTypes === STATUS_ORDER_TOUR.CONFIRMED && 'bg-blue-100'
                }`}
              >
                {t('tour.detail.confirm')}
              </span>
              <span
                onClick={() =>
                  setState({
                    ...state,
                    bookingTypes: STATUS_ORDER_TOUR.CANCELED,
                  })
                }
                className={`text-default text-2xl font-medium cursor-pointer p-3 ${
                  bookingTypes === STATUS_ORDER_TOUR.CANCELED && 'bg-blue-100'
                }`}
              >
                {t('tour.detail.cancelled')}
              </span>
            </>
          )}
        </div>
        <span className="text-default font-medium px-3">{count}</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className={'flex flex-row items-center justify-between pb-16'}>
        <div className="pb-4 space-x-6 cursor-pointer">
          <span
            onClick={() =>
              history.push(
                ROUTERS.TOUR_DETAIL_PROVIDER.replace(':id', tourDetail?.id)
              )
            }
            className={'text-xl font-semibold capitalize text-yellow-500'}
          >
            {t('tour.detail.service')}
          </span>
          <span>{'|'}</span>
          <span
            onClick={() =>
              history.push(ROUTERS.TOUR_DETAIL.replace(':id', tourDetail?.id))
            }
            className={'text-xl font-semibold capitalize '}
          >
            {t('tour.detail.title')}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <button className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            {props?.locationDetail?.blockMessage
              ? t('tour.un_block')
              : t('tour.block')}
          </button>
          <button
            className="bg-gray-500 py-3 px-10 text-white text-xl shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={() => onDeleteTourPage()}
          >
            {t('tour.delete')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 border-right px-3">
          <div className="flex justify-between items-center py-3">
            <span className="flex justify-start items-center w-full font-semibold">
              {t('food.detail.name')}
            </span>
            <span className="flex justify-end items-center w-full text-default font-semibold">
              {tourDetail?.name}
              <img
                className="w-16 h-16 bg-cover rounded-full shadow ml-3"
                src={tourDetail?.avatar?.urlTiny}
                alt="avatar"
              />
            </span>
          </div>
          {renderInformation()}
          <div className="flex justify-between items-center py-3">
            <span
              className={'flex justify-start items-center w-full font-semibold'}
            >
              {t('food.detail.verify')}{' '}
              <button
                onClick={() =>
                  history.push(
                    ROUTERS.VERIFY_ACCOUNT_DETAIL.replace(':id', '1')
                  )
                }
              >
                <i
                  className={`fas fa-shield-alt p-2 mx-2 rounded-full text-white ${
                    tourDetail?.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </button>
            </span>
            <span
              className={`flex justify-end items-center w-full ${
                tourDetail?.isActive ? 'text-blue-400' : 'text-red-500'
              }`}
            >
              {tourDetail?.isActive ? t('food.verified') : t('food.canceled')}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="flex justify-start items-center w-full font-semibold">
              {t('tour.payment')}
            </span>
            <span className="flex justify-end items-center w-full ">
              {t('tour.cash')}
            </span>
          </div>
          <div className="mt-3">
            <span className="flex justify-start items-center w-full font-semibold text-default ">
              {t('user.intro')}
            </span>
          </div>
          <div className="text-justify overflow-y-scroll h-32 pr-2">
            <span className="leading-relaxed text-justify">
              {tourDetail?.bio}
            </span>
          </div>
        </div>
        <div className="col-span-2 px-3">
          <div className="w-full h-75vh bg-gray-100 bg-opacity-70">
            {renderHeader()}
            <div className="w-full h-70vh bg-white border-8 border-gray-100 border-opacity-70 overflow-y-scroll">
              {onSwitchView(switchType)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormProviderTour;
