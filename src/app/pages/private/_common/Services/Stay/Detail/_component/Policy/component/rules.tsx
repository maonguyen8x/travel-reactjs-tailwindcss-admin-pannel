/* eslint-disable no-nested-ternary */
import React from 'react';
import { t } from 'app/i18n';
import { RULES } from 'app/constants';
import { LableStyle } from '../styled';

const Rules = ({ rules }: any) => (
  <div className="mb-2">
    <LableStyle>{t('APP.STAY.RULES')}</LableStyle>
    <div>{t('APP.STAY.RULE.CHECK_IN')}</div>
    <div>
      {rules?.smoking === RULES.ALLOW
        ? t('APP.STAY.RULE.ALLOW_SMOKING')
        : rules?.smoking === RULES.NOT_ALLOW
        ? t('APP.STAY.RULE.NOT_ALLOW_SMOKING')
        : `${t('APP.STAY.RULE.SMOKING_PAY')}${rules?.smoking}`}
    </div>
    <div>
      {rules?.pet === RULES.ALLOW
        ? t('APP.STAY.RULE.ALLOW_PET')
        : rules?.pet === RULES.NOT_ALLOW
        ? t('APP.STAY.RULE.NOT_ALLOW_PET')
        : `${t('APP.STAY.RULE.PET_PAY')}${rules?.pet}`}
    </div>
    <div>
      {rules?.party === RULES.ALLOW
        ? t('APP.STAY.RULE.ALLOW_PARTY')
        : rules?.party === RULES.NOT_ALLOW
        ? t('APP.STAY.RULE.NOT_ALLOW_PARTY')
        : `${t('APP.STAY.RULE.PARTY_PAY')}${rules?.party}`}
    </div>
    <div>
      {rules?.cooking === RULES.ALLOW
        ? t('APP.STAY.RULE.ALLOW_COOKING')
        : rules?.cooking === RULES.NOT_ALLOW
        ? t('APP.STAY.RULE.NOT_ALLOW_COOKING')
        : `${t('APP.STAY.RULE.COOKING_PAY')}${rules?.cooking}`}
    </div>
    <div>
      {rules?.commercialPhoto === RULES.ALLOW
        ? t('APP.STAY.RULE.ALLOW_PHOTO')
        : rules?.commercialPhoto === RULES.NOT_ALLOW
        ? t('APP.STAY.RULE.NOT_ALLOW_PHOTO')
        : `${t('APP.STAY.RULE.PHOTO_PAY')}${rules?.commercialPhoto}`}
    </div>
    {rules?.otherRules && <div>{rules?.otherRules}</div>}
  </div>
);

export default Rules;
