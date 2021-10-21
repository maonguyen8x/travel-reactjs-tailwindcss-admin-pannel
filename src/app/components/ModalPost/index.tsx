import React, { memo, useState, useEffect } from 'react';
import Modal from 'app/components/Modal';
import Images from 'app/assets/images';
import {
  formatTime,
  checkSharePlan,
  formatFullTime,
  checkPageTypes,
  groupTypePlan,
  getImageTypePlan,
  getIconTypePlan,
  checkDataApi,
  countCountryLocations,
} from 'app/utils';
import {
  KEY_TRAVEL_TYPES,
  ROUTERS,
  SOCIAL_INTERACTIVE,
  TASKS_STATUS_TYPES,
  POST_TYPES,
  COLORS,
} from 'app/constants';
import { history } from 'app/services/History';
import Api from 'app/services/Api';
import { t } from 'app/i18n';
import Carousel from '../Carousel';
import { IProps } from './type';
import ListCommentsPost from './Interactive/ListComments';
import ListLikePost from './Interactive/ListLike';
import ListRankingPost from './Interactive/ListRanking';
import ListSharePost from './Interactive/ListShare';

const ModalPost = ({ isShowModal, toggle, data }: IProps) => {
  const backgroundPost = [
    { url: data?.backgroundPost?.url || data?.sourcePost?.backgroundPost?.url },
  ];
  const parseMedias = data?.medias || data?.sourcePost?.medias;
  const parseMediaContents = parseMedias && JSON.parse(parseMedias);
  const planId = data?.sourcePost?.planId || data?.planId;

  const [state, setState]: any = useState({
    view: SOCIAL_INTERACTIVE.COMMENT,
    planData: [],
  });

  const { view, planData } = state;

  const onDetailPost = (id: string) => () => {
    history.push(ROUTERS.POST_DETAIL.replace(':id', id));
  };

  const onDetailPlan = (id: string) => () => {
    history.push(ROUTERS.PLAN_DETAIL.replace(':id', id));
  };

  const onGetPlanById = async () => {
    const res: any = await Api.getplanById(planId);
    setState({
      ...state,
      planData: checkDataApi(res),
    });
  };

  useEffect(() => {
    if (!!planId) {
      onGetPlanById();
    }
  }, [planId]);

  const getListInteractive = (type: string) => {
    switch (type) {
      case SOCIAL_INTERACTIVE.LIKE:
        return <ListLikePost id={data?.id} />;
      case SOCIAL_INTERACTIVE.SHARE:
        return <ListSharePost id={data?.id} />;
      case SOCIAL_INTERACTIVE.COMMENT:
        return <ListCommentsPost id={data?.id} />;
      case SOCIAL_INTERACTIVE.RANKING:
        return <ListRankingPost id={data?.id} />;
      default:
        return null;
    }
  };

  const onChangeView = (view: string) => () => {
    setState({
      ...state,
      view,
    });
  };

  const renderInteractive = (border: string) => {
    return (
      <div className={`border-${border}-2 py-3 space-x-28`}>
        <i
          onClick={onChangeView(SOCIAL_INTERACTIVE.LIKE)}
          className={`far fa-heart text-gray-600 cursor-pointer ${
            SOCIAL_INTERACTIVE.LIKE === view && 'text-blue-400'
          }`}
        >
          &#160;{data?.totalLike}
        </i>
        <i
          onClick={onChangeView(SOCIAL_INTERACTIVE.COMMENT)}
          className={`far fa-comment text-gray-600 cursor-pointer ${
            SOCIAL_INTERACTIVE.COMMENT === view && 'text-blue-400'
          }`}
        >
          &#160;{data?.totalComment}
        </i>
        <i
          onClick={onChangeView(SOCIAL_INTERACTIVE.SHARE)}
          className={`far fa-paper-plane text-gray-600 cursor-pointer ${
            SOCIAL_INTERACTIVE.SHARE === view && 'text-blue-400'
          }`}
        >
          &#160;{data?.totalShare}
        </i>
        {!!data?.locationId && (
          <i
            onClick={onChangeView(SOCIAL_INTERACTIVE.RANKING)}
            className={`fas fa-poll text-gray-600 ${
              SOCIAL_INTERACTIVE.RANKING === view && 'text-blue-400'
            }`}
          >
            &#160;{data?.totalRanking}
          </i>
        )}
      </div>
    );
  };

  const getColorBackgroundPosts = (color: string) => {
    switch (color) {
      case COLORS.WHITE:
        return 'text-white';
      case COLORS.BLACK:
        return 'text-black';
      case COLORS.PINK:
        return 'text-red-400';
      case COLORS.BLUE:
        return 'text-blue-400';
      case COLORS.N_GREEN:
        return 'text-green-500';
      case COLORS.BROWN:
        return 'text-yellow-900';
      default:
        return '';
    }
  };

  return (
    <>
      <Modal
        isShowModal={isShowModal}
        toggle={toggle}
        body={
          <div className="p-3 grid grid-cols-2 gap-4">
            <div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                  <img
                    className="w-20 h-20 rounded-full bg-cover"
                    src={
                      data?.creator?.profiles?.avatars?.mediaContent?.urlTiny ||
                      Images.avatar_defautl.default
                    }
                    alt="avatar"
                  />
                  <div className="flex flex-col items-start px-3">
                    <span className="text-2xl font-semibold text-default">
                      {data?.creator?.name}
                    </span>
                    {!!data?.location && (
                      <span className="text-lg text-gray-500 font-medium">{`at ${data?.location?.name}`}</span>
                    )}
                    <span className="text-lg text-yellow-500 font-medium">
                      {formatTime(data?.createdAt)}
                      <i className="fas fa-globe-europe px-3 text-gray-500" />
                    </span>
                  </div>
                </div>
                {data?.sourcePost && (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
                    <i className="far fa-paper-plane text-lg text-default" />
                  </div>
                )}
              </div>
              {/* // check type share || share plan */}
              {(!!data?.sourcePost || checkSharePlan(data)) && (
                <div className="overflow-y-scroll h-auto max-h-40 m-3 cursor-pointer break-all">
                  <span>{data?.content}</span>
                </div>
              )}
              {/* // check share plan */}
              {(checkSharePlan(data) || checkSharePlan(data?.sourcePost)) && (
                <div>
                  <div className="bg-blue-400 bg-opacity-30 pt-4 px-3 pb-2">
                    <span className="text-blue-400 font-semibold text-2xl">
                      {planData?.planName}
                    </span>
                    <div className="mt-2 text-right">
                      <span className="text-gray-500">
                        {`${formatFullTime(
                          planData?.startDate
                        )} - ${formatFullTime(planData?.endDate)}`}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-y-scroll overflow-x-hidden h-50vh grid grid-cols-4">
                    {Object.keys(KEY_TRAVEL_TYPES)?.map(
                      (key: any, index: number) => (
                        <div className="my-2" key={index}>
                          <div className="flex items-center justify-center p-3 relative">
                            <img
                              className={`w-full h-32 2xl:h-44 rounded-md object-cover ring-2 ring-${checkPageTypes(
                                key
                              )} ${
                                !getImageTypePlan(planData, key) &&
                                'object-scale-down p-4'
                              } `}
                              src={
                                getImageTypePlan(planData, key) ||
                                Images.logo.default
                              }
                              alt={key}
                            />
                            <img
                              className="absolute top-8 w-8 h-8"
                              src={getIconTypePlan(key)}
                              alt={key}
                            />
                          </div>
                          {groupTypePlan(planData)[key]?.map(
                            (items: any, index: number) => (
                              <div
                                className="flex items-baseline py-4 px-3"
                                key={index}
                              >
                                <i
                                  className={`${
                                    items?.status ===
                                    TASKS_STATUS_TYPES.COMPLETED
                                      ? 'far fa-check-square'
                                      : 'far fa-square'
                                  } text-${checkPageTypes(items?.taskType)}`}
                                />
                                <span className="px-2">
                                  {items?.location?.name}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className="pt-3">
                    <span
                      className="text-2xl font-semibold text-blue-400"
                      onClick={onDetailPlan(planData?.id)}
                    >
                      {t('plan.detail')}
                      <i className="fas fa-chevron-right px-2 text-xl" />
                    </span>
                  </div>
                </div>
              )}
              {!checkSharePlan(data) && !checkSharePlan(data?.sourcePost) && (
                <div
                  className={`${
                    !!data?.sourcePost
                      ? 'bg-blue-500 bg-opacity-5'
                      : 'text-transparent'
                  } m-3 p-3`}
                >
                  {!!data?.sourcePost && (
                    <div className="flex flex-row items-center mb-3">
                      <img
                        className="w-20 h-20 rounded-full bg-cover"
                        src={
                          data?.sourcePost?.creator?.profiles?.avatars
                            ?.mediaContent?.urlTiny ||
                          Images.avatar_defautl.default
                        }
                        alt="avatar"
                      />
                      <div className="flex flex-col items-start px-3">
                        <span className="text-2xl text-default font-semibold">
                          {data?.sourcePost?.creator?.name}
                        </span>
                        {!!data?.sourcePost?.location && (
                          <span className="text-lg text-gray-500 font-medium">{`at ${data?.sourcePost?.location?.name}`}</span>
                        )}
                        <span className="text-lg text-gray-500 font-medium">
                          {formatTime(data?.sourcePost?.createdAt)}
                          <i className="fas fa-globe-europe px-3" />
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="relative">
                    <Carousel
                      className="h-40vh !important w-full object-contain border-2 border-gray-300"
                      items={
                        data?.mediaContents ||
                        data?.sourcePost?.mediaContents ||
                        parseMediaContents ||
                        backgroundPost ||
                        []
                      }
                    />
                    {data?.postType === POST_TYPES.MY_MAP && (
                      <div className="absolute bottom-3 left-32 2xl:left-64">
                        <span className="bg-white text-black py-1 px-3 m-1">
                          {t('user.my_map.completed')}
                        </span>
                        <div className="mt-2">
                          <span className="bg-black bg-opacity-50 text-white py-1 px-3 m-1 font-semibold">
                            {`${data?.metadata?.hadCameLocations?.length} ${t(
                              'user.my_map.location'
                            )}`}
                          </span>
                          <span className="bg-black bg-opacity-50 text-white py-1 px-3 m-1 font-semibold">
                            {`${countCountryLocations(data)} ${t(
                              'user.my_map.country'
                            )}`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {!data?.sourcePost && (
                    <div className="mb-2">{renderInteractive('b')}</div>
                  )}
                  <div
                    className="overflow-y-scroll h-auto max-h-64 cursor-pointer pt-2"
                    onClick={onDetailPost(data?.sourcePostId || data?.id)}
                  >
                    <span
                      className={`${
                        (!!data?.sourcePost && 'text-blue-400') ||
                        `${getColorBackgroundPosts(data?.metadata?.color)}`
                      }`}
                    >
                      {!!data?.sourcePost
                        ? data?.sourcePost?.content
                        : data?.content}
                    </span>
                  </div>
                </div>
              )}
              {(!!data?.sourcePost || checkSharePlan(data)) && (
                <div className="mt-2">{renderInteractive('t')}</div>
              )}
            </div>
            <div className="bg-gray-100 bg-opacity-80 p-3 rounded-md max-h-full min-h-50vh">
              {getListInteractive(view)}
            </div>
          </div>
        }
      />
    </>
  );
};

export default memo(ModalPost, (oldProps, newProps) => {
  if (
    oldProps?.isShowModal !== newProps?.isShowModal ||
    oldProps?.data !== newProps?.data
  ) {
    return false;
  }
  return true;
});
