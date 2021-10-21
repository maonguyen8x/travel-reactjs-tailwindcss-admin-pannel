import React, { useState, useEffect } from 'react';
import { ROUTERS, TOUR_DETAIL_TYPES } from 'app/constants';
import { getTitleTourDetail, getDataTravelSchedule } from 'app/utils';
import { t } from 'app/i18n';
import Images from 'app/assets/images';

const FormTour = (props: any) => {
  const { tourDetail, getTourById, history } = props;
  const { id } = props.match.params;

  const [state, setState] = useState({
    data: [{}, {}, {}],
    offset: 10,
    isShowModal: false,
    count: 0,
    switchType: TOUR_DETAIL_TYPES.TOUR,
    fetching: false,
  });

  const { switchType, data, isShowModal, count } = state;

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

  const onGetListTourInormation = async () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.TOUR,
    });
  };

  const onGetListTicketInformation = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.TICKET,
    });
  };

  const onGetListTimeImformation = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.TIME,
    });
  };

  const onGetListRanking = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.RANKING,
    });
  };

  const onGetListTravel = () => {
    setState({
      ...state,
      switchType: TOUR_DETAIL_TYPES.TRAVEL,
    });
  };

  const renderInformation = () => {
    const DATA = [
      {
        key: t('food.detail.name'),
        value: tourDetail?.name,
        active: true,
      },
      {
        key: t('tour.type'),
        value: 'Daily tour',
        type: true,
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
        key: t('tour.detail.information'),
        titleColor: true,
        path: () => onGetListTourInormation(),
      },
      {
        key: t('tour.detail.ticket'),
        titleColor: true,
        path: () => onGetListTicketInformation(),
      },
      {
        key: t('tour.detail.times'),
        titleColor: true,
        path: () => onGetListTimeImformation(),
      },
      {
        key: t('tour.detail.travel'),
        titleColor: true,
        path: () => onGetListTravel(),
      },
      {
        key: t('tour.total_ranking'),
        titleColor: true,
        path: () => onGetListRanking(),
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
            {!!items?.value && (
              <span
                className={`flex justify-end items-center w-full ${
                  items?.active && 'font-semibold text-blue-400 cursor-pointer'
                } ${items?.type && 'text-red-500 font-semibold'}`}
                onClick={onDetailOwner()}
              >
                {items?.value}
              </span>
            )}
          </div>
        ))}
      </>
    );
  };

  const onSwitchView = (type: string) => {
    switch (type) {
      case TOUR_DETAIL_TYPES.TOUR:
        return renderListTourInformation();
      case TOUR_DETAIL_TYPES.TICKET:
        return renderListTicketInformation();
      case TOUR_DETAIL_TYPES.RANKING:
        return renderListRanking();
      case TOUR_DETAIL_TYPES.TIME:
        return renderListTimeInformation();
      case TOUR_DETAIL_TYPES.TRAVEL:
        return renderListTravel();
      default:
        return null;
    }
  };

  const renderListTourInformation = () => {
    const DATA = [
      {
        key: t('tour.detail.pick_up'),
        value: [
          'Khách Sạn NoveHotel Đà Nẵng',
          'Đc: 155,Nguyễn Văn Linh,Hải Châu, tp.Đà Nẵng',
        ],
      },
      {
        key: t('tour.detail.plan'),
        value: [
          'Đón khách tại trụ sở công ty, Thời gian đón 7h30, Quý khách xin vui lòng đi sớm trước 30p để chuyến đi xuất phát đúng với lịch trình và không ảnh hưởng đến người khác.',
        ],
      },
      {
        key: t('tour.detail.drop_off'),
        value: [
          'Khách Sạn NoveHotel Đà Nẵng',
          'Đc: 155,Nguyễn Văn Linh,Hải Châu, tp.Đà Nẵng',
        ],
      },
      {
        key: t('tour.detail.visit'),
        value: [
          '+ Khu Vực Lặn San Hô ',
          '+ Nhà Hàng Cù Lao',
          '+ Khách Sạn Lao Chàm',
          '+ Phố Cổ Hội An',
          '+ Làng Gốm Thanh Hà',
          '+ Làng Rau Trà Quế',
        ],
      },
    ];
    return (
      <div className=" p-4">
        {DATA.map((item: any, index: number) => (
          <div key={index} className="flex flex-col p-2">
            <span className="font-semibold text-default">{item?.key}</span>
            {item?.value?.map((child: any, index: number) => (
              <span key={index} className="text-600-gray py-1">
                {child}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderListTimeInformation = () => {
    return (
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center p-3">
          <span className="w-1/3 font-semibold text-default">
            {t('tour.detail.total_time')}
          </span>
          <span>{'2 ngày 1 đêm'}</span>
        </div>
        <div className="flex flex-row items-center p-3">
          <span className="w-1/3 font-semibold text-default">
            {t('tour.detail.date_without_tours')}
          </span>
          <span>{'0'}</span>
        </div>
      </div>
    );
  };

  const renderListRanking = () => {
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
    ];
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

  const renderListTravel = () => {
    return (
      <div className="py-3 px-5">
        {getDataTravelSchedule().map((item: any, index: number) => (
          <div key={index} className="flex flex-col py-3">
            <span className="text-2xl text-default font-semibold py-2">
              {`${t('tour.detail.day')} ${item?.day}`}
            </span>
            {item?.data?.map((child: any, index: number) => (
              <div key={index}>
                <span className="font-semibold py-2">
                  {`${t('tour.detail.time')}: ${child?.time}`}
                </span>
                <div className="flex flex-col py-2">
                  <span className="font-semibold">
                    {t('tour.detail.description')}
                  </span>
                  <span className="text-justify leading-relaxed text-gray-500">
                    {child?.description}
                  </span>
                </div>
                <div className="py-2">
                  <span className="font-semibold">
                    {t('tour.detail.image')}
                  </span>
                  <div className="grid grid-cols-8 gap-2">
                    {child?.attachments?.map((url: any, index: number) => (
                      <img
                        key={index}
                        className="w-full h-40 bg-cover object-cover"
                        src={url}
                        alt="att"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderListTicketInformation = () => {
    const DATA = [
      {
        key: t('tour.ticket_price'),
        value: 'vnđ',
        title: true,
      },
      {
        key: t('tour.adult_normal'),
        value: '500.000',
      },
      {
        key: t('tour.child_normal'),
        value: '350.000',
      },
      {
        key: t('tour.adult_holidays'),
        value: '750.000',
      },
      {
        key: t('tour.child_holidays'),
        value: '500.000',
      },
    ];

    return (
      <div className="flex flex-col p-4">
        {DATA?.map((item: any, index: number) => (
          <div key={index} className="flex flex-row items-center p-4">
            <span
              className={`font-medium w-1/3 ${
                item?.title && 'font-semibold text-default'
              }`}
            >
              {item?.key}
            </span>
            <span className={`${item?.title && 'font-semibold text-default'}`}>
              {item?.value}
            </span>
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
            className={
              'text-default text-2xl font-medium cursor-pointer capitalize px-3 bg-blue-100 p-3'
            }
          >
            {getTitleTourDetail(switchType)}
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
            className={'text-xl font-semibold capitalize'}
          >
            {t('tour.detail.service')}
          </span>
          <span>{'|'}</span>
          <span
            onClick={() =>
              history.push(ROUTERS.TOUR_DETAIL.replace(':id', tourDetail?.id))
            }
            className={'text-xl font-semibold capitalize text-yellow-500'}
          >
            {t('tour.detail.title')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 border-right px-3">
          <div className="mb-3">
            <img
              className="h-80 w-full bg-cover object-cover rounded-xl"
              src={
                'https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHRyYXZlbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
              }
              alt="background"
            />
          </div>
          {renderInformation()}
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
export default FormTour;
