import React, { useEffect, useState } from 'react';
import { formatTime, getFieldStatus } from 'app/utils';
import SquareImage from 'app/components/SquareImage/SquareImage';
import Modal from 'app/components/Modal';
import Carousel from 'app/components/Carousel';
import { t } from 'app/i18n';

const FeedbackDetail = (props: any) => {
  const { feedbackDetail, getFeedbackById, CHANGE_STATUS, history } = props;

  const [state, setState] = useState({
    isShowModal: false,
    indexCarousel: 0,
    status: '',
  });

  const { isShowModal, status, indexCarousel } = state;

  const onChangeStatus = (status: string) => {
    setState({
      ...state,
      status: status,
    });
  };

  const onToggleModal = (index: any) => {
    setState({
      ...state,
      isShowModal: !isShowModal,
      indexCarousel: index,
    });
  };

  useEffect(() => {
    const { id } = props.match.params;
    getFeedbackById(id);
  }, []);

  const renderReportCreator = () => {
    const DATA = [
      {
        title: t('feedback.name'),
        value: feedbackDetail?.user?.name,
        color: true,
      },
      {
        title: t('feedback.created'),
        value: formatTime(feedbackDetail?.createdAt),
      },
    ];
    return (
      <>
        {DATA?.map((items: any, index: number) => (
          <div className="flex mb-4" key={index}>
            <span className="flex items-center w-full font-semibold">
              {items?.title}
            </span>
            <span
              className={`flex items-center break-all w-full ${items?.color}`}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2">
        {renderReportCreator()}
        <span className="flex items-center w-full font-semibold">
          {t('feedback.content')}
        </span>
        <div className="mt-2">
          <span className="flex items-center break-all w-full">
            {feedbackDetail?.content}
          </span>
        </div>
        {feedbackDetail?.attachments?.length ? (
          <div className="my-5">
            <span className="border-b-2 text-2xl text-default font-semibold flex">
              {t('feedback.media_content')}
            </span>
            <div className="grid grid-cols-4 gap-3 my-3">
              {feedbackDetail?.attachments?.map((items: any, index: number) => (
                <div key={index} onClick={() => onToggleModal(index)}>
                  <SquareImage src={items?.url} />
                </div>
              ))}
              <Modal
                isShowModal={isShowModal}
                toggle={onToggleModal}
                body={
                  <Carousel
                    items={feedbackDetail?.attachments}
                    indexCarousel={indexCarousel}
                  />
                }
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-span-1">
        <span className="text-default font-semibold flex">
          {t('report.label')}
        </span>
        <div className="mt-2">
          <select
            value={status || feedbackDetail?.status}
            className="w-full h-16 px-3 border bg-gray-100 mb-4"
            onChange={(e: any) => onChangeStatus(e?.target?.value)}
          >
            {getFieldStatus()?.map((items: any, key: number) => (
              <option key={key} value={items?.value}>
                {items?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between space-x-10">
          <div
            className="w-full py-3 text-center bg-green-500 rounded-md text-white"
            onClick={() => CHANGE_STATUS(status || feedbackDetail?.status)}
          >
            {t('feedback.update')}
          </div>
          <div
            className="w-full py-3 text-center bg-gray-400 rounded-sm text-white"
            onClick={() => history.goBack()}
          >
            {t('feedback.cancel')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
