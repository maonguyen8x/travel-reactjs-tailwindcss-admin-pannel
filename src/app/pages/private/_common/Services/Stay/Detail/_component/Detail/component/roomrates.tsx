import React from 'react';
import NormalInput from 'app/components/Form/NormalInput';
import { t } from 'app/i18n';
import { Col } from 'reactstrap';
import { VND } from 'app/constants';
import { formatMoney, toNumber } from 'app/utils';
import { LableStyle } from '../styled';

interface IProps {
  price: number;
  priceWeekend: number;
  feeIncreaseAdult: number;
  discountMonthlyRental: number;
  feeIncreaseChild: number;
  feeIncreaseInfant: number;
  feeCleaning: number;
  discountYearlyRental: number;
  discountWeeklyRental: number;
}

const RoomRates = ({
  price,
  priceWeekend,
  feeIncreaseAdult,
  discountMonthlyRental,
  feeIncreaseChild,
  feeIncreaseInfant,
  feeCleaning,
  discountYearlyRental,
  discountWeeklyRental,
}: IProps) => (
  <>
    <Col md={12}>
      <LableStyle>{t('APP.STAY.ROOM_RATES')}</LableStyle>
    </Col>
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.MONDAY_THURSDAY')}
      addon={formatMoney(VND, price)}
      disabled
    />
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.FRIDAY_SUNDAY')}
      addon={formatMoney(VND, priceWeekend)}
      disabled
    />
    {discountWeeklyRental > 0 && (
      <NormalInput
        as="Col"
        md="6"
        value={t('APP.STAY.DISCOUNT_WEELLY')}
        addon={`${toNumber(discountWeeklyRental).toPrecision()}%`}
        disabled
      />
    )}
    {discountMonthlyRental > 0 && (
      <NormalInput
        as="Col"
        md="6"
        value={t('APP.STAY.DISCOUNT_MONTHLY')}
        addon={`${toNumber(discountMonthlyRental).toPrecision()}%`}
        disabled
      />
    )}
    {discountYearlyRental > 0 && (
      <NormalInput
        as="Col"
        md="6"
        value={t('APP.STAY.DISCOUNT_RENT')}
        addon={`${toNumber(discountYearlyRental).toPrecision()}%`}
        disabled
      />
    )}
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.INCREASING_ADULT')}
      addon={formatMoney(VND, feeIncreaseAdult)}
      disabled
    />
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.INCREASING_CHILD')}
      addon={formatMoney(VND, feeIncreaseChild)}
      disabled
    />
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.INCREASING_INFANT')}
      addon={formatMoney(VND, feeIncreaseInfant)}
      disabled
    />
    <NormalInput
      as="Col"
      md="6"
      value={t('APP.STAY.CLEANING')}
      addon={formatMoney(VND, feeCleaning)}
      disabled
    />
  </>
);
export default RoomRates;
