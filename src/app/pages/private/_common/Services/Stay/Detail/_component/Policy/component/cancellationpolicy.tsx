import React from 'react';
import { t } from 'app/i18n';
import {
  LableStyle,
  WrapStyled,
  CircleStyle,
  LineVerticalStyled,
  LineHorizontal,
} from '../styled';

interface IProps {
  label?: string;
}

const Rules = ({ label }: IProps) => (
  <div className="mb-2">
    <LableStyle>{label}</LableStyle>
    <WrapStyled dark>
      <div className="step">
        <div className="v-stepper">
          <CircleStyle blue />
          <LineVerticalStyled className="line" />
          <LineHorizontal blue />
          <div className="title">{t('APP.STAY.BOOKING_CONFIRM')}</div>
          <div className="sub-title">{t('APP.STAY.FILL_REFUND')}</div>
        </div>
      </div>
      <div className="step">
        <div className="v-stepper">
          <CircleStyle green />
          <LineVerticalStyled className="line" />
          <LineHorizontal green />
          <div className="title">{t('APP.STAY.48')}</div>
          <div className="sub-title">{t('APP.STAY.FULL_REFUND')}</div>
        </div>
      </div>
      <div className="step">
        <div className="v-stepper">
          <CircleStyle yellow />
          <LineVerticalStyled className="line" />
          <LineHorizontal yellow />
          <div className="title">{t('APP.STAY.5DAY')}</div>
          <div className="sub-title">{t('APP.STAY.50REFUND')}</div>
        </div>
      </div>
      <div className="step">
        <div className="v-stepper">
          <CircleStyle />
          <LineVerticalStyled className="line" />
          <LineHorizontal />
          <div className="title">{t('APP.STAY.CHECK_IN')}</div>
          <div className="sub-title">{t('APP.STAY.NO_REFUNDS')}</div>
        </div>
      </div>
    </WrapStyled>
    <div>-{t('APP.STAY.FREE_CANCEL')}</div>
    <div>-{t('APP.STAY.CANCELLATION')}</div>
  </div>
);

export default Rules;
