import { call, put, select } from 'redux-saga/effects';
import FeedbackActions from 'app/store/redux/FeedbackRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import { history } from '../../services/History';
import { ROUTERS } from '../../constants';
import SweetAlert from '../../components/SweetAlert';

export function* getListFeedback(
  api: any,
  { filter: { offset, limit, sort, search } }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
      order: sort,
      ...(search && {
        where: {
          id: { like: `%${search}%` },
        },
      }),
    };

    const response = yield call(api.getListFeedback, { filter });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(FeedbackActions.getListFeedbackSuccess(data, pages));
    } else {
      yield put(FeedbackActions.getListFeedbackFailure());
    }
  } catch (e) {
    yield put(FeedbackActions.getListFeedbackFailure());
    SweetAlert.error(e.message);
  }
}

export function* getFeedbackById(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.feedbackById, id);
    if (response.ok) {
      const { data } = response;
      yield put(FeedbackActions.getFeedbackByIdSuccess(data));
    } else {
      yield put(FeedbackActions.getFeedbackByIdFailure());
    }
  } catch (e) {
    yield put(FeedbackActions.getFeedbackByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* editFeedback(api: any, action: any) {
  const { id, feedback } = action;
  try {
    const response = yield call(api.editFeedback, id, {
      status: feedback,
    });

    if (response.ok) {
      SweetAlert.toastSuccess(t('admin.feedback.edit.success'));
      yield put(FeedbackActions.getListFeedbackRequest());
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* deleteFeedback(api: any, action: any) {
  const offset = yield select((state) => state?.feedback?.filter?.offset);
  const limit = yield select((state) => state?.feedback?.filter?.limit);
  const order = yield select((state) => state?.feedback?.filter?.sort);

  try {
    const filter = {
      filter: {
        offset: offset * limit,
        limit,
        order: order,
      },
    };
    const { id } = action;
    const response = yield call(api.deleteFeedback, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('FEEDBACK_DELETE_SUCCESS'));
      const resList = yield call(api.listFeedback, filter);
      if (resList.ok) {
        yield put(FeedbackActions.getListFeedbackSuccess(resList.data));
      }
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}
