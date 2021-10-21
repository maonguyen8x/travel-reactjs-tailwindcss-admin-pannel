import React, { useState, useEffect } from 'react';
import { formatDay, getTypeReport, getFieldStatus } from 'app/utils';
import { t } from 'app/i18n';
import { ROUTERS, REPORT_TYPES } from 'app/constants';
import ModalPost from 'app/components/ModalPost';
import ModalUsers from './_component/ModalUsers';
import ModalLocations from './_component/ModalLocations';
import ModalPage from './_component/ModalPage';
import ModalRanking from './_component/ModalRanking';

const ReportDetail = (props: any) => {
  const {
    reportDetail,
    history,
    CHANGE_STATUS,
    getPostById,
    postDetail,
    getUserById,
    userDetail,
    getPageById,
    pageDetail,
    getLocationById,
    locationDetail,
  } = props;

  const [state, setState] = useState({
    data: [{}, {}, {}],
    isShowModalPost: false,
    isShowModalLocations: false,
    isShowModalUsers: false,
    isShowModalPage: false,
    isShowModalRanking: false,
    status: '',
  });

  const {
    data,
    isShowModalPost,
    isShowModalLocations,
    isShowModalUsers,
    isShowModalPage,
    isShowModalRanking,
    status,
  } = state;

  const onChangeStatus = (status: string) => {
    setState({
      ...state,
      status,
    });
  };

  const onToggleModalPost = () => () => {
    getPostById(reportDetail?.targetPostId);
    setState({
      ...state,
      isShowModalPost: !isShowModalPost,
    });
  };

  const onToggleModalLocations = () => () => {
    getLocationById(reportDetail?.targetLocationId);
    setState({
      ...state,
      isShowModalLocations: !isShowModalLocations,
    });
  };

  const onToggleModalUsers = () => () => {
    getUserById(reportDetail?.targetUserId);
    setState({
      ...state,
      isShowModalUsers: !isShowModalUsers,
    });
  };

  const onToggleModalPage = () => () => {
    setState({
      ...state,
      isShowModalPage: !isShowModalPage,
    });
  };

  const onToggleModalRanking = () => () => {
    setState({
      ...state,
      isShowModalRanking: !isShowModalRanking,
    });
  };

  const onSwitchModal = (type: string) => {
    switch (type) {
      case REPORT_TYPES.USER:
        return onToggleModalUsers();
      case REPORT_TYPES.POST:
        return onToggleModalPost();
      case REPORT_TYPES.LOCATION:
        return onToggleModalLocations();
      case REPORT_TYPES.PAGE:
        return onToggleModalPage();
      case REPORT_TYPES.RANKING:
        return onToggleModalRanking();
      default:
        return null;
    }
  };

  const onDetailCreator = () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', reportDetail?.user?.id));
  };

  useEffect(() => {
    const { id } = props.match.params;
    props.getReportById(id);
  }, []);

  const renderReportCreator = () => {
    const DATA = [
      {
        title: t('report.name'),
        value: reportDetail?.user?.name,
        color: true,
        path: onDetailCreator,
      },
      {
        title: t('report.created'),
        value: formatDay(reportDetail?.createdAt),
      },
      {
        title: t('report.detail.type'),
        value: `${t('report.title')} ${getTypeReport(
          reportDetail?.reportType
        )}`,
        color: true,
        isView: true,
        path: onSwitchModal(reportDetail?.reportType),
      },
    ];
    return (
      <>
        {DATA?.map((items: any, index: number) => (
          <div className="flex mb-5" key={index}>
            <span className="flex items-center font-semibold w-3/12">
              {items?.title}
            </span>
            <span
              onClick={!!items?.path && items?.path}
              className={`flex items-center break-all ${
                items?.color && 'text-blue-400 font-semibold cursor-pointer'
              } ${items?.isView && 'capitalize'}`}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="col-span-3">
        {renderReportCreator()}
        <div className="py-4">
          <span className="flex items-center font-semibold w-full text-default text-2xl">
            {t('report.content')}
          </span>
          <div className="mt-2">
            <span className={'flex items-center break-all'}>
              {reportDetail?.content}
            </span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-default text-2xl flex font-semibold">
          {t('report.label')}
        </label>
        <div className="mt-2">
          <select
            className="w-full h-10 px-3 border bg-gray-100"
            value={status || reportDetail?.reportStatus}
            onChange={(e: any) => onChangeStatus(e?.target?.value)}
          >
            {getFieldStatus()?.map((items: any, key: number) => (
              <option key={key} value={items?.value}>
                {items?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between py-3 space-x-5">
          <button
            className="text-white bg-gray-400 px-10 py-2 rounded-lg  w-full"
            onClick={() => history.goBack()}
          >
            {t('booking.canceled')}
          </button>
          <button
            className="text-white bg-green-500 px-10 py-2 rounded-lg w-full"
            onClick={() => CHANGE_STATUS(status || reportDetail?.reportStatus)}
          >
            {t('report.submit')}
          </button>
        </div>
      </div>
      <ModalUsers
        isShowModal={isShowModalUsers}
        toggle={onToggleModalUsers()}
        data={userDetail}
      />
      <ModalLocations
        isShowModal={isShowModalLocations}
        toggle={onToggleModalLocations()}
        data={locationDetail}
      />
      <ModalPage
        isShowModal={isShowModalPage}
        toggle={onToggleModalPage()}
        data={[]}
      />
      <ModalRanking
        isShowModal={isShowModalRanking}
        toggle={onToggleModalRanking()}
        data={[]}
      />
      <ModalPost
        isShowModal={isShowModalPost}
        toggle={onToggleModalPost()}
        data={postDetail}
      />
    </div>
  );
};
export default ReportDetail;
