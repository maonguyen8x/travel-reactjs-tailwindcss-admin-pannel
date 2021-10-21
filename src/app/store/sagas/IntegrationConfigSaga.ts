import { call, put } from 'redux-saga/effects';
import IntegrationConfigActions from 'app/store/redux/IntegrationConfigRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';

export function* createIntegrationConfiguration(api: any, action: any) {
  try {
    const { info } = action;
    const response = yield call(api.createIntegrationConfiguration, info);
    const { data } = response;
    if (response.ok) {
      yield put(
        IntegrationConfigActions.createIntegrationConfigurationSuccess(data)
      );
      SweetAlert.success(t('admin.integration.config.created.success'));
    } else {
      yield put(
        IntegrationConfigActions.createIntegrationConfigurationFailure()
      );
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(IntegrationConfigActions.createIntegrationConfigurationFailure());
    SweetAlert.error(e.message);
  }
}
