import { call, put } from 'redux-saga/effects';
import PolicyActions from 'app/store/redux/PolicyRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { SEARCH_TYPES } from '../../constants';

export function* getListPolicy(
  api: any,
  { filter: { offset, limit, order, searchType, fromDate, toDate } }: any
) {
  try {
    let filterStaticPage = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.TIME) {
      filterStaticPage = {
        ...filterStaticPage,
        ...{
          where: {
            and: [
              { createdAt: { gt: fromDate } },
              { createdAt: { lt: toDate } },
            ],
          },
        },
      };
    }

    const response = yield call(api.listPolicy, { filterStaticPage });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);
      yield put(PolicyActions.getListPolicySuccess(data, pages));
    } else {
      yield put(PolicyActions.getListPolicyFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PolicyActions.getListPolicyFailure());
    SweetAlert.error(e.message);
  }
}

export function* getPolicyById(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.policyById, id);
    if (response.ok) {
      const { data } = response;
      yield put(PolicyActions.getPolicyByIdSuccess(data));
    } else {
      yield put(PolicyActions.getPolicyByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PolicyActions.getPolicyByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* createPolicy(api: any, action: any) {
  try {
    const { policy } = action;
    const response = yield call(api.createPolicy, policy);
    if (response.ok) {
      yield put(PolicyActions.createPolicySuccess());
      SweetAlert.success(t('POLICY_ADD_SUCCESS'));
      history.goBack();
    } else {
      yield put(PolicyActions.createPolicyFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PolicyActions.createPolicyFailure());
    SweetAlert.error(e.message);
  }
}

export function* editPolicy(api: any, action: any) {
  try {
    const { id, policy } = action;
    const response = yield call(api.editPolicy, id, policy);

    if (response.ok) {
      yield put(PolicyActions.editPolicySuccess());
      SweetAlert.success(t('POLICY_EDIT_SUCCESS'));
      history.goBack();
    } else {
      yield put(PolicyActions.editPolicyFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PolicyActions.editPolicyFailure());
    SweetAlert.error(e.message);
  }
}
