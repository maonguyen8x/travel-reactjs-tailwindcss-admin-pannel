import React, { useCallback } from 'react';
import { t } from 'app/i18n';
import {
  FOARMT_DAY_CUSTOM,
  ROUTERS,
  TASKS_STATUS_TYPES,
  TRAVEL_TYPES,
} from 'app/constants';
import {
  checkPageTypes,
  getDataPlan,
  countTasksTypePlan,
  groupTimePlan,
} from 'app/utils';
import moment from 'moment';
import Images from 'app/assets/images';
import { history } from 'app/services/History';
import { IProps } from './DetailPlan.type';

const FormPlan = ({ planDetail }: IProps) => {
  const renderInformationPlan = useCallback(() => {
    return (
      <>
        {getDataPlan(planDetail).map((items: any, index: number) => (
          <div key={index} className="flex justify-between items-center my-4">
            <span
              className={`flex justify-start items-center w-full  font-semibold ${
                items?.color && 'text-default'
              }`}
            >
              {items?.key}
            </span>
            <span
              className={`flex justify-end items-center w-full ${
                items?.color && 'text-default font-medium'
              }`}
            >
              {items?.value}
            </span>
          </div>
        ))}
      </>
    );
  }, [planDetail]);

  const renderPlanTypes = () => {
    const DATA = [
      {
        key: t('type.location'),
        type: TRAVEL_TYPES.WHERE,
        color: 'bg-green-400',
      },
      {
        key: t('type.stay'),
        type: TRAVEL_TYPES.STAY,
        color: 'bg-yellow-500',
      },
      {
        key: t('type.food'),
        type: TRAVEL_TYPES.FOOD,
        color: 'bg-red-500',
      },
      {
        key: t('type.tour'),
        type: TRAVEL_TYPES.TOUR,
        color: 'bg-blue-400',
      },
    ];
    return (
      <div>
        {DATA.map((item: any, index: number) => (
          <button
            key={index}
            className={`px-5 py-2 font-medium mr-3 rounded-sm ${item?.color}`}
          >
            <span className="text-white ">
              {`${item?.key}/${countTasksTypePlan(planDetail, item?.type)}`}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const onMoveDetail = () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', planDetail?.userId));
  };

  return (
    <div className="grid grid-cols-3 p-4">
      <div className="col-span-1 px-4 border-right">
        <div
          onClick={onMoveDetail}
          className="flex flex-row items-center cursor-pointer"
        >
          <span className="font-semibold">{t('creator.title')}</span>
          <img
            className="w-16 h-16 mx-4 bg-cover object-cover rounded-full shadow"
            src={Images.avatar_defautl.default}
            alt="avatar"
          />
          <span className="font-medium text-blue-400">
            {planDetail?.user?.name || 'username'}
          </span>
        </div>
        {renderInformationPlan()}
        <div>
          <span
            className={'flex justify-start items-center w-full  font-semibold '}
          >
            {t('plan.note')}
          </span>
        </div>
        <div className="mt-2">
          <span>{planDetail?.note}</span>
        </div>
      </div>
      <div className="col-span-2 px-4">
        <div className="flex items-center">{renderPlanTypes()}</div>
        <div className="grid grid-cols-2 py-4 gap-5 max-h-screen h-full overflow-y-scroll">
          {Object.keys(groupTimePlan(planDetail))?.map(
            (key: any, index: number) => (
              <div key={index} className="py-3">
                <span className="text-default font-medium text-2xl">
                  {`${t('date.day')} ${index + 1}: ${moment(key).format(
                    FOARMT_DAY_CUSTOM
                  )}`}
                </span>
                {groupTimePlan(planDetail)[key]?.map(
                  (items: any, index: number) => {
                    const typeImage = (type: any) => {
                      if (
                        type === TRAVEL_TYPES.WHERE ||
                        type === TRAVEL_TYPES.TOUR
                      ) {
                        return items?.location?.posts?.[0]?.mediaContents?.[0]
                          ?.urlBackground;
                      }
                      return items?.location?.page?.avatar?.urlTiny;
                    };
                    return (
                      <div className="flex flex-row items-center" key={index}>
                        <i
                          className={`text-${checkPageTypes(items?.taskType)} ${
                            items?.status === TASKS_STATUS_TYPES.COMPLETED
                              ? 'far fa-check-square'
                              : 'far fa-square'
                          }`}
                        />
                        <div
                          className={`m-3 rounded-full border-2 border-${checkPageTypes(
                            items?.taskType
                          )}`}
                        >
                          <img
                            className={
                              'bg-cover w-16 h-16 object-cover rounded-full  shadow  '
                            }
                            src={typeImage(items?.taskType)}
                            alt=""
                          />
                        </div>
                        {items?.location?.name}
                      </div>
                    );
                  }
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default FormPlan;
