import { call, put, select } from 'redux-saga/effects';
import ReportActions from 'app/store/redux/ReportRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import { SEARCH_TYPES } from '../../constants';
import SweetAlert from '../../components/SweetAlert';

export function* getListReport(
  api: any,
  {
    filter: {
      offset,
      limit,
      order,
      searchType,
      fromDate,
      toDate,
      status,
      type,
      postId,
    },
  }: any
) {
  try {
    let filter = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.TIME) {
      filter = {
        ...filter,
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

    if (searchType === SEARCH_TYPES.STATUS) {
      filter = {
        ...filter,
        ...(status && {
          where: {
            reportType: status,
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.TYPE) {
      filter = {
        ...filter,
        ...(type && {
          where: {
            reportStatus: type,
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.POST) {
      filter = {
        ...filter,
        ...(postId && {
          where: {
            targetPostId: postId,
          },
        }),
      };
    }

    const response = yield call(api.listReport, {
      filter,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(ReportActions.getListReportSuccess(data, pages));
    } else {
      yield put(ReportActions.getListReportFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(ReportActions.getListReportFailure());
    SweetAlert.error(e.message);
  }
}

export function* editStatusReport(api: any, action: any) {
  try {
    const { id, body } = action;

    const offset = yield select((state) => state?.report?.filter?.offset);
    const limit = yield select((state) => state?.report?.filter?.limit);
    const order = yield select((state) => state?.report?.filter?.sort);

    const filter = {
      filter: {
        offset: offset * limit,
        limit,
        order: order,
      },
    };

    const response = yield call(api.editReport, id, body);
    if (response.ok) {
      yield put(ReportActions.editStatusReportSuccess());
      SweetAlert.success(t('REPORT_EDIT_SUCCESS'));
      const resList = yield call(api.listReport, filter);

      if (resList.ok) {
        yield put(ReportActions.getListReportSuccess(resList?.data?.data));
      }
    } else {
      yield put(ReportActions.editStatusReportFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(ReportActions.editStatusReportFailure());
    SweetAlert.error(e.message);
  }
}

export function* getReportById(api: any, action: any) {
  const { id } = action;
  try {
    const filter = {
      filter: {
        include: [
          { relation: 'targetUser' },
          { relation: 'user' },
          { relation: 'targetPost' },
        ],
      },
    };

    const response = yield call(api.getReportId, id, filter);

    if (response.ok) {
      const { data } = response;
      yield put(ReportActions.getReportByIdSuccess(data));
    } else {
      yield put(ReportActions.getReportByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(ReportActions.getReportByIdFailure());
    SweetAlert.error(e.message);
  }
}
