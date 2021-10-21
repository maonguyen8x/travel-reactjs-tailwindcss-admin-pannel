import Modal from 'app/components/Modal';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { history } from 'app/services/History';
import { IReduxStates } from 'app/store/redux/redux.type';
import { formatDay, formatTime, getTypeUsers } from 'app/utils';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { IProps } from './type';

const ModalUsers = (props: IProps) => {
  const { isShowModal, toggle, data, countBooking, countPage } = props;

  const renderInformation = () => {
    const DATA_INFOR = [
      {
        key: t('user.birthday'),
        value: formatDay(data?.profiles?.birthday?.birthday),
      },

      {
        key: t('user.gender'),
        value: getTypeUsers(data?.profiles?.gender?.gender),
      },
      {
        key: t('user.job'),
        value: data?.profiles?.work?.work,
      },
      {
        key: t('user.created'),
        value: formatTime(data?.createdAt),
      },
      {
        key: t('user.email'),
        value: data?.email?.email,
      },
      {
        key: t('user.phone'),
        value: data?.profiles?.phone?.phone,
      },
      {
        key: t('user.web'),
        value: data?.profiles?.website?.website,
      },
      {
        key: t('user.address'),
        value: data?.profiles?.address?.address,
      },
    ];

    return (
      <>
        {DATA_INFOR.map((items: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-center my-7">
              <span className="flex justify-start items-center font-semibold w-full">
                {items?.key}
              </span>
              <span className="flex justify-end w-full">{items?.value}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderUserCreated = () => {
    const DATA_USER_CREATED = [
      {
        key: t('user.created.location'),
        value: data?.totalLocations,
      },
      {
        key: t('user.created.location_complete'),
        value: data?.totalCompleted,
      },
      {
        key: t('user.created.location_wish_list'),
        value: data?.totalWishList,
      },
      {
        key: t('user.created.place'),
        value: data?.totalBookmarks,
      },
      {
        key: t('user.created.plans'),
        value: data?.totalPlans,
      },
      {
        key: t('user.created.posts'),
        value: data?.totalPosts,
      },
      {
        key: t('user.created.blocked'),
        value: data?.totalBlockedOtherUser,
      },
      {
        key: t('user.created.block'),
        value: data?.totalBlockedByOtherUser,
      },
      {
        key: t('report_user.created.booking'),
        value: countBooking,
      },
      {
        key: t('report_user.created.page'),
        value: countPage,
      },
    ];

    return (
      <>
        {DATA_USER_CREATED.map((items: any, index: number) => (
          <div
            className="flex justify-between items-center mb-8"
            key={index}
            onClick={items?.path}
          >
            <span className={'font-semibold'}>{items?.key}</span>
            <span
              className={`${items?.active && 'text-blue-400 cursor-pointer'}`}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  const renderfamousSocial = () => {
    const DATA = [
      {
        key: t('user.name'),
        value: data?.name,
        style: true,
      },
      {
        key: t('user.follower'),
        value: data?.totalFollower,
      },
      {
        key: t('user.followings'),
        value: data?.totalFollowing,
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
              onClick={item?.style && onMoveUserDetail()}
              className={`break-all ml-12 text-default ${
                item?.style && 'font-semibold text-blue-400 cursor-pointer'
              }`}
            >
              {item?.value}
            </span>
          </div>
        ))}
      </>
    );
  };

  const onMoveUserDetail = () => () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', data?.id));
  };

  return (
    <Modal
      isShowModal={isShowModal}
      toggle={() => toggle()}
      body={
        <div className="grid grid-cols-3">
          <div className="px-10 border-r col-span-2">
            <div className="flex flex-wrap justify-center items-center">
              <div className="">
                <img
                  className="w-24 h-24 rounded-full shadow"
                  src={data?.profiles?.avatars?.mediaContent?.url}
                  alt="avatar"
                />
              </div>

              <div className="flex flex-1 flex-col pl-4">
                <span className="text-right text-danger font-weight-bold text-sm">
                  {`${t('user.id')}: ${data?.id || 0}`}
                </span>
                {renderfamousSocial()}
              </div>
            </div>
            {renderInformation()}
            <div>
              <span className="flex justify-start items-center font-semibold w-full">
                {t('user.intro')}
              </span>
            </div>
            <div className="my-2">
              <span className="flex w-full">
                {data?.profiles?.introduce?.introduce}
              </span>
            </div>
          </div>
          <div className="px-10 col-span-1">
            <div className="flex flex-col">{renderUserCreated()}</div>
          </div>
        </div>
      }
    />
  );
};

const mapStateToProps = (state: IReduxStates) => ({
  countBooking: state.user.listBookings?.length,
  countPage: state.user.listPage?.count,
});

export default memo(
  connect(mapStateToProps)(ModalUsers),
  (oldProps, newProps) => {
    if (
      oldProps?.isShowModal !== newProps?.isShowModal ||
      oldProps?.data !== newProps?.data
    ) {
      return false;
    }
    return true;
  }
);
