import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  formatMomentQuery,
  checkKeyIcon,
  checkPath,
  customDashBoardType,
  findTotalType,
  formatCustomSearchTime,
  formatTime,
  formatDay,
} from 'app/utils';
import {
  COLORS,
  DASHBOARD_TYPES,
  ROUTERS,
  STATISTIC_DATE_TYPES,
  STATISTIC_TYPE,
} from 'app/constants';
import { Chart } from 'chart.js';
import moment from 'moment';
import { t } from 'app/i18n';
import SweetAlert from 'app/components/SweetAlert';
import useOutsideClick from 'app/components/layout/useOutsideClick';
import Images from 'app/assets/images';
import Modal from 'app/components/Modal';
import { IProps } from './ListDashboard.type';
import { getConfigChart } from './Chart.config';

export default function Index({
  statisticDashboard,
  getStatisticDashboard,
  history,
  stepSizeNumber = 10,
  getStatisticLocation,
  statisticLocation,
  statisticUser,
  statisticPost,
  getStatisticUser,
  getStatisticPost,
  getStatisticPage,
  statisticPage,
}: IProps) {
  const ref: any = useRef();

  const currentDate = new Date();

  const [state, setState] = useState({
    isShowDropdown: false,
    isShowModal: false,
    filterTime: STATISTIC_DATE_TYPES.DAY,
    isShowSelectTime: false,
    selectStartDate: '',
    selectEndDate: '',
    type: STATISTIC_TYPE.USER,
    pageType: '',
    nameType: t('dashboard.new.user'),
    data: statisticUser,
    getData: getStatisticUser,
  });

  const {
    isShowDropdown,
    filterTime,
    isShowSelectTime,
    selectStartDate,
    selectEndDate,
    type,
    pageType,
    nameType,
    data,
    getData,
    isShowModal,
  } = state;

  const refClosePopup: any = useRef();
  useOutsideClick(ref, () => {
    isShowDropdown &&
      setState({
        ...state,
        isShowDropdown: false,
      });
  });

  const toggleDropDown = useCallback(() => {
    setState({
      ...state,
      isShowDropdown: !isShowDropdown,
    });
  }, [isShowDropdown]);

  const toggleSelectTime = useCallback(() => {
    const customSelectTime = isShowSelectTime
      ? {
          ...state,
          filterTime: STATISTIC_DATE_TYPES.DAY,
          isShowSelectTime: false,
        }
      : {
          ...state,
          isShowSelectTime: !isShowSelectTime,
          filterTime: '',
        };
    setState(customSelectTime);
  }, [isShowSelectTime]);

  useEffect(() => {
    if (type === STATISTIC_TYPE.USER) {
      setState({
        ...state,
        data: statisticUser,
        getData: getStatisticUser,
      });
    }
    if (type === STATISTIC_TYPE.PAGE) {
      setState({
        ...state,
        data: statisticPage,
        getData: getStatisticPage,
      });
    }
    if (type === STATISTIC_TYPE.LOCATION) {
      setState({
        ...state,
        data: statisticLocation,
        getData: getStatisticLocation,
      });
    }
    if (type === STATISTIC_TYPE.POST) {
      setState({
        ...state,
        data: statisticPost,
        getData: getStatisticPost,
      });
    }
  }, [statisticLocation, statisticUser, statisticPost, statisticPage]);

  const statistic = data?.map((item: any) => item?.value);
  const value = data?.filter((item: any) => item?.value > 0);

  const totalCount = value?.reduce(
    (totalAmount: any, values: any) => totalAmount + values?.value,
    0
  );

  const getBigNumber = Math.round((totalCount + 4) / 10) * 10;

  const onSelectTime = (time: string) => () => {
    if (!!pageType) {
      getData({
        searchType: time,
        pageType: pageType,
      });
    } else {
      getData({
        searchType: time,
      });
    }
    setState({
      ...state,
      filterTime: time,
      selectStartDate: '',
      selectEndDate: '',
      isShowSelectTime: false,
      isShowDropdown: false,
    });
  };

  const onSearchCustomTime = () => {
    if (selectStartDate && selectEndDate) {
      getData({
        fromDate: moment.utc(selectStartDate).startOf('d').toISOString(),
        toDate: moment.utc(selectEndDate).endOf('d').toISOString(),
      });
      setState({
        ...state,
        isShowSelectTime: false,
        selectEndDate: selectEndDate,
      });
    } else {
      SweetAlert.warning(t('dashboard.choose.start_date'));
    }
  };

  const onGetListOverview = () => {
    getStatisticUser({
      searchType: STATISTIC_DATE_TYPES.DAY,
    });
    getStatisticDashboard();
    setState({
      ...state,
      data: statisticUser,
    });
  };

  useLayoutEffect(() => {
    onGetListOverview();
  }, []);

  useEffect(() => {
    setState({
      ...state,
      data: statisticUser,
    });
  }, [type]);

  const customLabel = data?.map((times: any) => times?.key);

  useEffect(() => {
    const config: any = getConfigChart({
      dataDefault: statistic,
      maxNumber: getBigNumber,
      stepSizeNumber,
      label: customLabel,
      // color: RandomColor(statistic?.length),
      type: 'line',
    });
    const chart = new Chart(ref.current, config);
    return () => {
      chart.destroy();
    };
  }, [statistic]);

  const onGetListUser = () => {
    getStatisticUser({
      searchType: STATISTIC_DATE_TYPES.DAY,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      type: STATISTIC_TYPE.USER,
      pageType: '',
      nameType: t('dashboard.new.user'),
      isShowDropdown: false,
    });
  };

  const onGetListLocation = () => {
    getStatisticLocation({
      searchType: STATISTIC_DATE_TYPES.DAY,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      type: STATISTIC_TYPE.LOCATION,
      pageType: '',
      nameType: t('dashboard.new.location'),
      isShowDropdown: false,
    });
  };

  const onGetListPage = () => {
    getStatisticPage({
      searchType: STATISTIC_DATE_TYPES.DAY,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      type: STATISTIC_TYPE.PAGE,
      pageType: '',
      nameType: t('dashboard.new.page'),
      isShowDropdown: false,
    });
  };

  const onGetListStay = () => {
    getStatisticPage({
      searchType: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.STAY,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.STAY,
      type: STATISTIC_TYPE.PAGE,
      nameType: t('dashboard.new.stay'),
      isShowDropdown: false,
    });
  };

  const onGetListTour = () => {
    getStatisticPage({
      searchType: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.TOUR,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.TOUR,
      type: STATISTIC_TYPE.PAGE,
      nameType: t('dashboard.new.tour'),
      isShowDropdown: false,
    });
  };

  const onGetListFood = () => {
    getStatisticPage({
      searchType: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.FOOD,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      pageType: STATISTIC_TYPE.FOOD,
      type: STATISTIC_TYPE.PAGE,
      nameType: t('dashboard.new.food'),
      isShowDropdown: false,
    });
  };

  const onGetListPost = () => {
    getStatisticPost({
      searchType: STATISTIC_DATE_TYPES.DAY,
    });
    setState({
      ...state,
      filterTime: STATISTIC_DATE_TYPES.DAY,
      type: STATISTIC_TYPE.POST,
      pageType: '',
      nameType: t('dashboard.new.post'),
      isShowDropdown: false,
    });
  };

  const renderDropdownItem = () => {
    const DROPDOWN_ITEMS = [
      {
        action: onGetListUser,
        active: type === STATISTIC_TYPE.USER && 'active',
        title: t('dashboard.new.user'),
      },
      {
        action: onGetListPage,
        active: !!pageType ? '' : type === STATISTIC_TYPE.PAGE && 'active',
        title: t('dashboard.new.page'),
      },
      {
        action: onGetListPost,
        active: type === STATISTIC_TYPE.POST && 'active',
        title: t('dashboard.new.post'),
      },
      {
        action: onGetListLocation,
        active: type === STATISTIC_TYPE.LOCATION && 'active',
        title: t('dashboard.new.location'),
      },
      {
        action: onGetListStay,
        active: pageType === STATISTIC_TYPE.STAY && 'active',
        title: t('dashboard.new.stay'),
      },
      {
        action: onGetListTour,
        active: pageType === STATISTIC_TYPE.TOUR && 'active',
        title: t('dashboard.new.tour'),
      },
      {
        action: onGetListFood,
        active: pageType === STATISTIC_TYPE.FOOD && 'active',
        title: t('dashboard.new.food'),
      },
    ];
    return (
      <>
        {DROPDOWN_ITEMS?.map((items: any, index: number) => (
          <span
            key={index}
            onClick={items?.action}
            className={`cursor-pointer px-2 py-3 ${
              items?.active ? 'text-yellow-400' : 'text-white'
            } hover:text-yellow-400`}
          >
            {items?.title}
          </span>
        ))}
      </>
    );
  };

  const renderDropdownFilterTimes = () => {
    const DROPDOWN_TIMES = [
      {
        action: onSelectTime(STATISTIC_DATE_TYPES.DAY),
        active: filterTime === STATISTIC_DATE_TYPES.DAY,
        title: t('date.day'),
      },
      {
        action: onSelectTime(STATISTIC_DATE_TYPES.WEEK),
        active: filterTime === STATISTIC_DATE_TYPES.WEEK,
        title: t('date.week'),
      },
      {
        action: onSelectTime(STATISTIC_DATE_TYPES.MONTH),
        active: filterTime === STATISTIC_DATE_TYPES.MONTH,
        title: t('date.month'),
      },
      {
        action: onSelectTime(STATISTIC_DATE_TYPES.YEAR),
        active: filterTime === STATISTIC_DATE_TYPES.YEAR,
        title: t('date.year'),
      },
    ];

    return (
      <>
        {DROPDOWN_TIMES?.map((items: any, index: number) => (
          <span
            key={index}
            className={`${
              items?.active && 'text-yellow-400'
            } text-default text-center text-2xl px-3 flex items-center cursor-pointer`}
            onClick={items?.action}
          >
            {items?.title}
          </span>
        ))}
      </>
    );
  };

  const renderItemsCreate = () => {
    const DATA_CREATE = [
      {
        title: t('location.d.title'),
        path: ROUTERS.LOCATION_ADD,
        background: COLORS.T_LOCATION,
        color: 'text-green-500',
        border: 'border-green-500',
      },
      {
        title: t('post.title'),
        path: ROUTERS.POST_ADD,
        background: COLORS.T_POSTS,
        color: 'text-default',
        border: 'border-default',
      },
      {
        title: t('tour.title'),
        path: ROUTERS.TOUR_ADD,
        background: COLORS.T_TOUR,
        color: 'text-blue-400',
        border: 'border-blue-400',
      },
      {
        title: t('food.title'),
        path: ROUTERS.FOOD_ADD,
        background: COLORS.T_FOOD,
        color: 'text-red-500',
        border: 'border-red-500',
      },
      {
        title: t('stay.title'),
        path: '/',
        background: COLORS.T_STAY,
        color: 'text-yellow-400',
        border: 'border-yellow-400',
      },
      {
        title: t('activities.title'),
        path: ROUTERS.CREATE_NEW_ACTIVITY,
        background: COLORS.T_ACTIViTY,
        color: 'text-tab-active',
        border: 'border-tab-active',
      },
    ];

    return (
      <>
        {DATA_CREATE?.map((items: any, index: number) => (
          <div className="flex flex-col mr-4" key={index}>
            <div
              className={`shadow-sm relative rounded-md py-10 mt-3 flex flex-row items-center justify-center cursor-pointer ${items?.background} hover:shadow`}
              onClick={() => history?.push(items?.path)}
            >
              <i
                className={`fas fa-plus ${items?.color} absolute left-8 text-center border-2 ${items?.border} flex justify-center items-center w-12 h-12 text-2xl rounded-full`}
              />
              <span
                color={items?.color}
                className={`${items?.color} font-semibold absolute left-24`}
              >
                {items?.title}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderItemsRequirements = () => {
    const DATA_REQUIREMENTS = [
      {
        title: t('report.title'),
        request: findTotalType(statisticDashboard, DASHBOARD_TYPES.REPORT)?.new,
        icon: 'fas fa-exclamation-triangle',
        color: COLORS.T_RED,
        path: ROUTERS.LIST_REPORT,
      },
      {
        title: t('feedback.title'),
        request: findTotalType(statisticDashboard, DASHBOARD_TYPES.FEEDBACK)
          ?.new,
        icon: 'far fa-comment',
        color: COLORS.T_YELLOW,
        path: ROUTERS.LIST_FEEDBACK,
      },
      {
        title: t('verify.title'),
        request: findTotalType(statisticDashboard, DASHBOARD_TYPES.VERIFY_PAGE)
          ?.new,
        img: Images.shield.default,
        color: COLORS.T_BLUE,
        path: ROUTERS.LIST_VERIFY_ACCOUNT,
      },
      {
        title: t('change_location.title'),
        request: findTotalType(
          statisticDashboard,
          DASHBOARD_TYPES.CHANGE_LOCATION
        )?.new,
        icon: 'fas fa-pen',
        color: COLORS.T_GREEN,
        path: ROUTERS.LIST_REQUEST_CHANGE_LOCATION,
      },
      {
        title: t('duplicate_location.title'),
        img: Images.marker.default,
        request: findTotalType(
          statisticDashboard,
          DASHBOARD_TYPES.DUPLICATED_LOCATION
        )?.new,
        color: `${COLORS.T_ACTIVE}`,
        path: ROUTERS.LOCATION_DUPLICATE,
      },
    ];
    return (
      <div className="grid grid-cols-5 gap-6 mt-3">
        {DATA_REQUIREMENTS?.map((items: any, index: number) => (
          <div
            className={`bg-${items?.color} w-full rounded-lg py-2 px-3 shadow cursor-pointer hover:opacity-90`}
            key={index}
            onClick={() => history?.push(items?.path)}
          >
            <div className="relative flex flex-col space-y-6">
              <span className="text-lg font-semibold text-white">
                {items?.title}
              </span>
              <span className="text-5xl font-semibold text-white">
                {items?.request || 0}
              </span>
              {!!items?.img && (
                <img
                  className="absolute z-50 right-4 bg-white p-2 w-10 h-10 rounded-full"
                  src={items?.img}
                  alt="icon"
                />
              )}
              {items?.icon && (
                <i
                  className={`flex justify-center items-center ${items?.icon} text-${items?.color} absolute z-50 right-4 text-xl bg-white w-10 h-10 rounded-full`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListOnlineUsers = () => {
    return (
      <div className="min-h-75vh max-h-75vh overflow-y-scroll">
        <div className="grid grid-cols-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_: any, index: number) => (
            <div key={index} className="m-4 flex flex-row items-center ">
              <div
                style={{
                  backgroundImage: `url(${Images.avatar_defautl.default})`,
                }}
                className="w-24 h-24 bg-cover rounded-full mx-3 border"
              />
              <div className="flex flex-col">
                <span className="text-2xl text-blue-400 font-semibold">
                  {'username'}
                </span>
                <span className="text-gray-500 font-medium">
                  {'username@mail.com'}
                </span>
                <div className="flex flex-row items-center space-x-2">
                  <i className="far fa-clock text-xl text-gray-400" />
                  <span className="font-medium">{formatDay(new Date())}</span>
                  <span className="text-yellow-400">{`-${'3d'}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-col-3 space-y-10 p-10">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-10">
          <div>
            <span className="font-semibold uppercase text-default">
              {t('requirements')}
            </span>
            {renderItemsRequirements()}
          </div>
          <div className="grid grid-cols-4 mt-4">
            <div className="col-span-1">
              <span className="font-semibold uppercase text-default">
                {t('dashboard.create.new')}
              </span>
              {renderItemsCreate()}
            </div>
            <div className="col-span-3">
              <div
                className="border-2 border-gray-100 w-full rounded-md shadow-sm"
                ref={refClosePopup}
              >
                <div className="p-3 font-semibold text-2xl">
                  <div className="text-gray-600 flex justify-between">
                    <span className="relative">
                      <div
                        className="cursor-pointer py-3 px3 uppercase"
                        onClick={toggleDropDown}
                      >
                        {nameType}
                        <i className="fas fa-chevron-down px-3" />
                      </div>
                      {isShowDropdown && (
                        <div className="absolute left-48 bg-menu-active flex flex-col p-3 shadow  w-72 rounded ">
                          {renderDropdownItem()}
                        </div>
                      )}
                    </span>

                    <div className="flex items-center flex-row">
                      {renderDropdownFilterTimes()}
                      <span
                        className={`${
                          (isShowSelectTime || !!selectEndDate) &&
                          'text-yellow-400'
                        } relative text-center flex flex-row justify-center items-center`}
                      >
                        <div onClick={toggleSelectTime}>
                          {selectStartDate &&
                          selectEndDate &&
                          !isShowSelectTime ? (
                            formatCustomSearchTime(
                              selectStartDate,
                              selectEndDate
                            )
                          ) : (
                            <i className="fas fa-angle-down cursor-pointer" />
                          )}
                        </div>

                        {isShowSelectTime && (
                          <div className="flex flex-col justify-start absolute bg-default top-10 right-0 py-3 rounded-md">
                            <div className="py-3 flex flex-col justify-start items-start mx-3">
                              <label className="text-white">
                                {t('date.start')}
                              </label>
                              <input
                                className="text-black rounded-md"
                                type="date"
                                max={formatMomentQuery(currentDate)}
                                min=""
                                value={selectStartDate}
                                onChange={(e: any) =>
                                  setState({
                                    ...state,
                                    selectStartDate: e?.target?.value,
                                  })
                                }
                              />
                            </div>
                            <div className="py-3 flex flex-col justify-start items-start mx-3">
                              <label className="text-white">
                                {t('date.end')}
                              </label>
                              <input
                                className="text-black rounded-md"
                                type="date"
                                max={formatMomentQuery(currentDate)}
                                min={formatMomentQuery(selectStartDate)}
                                value={selectEndDate}
                                onChange={(e: any) =>
                                  setState({
                                    ...state,
                                    selectEndDate: e?.target?.value,
                                  })
                                }
                              />
                            </div>
                            <button
                              className=" mx-16 text-center text-black bg-white px-3 my-2 rounded-md text-xl"
                              onClick={onSearchCustomTime}
                            >
                              {t('search')}
                            </button>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="chart">
                    <canvas
                      ref={ref}
                      width={'100%'}
                      height={350}
                      id="kt_chart_order_statistics"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold uppercase text-default">
              {t('dashboard.title')}
            </span>
            <div className="grid grid-cols-4 gap-6 mt-3">
              {statisticDashboard?.map((items: any, index: number) => {
                const customType = customDashBoardType(items?.type);
                if (customType) return null;
                return (
                  <div key={index}>
                    <div
                      className="group bg-parent-tab w-full p-3 hover:bg-button-default rounded-lg shadow-md"
                      onClick={() => checkPath(items?.type)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-default font-semibold">
                          <span className="text-default group-hover:text-white">
                            {checkKeyIcon(items?.type)}
                          </span>
                          <span className="text-default px-2 text-2xl group-hover:text-white">
                            {t(`dashboard.new.${items?.type}`)}
                          </span>
                        </span>
                        <span className="text-yellow-500 text-4xl font-semibold">
                          {`+${items?.new || 0}`}
                        </span>
                      </div>
                      <span
                        className={
                          'flex justify-end items-end px-3 font-semibold '
                        }
                      >
                        <span
                          className={`${
                            Number(items?.percent) > 0
                              ? 'text-green-400'
                              : 'text-red-500'
                          } group-hover:bg-white px-2 mt-2 rounded-md`}
                        >
                          {`${Number(items?.percent).toFixed(0) || 0}%`}
                        </span>
                      </span>
                      <div className="mt-2">
                        <span className="text-default font-semibold text-2xl group-hover:text-white">
                          {`+${items?.total || 0}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="w-full h-96 mt-12 rounded-xl  bg-gray-100 bg-opacity-60">
            <div
              onClick={() => setState({ ...state, isShowModal: !isShowModal })}
              className="bg-blue-500 flex flex-col items-center justify-center py-2 rounded-t-lg shadow cursor-pointer"
            >
              <span className="text-white text-xl leading-relaxed font-semibold mt-2">
                {t('users.online')}
              </span>
              <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center my-1">
                <i className="fas fa-users text-3xl text-blue-500" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-8xl font-semibold text-red-500 my-14">
                {'354'}
              </span>
              <span className="font-medium text-gray-400">
                {'UTC'}
                <span className="font-medium text-gray-400 mx-3">
                  {formatTime(new Date())}
                </span>
              </span>
            </div>
          </div>
          <div className="w-full h-50vh mt-12 rounded-xl  bg-gray-100 bg-opacity-60 flex flex-col items-center py-8 space-y-5 px-4">
            <button className="group p-3 w-full rounded-xl border-2 border-tab-active outline-none bg-parent-tab hover:bg-tab-active">
              <span className="text-2xl text-tab-active font-medium group-hover:text-white">
                {'Zabbix'}
              </span>
            </button>
            <button className="group p-3 w-full rounded-xl border-2 border-tab-active outline-none bg-parent-tab hover:bg-tab-active">
              <span className="text-2xl text-tab-active font-medium group-hover:text-white">
                {'Grafana'}
              </span>
            </button>
            <button className="group p-3 w-full rounded-xl border-2 border-tab-active outline-none bg-parent-tab hover:bg-tab-active">
              <span className="text-2xl text-tab-active font-medium group-hover:text-white">
                {'Sustainment Documentation'}
              </span>
            </button>
          </div>
          <Modal
            header={t('user.online.list')}
            isShowModal={isShowModal}
            toggle={() => setState({ ...state, isShowModal: !isShowModal })}
            body={renderListOnlineUsers()}
          />
        </div>
      </div>
    </div>
  );
}
