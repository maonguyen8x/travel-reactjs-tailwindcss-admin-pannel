/* eslint-disable import/prefer-default-export */
import { t } from 'app/i18n';
import { formatTime, formatDay, formatMoney } from 'app/utils';
import { VND } from 'app/constants';
import { IProps } from './DetailOrderTour.type';

export const dataOrder = (orderTourDetail: IProps) => [
  {
    value: orderTourDetail?.bookingCode,
    label: t('APP.ORDER_TOUR.BOOKING_CODE'),
  },
  {
    value: orderTourDetail?.service?.page?.name,
    label: t('APP.ORDER_TOUR.PAGE_NAME'),
  },
  {
    value: orderTourDetail?.service?.name,
    label: t('APP.ORDER_TOUR.SERVICE_NAME'),
  },
  {
    value: formatTime(orderTourDetail?.tourReservation?.startDate),
    label: t('APP.ORDER_TOUR.STARTDAY'),
  },
  {
    value: formatTime(orderTourDetail?.tourReservation?.endDate),
    label: t('APP.ORDER_TOUR.ENDDAY'),
  },
  {
    value: orderTourDetail?.tourReservation?.numAdult,
    label: t('APP.ORDER_TOUR.NUMBER_OF_ADULT'),
  },
  {
    value: orderTourDetail?.tourReservation?.numChildren,
    label: t('APP.ORDER_TOUR.NUMBER_OF_CHILD'),
  },
  {
    value: orderTourDetail?.tourReservation?.userInfo?.name,
    label: t('APP.ORDER_TOUR.NAME'),
  },
  {
    value: orderTourDetail?.tourReservation?.userInfo?.nationality,
    label: t('APP.ORDER_TOUR.NATIONALITY'),
  },
  {
    value: orderTourDetail?.tourReservation?.userInfo?.email,
    label: t('APP.ORDER_TOUR.EMAIL'),
  },
  {
    value: orderTourDetail?.tourReservation?.userInfo?.phone,
    label: t('APP.ORDER_TOUR.PHONE'),
  },
  {
    value: formatDay(orderTourDetail?.createdAt),
    label: t('APP.ORDER_TOUR.TIME'),
  },
  {
    value: orderTourDetail?.payMethod,
    label: t('APP.ORDER_TOUR.PAYMENT'),
  },
  {
    value: orderTourDetail?.tourReservation?.pickUpPoint,
    label: t('APP.ORDER_TOUR.PICK_UP'),
  },
  {
    value: orderTourDetail?.tourReservation?.dropOffPoint,
    label: t('APP.ORDER_TOUR.DROP_OFF'),
  },
  {
    value: formatMoney(VND, orderTourDetail?.totalPrice),
    label: t('APP.ORDER_TOUR.TOTAL_PRICE'),
  },
  {
    value: orderTourDetail?.tourReservation?.reservationCode,
    label: t('APP.ORDER_TOUR.RESERVATION_CODE'),
  },
];
