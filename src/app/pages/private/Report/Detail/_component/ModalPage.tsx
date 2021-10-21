import Modal from 'app/components/Modal';
import { t } from 'app/i18n';
import { formatTime } from 'app/utils';
import React, { memo } from 'react';
import { IProps } from './type';

const ModalPage = ({ isShowModal, toggle, data }: IProps) => {
  const renderInformation = () => {
    const DATA = [
      {
        key: t('food.creator'),
        value: data?.creator,
      },
      {
        key: t('food.address'),
        value: data?.location?.address,
      },
      {
        key: t('food.created'),
        value: formatTime(data?.createdAt),
      },
      {
        key: t('report_food.total_posts'),
        value: data?.totalPosts || 0,
      },
      {
        key: t('food.total_services'),
        value: data?.totalServices || 0,
      },
      {
        key: t('food.total_ranking'),
        value: data?.totalRanking || 0,
      },
      {
        key: t('food.total_followings'),
        value: data?.totalFollowing || 0,
      },
      {
        key: t('food.total_like'),
        value: data?.totalLike || 0,
      },
      {
        key: t('food.total_comment'),
        value: data?.totalComment || 0,
      },
      {
        key: t('food.total_share'),
        value: data?.totalShare || 0,
      },
    ];
    return (
      <>
        {DATA.map((items: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-center py-3">
              <span className="flex justify-start items-center w-full font-semibold">
                {items?.key}
              </span>
              <span className="flex justify-end items-center w-full">
                {items?.value}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <Modal
      className="w-1/3"
      isShowModal={isShowModal}
      toggle={() => toggle()}
      body={
        <div className="container">
          <div className="flex justify-between items-center">
            <span className="flex justify-start items-center w-full font-semibold">
              {t('food.detail.name')}
            </span>
            <span className="flex justify-end items-center w-full font-semibold text-blue-400">
              {'DaNangtourist'}
              <img
                className="ml-3 w-24 h-24 rounded-full shadow"
                src={data?.avatar?.urlTiny}
                alt=""
              />
            </span>
          </div>

          {renderInformation()}
          <div className="flex justify-between items-center my-3">
            <span className="flex justify-start items-center w-full font-semibold">
              {t('food.detail.verify')}
              <i className="fas fa-shield-alt bg-red-500 mx-3 p-2 rounded-full text-white cursor-pointer" />
            </span>
            <span className="flex justify-end items-center w-full">
              {data?.isActive ? t('food.verified') : t('food.canceled')}
            </span>
          </div>
          <div>
            <span className="flex justify-start items-center w-full font-semibold pt-3 text-2xl text-default">
              {t('user.intro')}
            </span>
          </div>
          <div className="mt-1">
            <span className="text-xl leading-relaxed text-justify">
              {
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
              }
            </span>
          </div>
        </div>
      }
    />
  );
};

export default memo(ModalPage, (oldProps, newProps) => {
  if (
    oldProps?.isShowModal !== newProps?.isShowModal ||
    oldProps?.data !== newProps?.data
  ) {
    return false;
  }
  return true;
});
