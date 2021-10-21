import Modal from 'app/components/Modal';
import { COLORS, ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { history } from 'app/services/History';
import { formatTime } from 'app/utils';
import React, { memo, useState } from 'react';
import Map from 'app/components/GoogleMap/map';
import { IProps } from './type';

const ModalLocations = ({ isShowModal, toggle, data }: IProps) => {
  const [isShowMap, setShowMap] = useState(false);

  const onToggleModalMap = () => setShowMap(!isShowMap);

  const center = {
    lat: data?.latitude,
    lng: data?.longitude,
  };

  const renderInformationLocation = () => {
    const DATA = [
      {
        key: t('location.form.name'),
        value: data?.name,
        color: COLORS.T_TEXT_DEFAULT,
        bold: true,
      },
      {
        key: t('location.address'),
        value: data?.formatedAddress,
      },
      {
        key: t('location.form.creator'),
        value: data?.creator?.name,
        color: COLORS.T_BLUE,
        bold: true,
        url: data?.creator?.profiles?.avatars?.mediaContent?.url,
        onDetail: () =>
          history.push(ROUTERS.USER_DETAIL.replace(':id', data?.creator?.id)),
      },
      {
        key: t('location.created'),
        value: formatTime(data?.createdAt),
      },
      {
        key: t('location.detail.total_ranking'),
        value: data?.averagePoint,
      },
      {
        key: t('location.detail.total_ranking_jg'),
        value: '',
      },
      {
        key: t('location.detail.total_posts'),
        value: data?.totalPost,
      },
      {
        key: t('location.detail.total_checkin'),
        value: data?.totalReview,
      },
      {
        key: t('location.total_activity'),
        value: data?.totalActivity,
      },
      {
        key: t('location.detail.total_report'),
        value: data?.totalReports,
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
  };

  const renderModalMap = () => {
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
  };

  return (
    <Modal
      className="w-1/3"
      isShowModal={isShowModal}
      toggle={() => toggle()}
      body={
        <div className="container">
          {renderInformationLocation()}
          <div className="text-center py-16">
            <button
              className="bg-default text-white text-xl py-3 px-6 rounded-md"
              onClick={onToggleModalMap}
            >
              {t('view_map')}
            </button>
          </div>
          {renderModalMap()}
        </div>
      }
    />
  );
};

export default memo(ModalLocations, (oldProps, newProps) => {
  if (
    oldProps?.isShowModal !== newProps?.isShowModal ||
    oldProps?.data !== newProps?.data
  ) {
    return false;
  }
  return true;
});
