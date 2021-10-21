import {
  CUSTOM_SEARCH_TIME,
  FORMAT_DAY,
  FORMAT_FULL_DAY,
  FORMAT_MOMENT_QUERY,
  FORMAT_TIME,
  FORMAT_TIME_STATISTIC,
  TIME_FOMART_DAY,
  FORMAT_DATE_TIME_UTC,
} from 'app/constants';
import moment from 'moment';

export const formatCustomSearchTime = (start: string, end: string) => {
  const startDate = moment(start).format(CUSTOM_SEARCH_TIME);
  const endDate = moment(end).format(CUSTOM_SEARCH_TIME);
  return `${startDate} - ${endDate}`;
};

export const formatTime = (time: any) => moment(time).format(FORMAT_TIME);
export const formatFullTime = (time: any) =>
  moment(time).format(FORMAT_FULL_DAY);

export const formatMomentQuery = (time: any) =>
  moment(time).format(FORMAT_MOMENT_QUERY);
export const formatDay = (time: any) => moment(time).format(FORMAT_DAY);
export const formatToday = (time: any) => moment(time).format(TIME_FOMART_DAY);

export const formatToken = (token: any) => `Bearer ${token}`;

export const formatTimeNow = (time: string) => moment(time).fromNow(true);

export const formartSearchTime = (time: any) =>
  moment(time).format(FORMAT_TIME_STATISTIC);

export const fomartDayTime = (time: any) =>
  moment(time).format(TIME_FOMART_DAY);

/**
 * Ngoc Son 09/06/2021
 * Format time to UTC
 * @param String
 * @returns String
 */
export const formatUtcDateTime = (time: string) =>
  moment(time)
    .utcOffset(+7)
    .format(FORMAT_DATE_TIME_UTC);

export const formatUtcDefaultDateTime = (time: string) =>
  moment(time).utc().format(FORMAT_DATE_TIME_UTC);
