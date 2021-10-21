/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { VND } from 'app/constants';
import { formatDay, formatMoney, formatTime } from 'app/utils';
import { IProps } from './DetailOrderStay.type';

export const dataOrder = (orderStayDetail: IProps) => [
  {
    value: orderStayDetail?.bookingCode,
    label: t('APP.ORDER_STAY.BOOKING_CODE'),
  },
  {
    value: orderStayDetail?.service?.page?.email,
    label: t('APP.ORDER_STAY.PAGE_EMAIL'),
  },
  {
    value: orderStayDetail?.service?.name,
    label: t('APP.ORDER_STAY.SERVICE_NAME'),
  },
  {
    value: orderStayDetail?.service?.page?.name,
    label: t('APP.ORDER_STAY.PAGE_NAME'),
  },
  {
    value: formatTime(orderStayDetail?.stayReservation?.startDate),
    label: t('APP.ORDER_STAY.START_DATE'),
  },
  {
    value: formatTime(orderStayDetail?.stayReservation?.endDate),
    label: t('APP.ORDER_STAY.END_DATE'),
  },
  {
    value: orderStayDetail?.stayReservation?.expectedCheckinTime,
    label: t('APP.ORDER_STAY.CHECK_IN'),
  },
  {
    value: orderStayDetail?.stayReservation?.numAdult,
    label: t('APP.ORDER_STAY.ADULT'),
  },
  {
    value: orderStayDetail?.stayReservation?.numChildren,
    label: t('APP.ORDER_STAY.CHILDREN'),
  },
  {
    value: orderStayDetail?.stayReservation?.numInfant,
    label: t('APP.ORDER_STAY.INFANT'),
  },
  {
    value: formatMoney(VND, orderStayDetail?.totalPrice),
    label: t('APP.ORDER_STAY.TOTAL_PRICE'),
  },
  {
    value: orderStayDetail?.stayReservation?.purposeTrip,
    label: t('APP.ORDER_STAY.PURPOSE_TRIP'),
  },
  {
    value: orderStayDetail?.createdBy?.name,
    label: t('APP.ORDER_STAY.OWNER_NAME'),
  },
  {
    value: orderStayDetail?.service?.page?.phone,
    label: t('APP.ORDER_STAY.PAGE_PHONE'),
  },
  {
    value: formatDay(orderStayDetail?.createdAt),
    label: t('APP.ORDER_STAY.CREATED'),
  },
  {
    value: orderStayDetail?.status,
    label: t('APP.ORDER_STAY.STATUS'),
  },
  {
    value: orderStayDetail?.payMethod,
    label: t('APP.ORDER_STAY.PAYMENT'),
  },
  {
    value: orderStayDetail?.stayReservation?.reservationCode,
    label: t('APP.ORDER_TOUR.RESERVATION_CODE'),
  },
];
