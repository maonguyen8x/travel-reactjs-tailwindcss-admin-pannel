import Images from 'app/assets/images';
import { COLORS, PLAN_TYPES, TRAVEL_TYPES } from 'app/constants';
import { t } from 'app/i18n';
import { groupBy, transduce } from 'ramda';
import { formatDay, getTypeRegime } from '.';

export const getDataPlan = (planDetail: any) => {
  const DATA = [
    {
      key: t('plan.name'),
      value: planDetail?.planName,
      color: true,
    },
    {
      key: t('plan.view'),
      value: getTypeRegime(planDetail?.accessType),
    },
    {
      key: t('plan.status'),
      value: getTypesPlan(planDetail?.status),
    },
    {
      key: t('plan.startDate'),
      value: formatDay(planDetail?.startDate),
    },
    {
      key: t('plan.endDate'),
      value: formatDay(planDetail?.endDate),
    },
  ];

  return DATA;
};

export const getTypesPlan = (name: string) => {
  switch (name) {
    case PLAN_TYPES.COMPLETED:
      return t('plan.completed');
    case PLAN_TYPES.DRAFT:
      return t('plan.draft');
    default:
      return '';
  }
};

export const getImageTypePlan = (data: any, key: string) => {
  const customData = data?.tasks?.filter(
    (items: any) => items?.taskType === key
  )?.[0];
  return (
    customData?.location?.posts?.[0]?.mediaContents?.[0]?.urlTiny ||
    customData?.location?.page?.avatar?.urlTiny
  );
};

export const groupTypePlan = (planDetail: any) =>
  groupBy((tasks: any) => tasks?.taskType)(planDetail?.tasks || []);

export const groupTimePlan = (planDetail: any) =>
  groupBy((tasks: any) => tasks.taskDate)(planDetail?.tasks || []);

export const countTasksTypePlan = (planDetail: any, type: string) => {
  return (
    planDetail?.tasks?.filter((items: any) => items?.taskType === type)
      ?.length || 0
  );
};

export const getIconTypePlan = (type: string) => {
  switch (type) {
    case TRAVEL_TYPES.STAY:
      return Images.icon_stay.default;
    case TRAVEL_TYPES.FOOD:
      return Images.icon_food.default;
    case TRAVEL_TYPES.TOUR:
      return Images.icon_tour.default;
    case TRAVEL_TYPES.WHERE:
      return Images.icon_where.default;
    default:
      return '';
  }
};

export const checkPageTypes = (type: string) => {
  switch (type) {
    case TRAVEL_TYPES.STAY:
      return COLORS.T_YELLOW;
    case TRAVEL_TYPES.FOOD:
      return COLORS.T_RED;
    case TRAVEL_TYPES.TOUR:
      return COLORS.T_BLUE;
    case TRAVEL_TYPES.WHERE:
      return COLORS.T_GREEN;
    default:
      return '';
  }
};
