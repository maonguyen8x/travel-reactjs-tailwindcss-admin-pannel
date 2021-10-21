import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'app/components/Modal';
import Carousel from 'app/components/Carousel';
import {
  countCountryLocations,
  renderInformationPostDetail,
  getListInteractive,
} from 'app/utils';
import {
  POST_TYPES,
  FOARMT_DAY_CUSTOM,
  ROUTERS,
  PLAN_TYPES,
  EVENTS,
} from 'app/constants';
import { t } from 'app/i18n';
import moment from 'moment';
import SquareImage from 'app/components/SquareImage/SquareImage';
import Breadcrunb from 'app/components/layout/Header/SubHeader/Breadcrumb';
import { EventRegister } from 'app/services/EventRegister';
import PlaningPost from './PlaningPost';

const FormPost = (props: any) => {
  const {
    getPostById,
    postDetail,
    match,
    planDetail,
    getPostSharePlan,
    history,
    lockPost,
  } = props;

  const [state, setState]: any = useState({
    isShowModal: false,
    indexCarousel: 0,
    interactive: '',
    isInteractive: false,
  });

  const { isShowModal, indexCarousel, interactive, isInteractive } = state;
  const paramsId = match?.params?.id;

  const onSeeSourcePost = () => {
    if (!!props?.postDetail?.sourcePost) {
      props?.ON_VIEW_SOURCE_POST();
      return;
    }
    if (!!props?.postDetail?.plan) {
      props?.ON_VIEW_SOURCE_PLAN();
    }
  };

  const onLockPost = () => {
    if (!props?.postDetail?.blockMessage) {
      props?.LOCK_POST(paramsId);
      return;
    }

    props?.UN_LOCK_POST(paramsId);
  };

  const onToggleSocialInteractive = useCallback(
    (interactive = '') => {
      const customInteractive = isInteractive
        ? {
            ...state,
            isInteractive: false,
          }
        : {
            ...state,
            isInteractive: true,
            interactive: interactive,
          };
      setState(customInteractive);
    },
    [isInteractive]
  );

  const onToggleModal = (index: any) => {
    setState({
      ...state,
      isShowModal: !isShowModal,
      indexCarousel: index,
    });
  };

  useEffect(() => {
    getPostById(paramsId);
    if (
      postDetail?.postType === POST_TYPES.SHARE_PLAN ||
      postDetail?.sourcePost?.postType === POST_TYPES.SHARE_PLAN
    ) {
      getPostSharePlan(postDetail?.planId || postDetail?.sourcePost?.planId);
    }
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockPost(data.id, { reason: data.reason, detail: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [paramsId, postDetail?.planId, postDetail?.sourcePost?.planId]);

  const backgroundPost = [
    {
      url:
        postDetail?.backgroundPost?.url ||
        postDetail?.sourcePost?.backgroundPost?.url,
    },
  ];

  const renderDetailPostInformation = useCallback(() => {
    return (
      <>
        {renderInformationPostDetail(postDetail).map(
          (items: any, index: number) => {
            if (!items?.key) return null;
            return (
              <div key={index}>
                <div
                  className={`flex justify-between items-center py-4 ${
                    !!items?.color && 'cursor-pointer'
                  }`}
                  onClick={() => onToggleSocialInteractive(items?.interactive)}
                >
                  <span
                    className={`flex justify-start items-center font-semibold w-full text-${items?.color}`}
                  >
                    {items?.key}
                  </span>
                  <span className="flex justify-end items-center w-full">
                    {items?.value}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </>
    );
  }, [postDetail]);

  const renderDetailPostMediaContents = () => {
    return (
      <div className="w-full ">
        <div className="border-b-2 font-semibold text-2xl text-default mt-5 mb-3 py-1">
          {!!postDetail?.sourcePost
            ? t('post.media_share')
            : !!postDetail?.backgroundPost
            ? t('post.background')
            : t('post.media')}
        </div>
        <div className="h-full max-h-50vh overflow-y-scroll pr-4">
          {!!postDetail?.sourcePost?.planId && (
            <PlaningPost data={planDetail} />
          )}
        </div>
        <div className="h-full max-h-50vh overflow-y-scroll">
          <div className="grid grid-cols-4 gap-5">
            {(
              postDetail?.mediaContents ||
              postDetail?.sourcePost?.mediaContents ||
              []
            )?.map((items: any, index: number) => {
              return (
                <div key={index} onClick={() => onToggleModal(index)}>
                  <SquareImage src={items?.urlTiny} />
                </div>
              );
            })}
            <div onClick={() => onToggleModal(0)}>
              <SquareImage
                src={
                  postDetail?.backgroundPost?.url ||
                  postDetail?.sourcePost?.backgroundPost?.url
                }
              />
            </div>
            <Modal
              isShowModal={isShowModal}
              toggle={() => onToggleModal(0)}
              body={
                <Carousel
                  items={
                    postDetail?.mediaContents ||
                    postDetail?.sourcePost?.mediaContents ||
                    backgroundPost ||
                    []
                  }
                  indexCarousel={indexCarousel}
                />
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const onCreatorDetail = () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', postDetail?.creator?.id));
  };

  const onLocationDetail = () => {
    history.push(
      ROUTERS.LOCATION_DETAIL.replace(':id', postDetail?.locationId)
    );
  };

  return (
    <div className={`${!!match?.params?.locationId && 'p-10 bg-white'}`}>
      <div className={'flex flex-row items-center justify-between pb-16 '}>
        <Breadcrunb
          path={
            !!match?.params?.locationId
              ? t('breadcrumb.location.path')
              : t('breadcrumb.post.path')
          }
          subPath={
            !!match?.params?.locationId
              ? t('breadcrumb.location.sub_path')
              : t('breadcrumb.post.sub_path')
          }
          highlight={postDetail?.id}
          onSubPath={!!match?.params?.locationId && onLocationDetail}
        />
        <div className="flex flex-row items-center justify-center">
          <button
            className={`bg-green-500 py-3 px-10 text-white text-xl shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-6 ${
              !!props?.postDetail?.sourcePost || !!props?.postDetail?.plan
                ? 'block'
                : 'hidden'
            }`}
            onClick={onSeeSourcePost}
          >
            {!!props?.postDetail?.sourcePost
              ? t('view.source_posts')
              : t('view.share_plan')}
          </button>
          <button
            className="bg-red-500 py-3 px-10 text-white text-xl shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={onLockPost}
          >
            {props?.postDetail?.blockMessage
              ? t('post.un_block')
              : t('post.block')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 px-8 border-r-2">
          <div className="flex justify-between items-center py-2">
            <span className="flex justify-start items-center w-full font-semibold ">
              {t('post.name')}
            </span>
            <div
              className="flex justify-end items-center cursor-pointer w-full"
              onClick={onCreatorDetail}
            >
              <div className="flex flex-row">
                <div
                  style={{
                    backgroundImage: `url(${postDetail?.creator?.profiles?.avatars?.mediaContent?.urlTiny})`,
                  }}
                  className="w-16 h-16 bg-cover rounded-full mx-4 -mt-5"
                />
                <span className="flex flex-1 text-blue-400 font-semibold ">
                  {postDetail?.creator?.name}
                </span>
              </div>
            </div>
          </div>
          {getListInteractive(
            postDetail?.id,
            interactive,
            isInteractive,
            onToggleSocialInteractive,
            postDetail?.metadata?.hadCameLocations
          )}
          {renderDetailPostInformation()}
        </div>
        <div className="col-span-2 px-8">
          <div className="grid grid-cols-2">
            {(postDetail?.postType === POST_TYPES.MY_MAP ||
              postDetail?.postType === POST_TYPES.SHARE_PLAN) && (
              <div className="border-b-2">
                <div className="flex justify-between items-center">
                  <span
                    onClick={() =>
                      onToggleSocialInteractive(PLAN_TYPES.COMPLETED)
                    }
                    className={`flex justify-start items-center font-semibold ${
                      postDetail?.postType === POST_TYPES.MY_MAP &&
                      'text-blue-400 cursor-pointer'
                    }`}
                  >
                    {postDetail?.postType === POST_TYPES.MY_MAP
                      ? t('post.my_map')
                      : t('post.plan_name')}
                  </span>
                  <span
                    className={`flex justify-end items-center ${
                      POST_TYPES.SHARE_PLAN && 'text-blue-400'
                    }`}
                  >
                    {postDetail?.postType === POST_TYPES.MY_MAP
                      ? postDetail?.metadata?.hadCameLocations?.length
                      : planDetail?.planName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="flex justify-start items-center w-full font-semibold">
                    {postDetail?.postType === POST_TYPES.MY_MAP
                      ? t('post.country')
                      : t('post.time')}
                  </span>
                  <span className="flex justify-end items-center w-full">
                    {postDetail?.postType === POST_TYPES.MY_MAP
                      ? countCountryLocations(postDetail)
                      : `${moment(planDetail?.startDate).format(
                          FOARMT_DAY_CUSTOM
                        )} - ${moment(planDetail?.endDate).format(
                          FOARMT_DAY_CUSTOM
                        )}`}
                  </span>
                </div>
              </div>
            )}
            <div className="col-span-2">
              {postDetail?.postType === POST_TYPES.SHARE_PLAN && (
                <PlaningPost data={planDetail} />
              )}
            </div>
            <div
              className={`${
                !!postDetail?.sourcePost ? 'col-span-1' : 'col-span-2'
              }`}
            >
              <div className="flex flex-col  py-2">
                <span className="mb-5 font-semibold">
                  {!!postDetail?.sourcePost || !!postDetail?.plan
                    ? t('post.content_share')
                    : t('post.content')}
                </span>

                <span className="overflow-y-scroll max-h-40vh h-full pr-2">
                  {postDetail?.content}
                </span>
              </div>
            </div>
            {!!postDetail?.sourcePost && (
              <div className="col-span-1">
                <div className="flex flex-col py-2">
                  <span className="mb-5 font-semibold">
                    {t('post.content_of_posts_share')}
                  </span>
                  <span className="overflow-y-scroll max-h-40vh h-full pr-2">
                    {postDetail?.sourcePost?.content}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            {postDetail?.postType !== POST_TYPES.SHARE_PLAN &&
              renderDetailPostMediaContents()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPost;
