import { call, put, select, all } from 'redux-saga/effects';
import { pathOr } from 'ramda';
import AuthActions from 'app/store/redux/AuthRedux';
import NotificationActions from 'app/store/redux/NoticationRedux';
import AppActions from 'app/store/redux/AppRedux';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { FILTER, LOGIN_URL } from '../../constants';

export function* getUserMe(api: any, action: any) {
  try {
    const filterNotification = {
      offset: 0,
      limit: 10,
      order: FILTER.NEWEST,
    };

    const token = yield select((state) => state.app.token);
    const customToken = action.token || token;
    const [response, resNotification]: any = yield all([
      call(api.getUserMe, customToken),
      call(api.listNotification, {
        filterNotification,
      }),
    ]);
    const statusCode: number = pathOr(
      0,
      ['data', 'error', 'statusCode'],
      response
    );

    if (response.ok && resNotification.ok) {
      const { data } = resNotification;
      const { count } = resNotification.data;
      const [_, __, ___, resCurrency] = yield all([
        yield put(AuthActions.getUserMeSuccess(response.data)),
        yield put(NotificationActions.getListNotificationSuccess(data, count)),
        yield put(AppActions.saveToken(customToken)),
        yield call(api.getCurrency),
      ]);
      yield put(AppActions.getCurrencySuccess(resCurrency.data));
    } else if (statusCode === 401) {
      if (history?.location?.pathname !== '/login') {
        yield put(AppActions.saveToken(''));
        yield put(AuthActions.getUserMeFailure());
        const message = pathOr('', ['data', 'error', 'message'], response);
        SweetAlert.error(message);
        localStorage.clear();
        history.replace(LOGIN_URL.LOGIN);
      }
    } else if (statusCode === 403) {
      localStorage.clear();
      yield put(AppActions.saveToken(''));
      yield put(AuthActions.getUserMeFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    } else {
      yield put(AuthActions.getUserMeFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
      localStorage.clear();
      history.replace(LOGIN_URL.LOGIN);
    }
  } catch (e) {
    localStorage.clear();
    yield put(AuthActions.getUserMeFailure());
    SweetAlert.error(e.message);
  }
}

export function* login(api: any, action: any) {
  try {
    const { account } = action;
    const response = yield call(api.login, account);

    if (response.ok) {
      const { data } = response;
      yield call(getUserMe, api, data);
      yield put(AuthActions.loginSuccess(data));
    } else {
      const message = pathOr(
        'Incorrect email address or password, please try again.',
        ['data', 'error', 'message'],
        response
      );
      SweetAlert.error(message);
      yield put(AuthActions.loginFailure());
    }
  } catch (e) {
    yield put(AuthActions.loginFailure());
    SweetAlert.error(e.message);
  }
}
