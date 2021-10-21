import { DASHBOARD_TYPES } from '../constants';

export const getResultSearchAutoCompletedTypes = (type: string, data: any) => {
  switch (type) {
    case DASHBOARD_TYPES.USER:
      return `${data?.name}, ${data?.email?.email}`;
    case DASHBOARD_TYPES.LOCATION:
      return `${data?.name}, ${data?.address}`;
    default:
      return '';
  }
};

export const getValueSearchAutoCompleted = (
  type: string,
  newData: any,
  data: any
) => {
  switch (type) {
    case DASHBOARD_TYPES.USER:
      return { ...newData, creatorId: data?.id };
    case DASHBOARD_TYPES.LOCATION:
      return data;
    default:
      return '';
  }
};
