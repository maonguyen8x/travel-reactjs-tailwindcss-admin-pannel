import { call, put, select } from 'redux-saga/effects';
import NotificationActions, {
  NotificationSelectors,
} from 'app/store/redux/NoticationRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';

export function* getListNotification(
  api: any,
  { filter: { offset, limit, order, search } }: any
) {
  try {
    const filter = yield select(
      NotificationSelectors.getCurrentFilterGetListNotification
    );

    const filterNotification = {
      ...{
        offset: filter.offset,
        limit: filter.limit,
        order: filter.order,
      },
      offset: offset * limit,
      limit,
      order: order,
      ...(search && { q: search }),
    };

    const response = yield call(api.listNotification, { filterNotification });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(NotificationActions.getListNotificationSuccess(data, pages));
    } else {
      yield put(NotificationActions.getListNotificationFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(NotificationActions.getListNotificationFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteNotification(api: any, action: any) {
  const { id } = action;

  const filter = yield select(
    NotificationSelectors.getCurrentFilterGetListNotification
  );

  const filterPosts = {
    ...{
      offset: filter.offset,
      limit: filter.limit,
      order: filter.order,
    },
  };

  try {
    const response = yield call(api.deleteNotification, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('noti.delete_success'));
      const resList = yield call(api.listNotification, filterPosts);
      if (resList.ok) {
        yield put(NotificationActions.getListNotificationSuccess(resList.data));
      }
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}
