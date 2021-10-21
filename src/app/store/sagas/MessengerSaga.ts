/* eslint-disable import/prefer-default-export */
import { call } from 'redux-saga/effects';
import { pathOr } from 'ramda';
import { history } from 'app/services/History';
import { t } from 'i18n-js';
import SweetAlert from '../../components/SweetAlert';

export function* senMessenger(api: any, action: any) {
  try {
    const { messenger } = action;

    const message = {
      en: !messenger?.messageEn
        ? messenger?.messageVi.trim()
        : messenger?.messageEn.trim(),
      vi: !messenger?.messageVi
        ? messenger?.messageEn.trim()
        : messenger?.messageVi.trim(),
    };

    const response = yield call(api.addMessenger, {
      message,
    });
    if (response.ok) {
      SweetAlert.toastSuccess(t('message.create_success'));
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* editMessenger(api: any, action: any) {
  try {
    const { messenger } = action;

    const message = {
      en: !messenger?.messageNew?.messageEn
        ? messenger?.messageNew?.messageVi.trim()
        : messenger?.messageNew?.messageEn.trim(),
      vi: !messenger?.messageNew?.messageVi
        ? messenger?.messageNew?.messageEn.trim()
        : messenger?.messageNew?.messageVi.trim(),
    };

    const response = yield call(api.editMessenger, {
      messageOld: messenger?.messageOld,
      messageNew: message,
    });
    if (response.ok) {
      SweetAlert.toastSuccess(t('message.edit_success'));
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}
