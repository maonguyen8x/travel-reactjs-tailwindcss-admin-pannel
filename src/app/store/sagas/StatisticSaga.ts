import { call, put } from 'redux-saga/effects';
import StatictisAction from 'app/store/redux/StatisticRedux';
import { pathOr } from 'ramda';
import { FILTER, USER_ACCESS_TYPES } from '../../constants';
import SweetAlert from '../../components/SweetAlert';

export function* getStatisticLocation(
  api: any,
  { filter: { fromDate, toDate, searchType } }: any
) {
  try {
    const filterString = {
      startDate: fromDate,
      endDate: toDate,
      type: searchType,
    };

    const response = yield call(api.locationStatistic, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getStatisticLocationSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticLocationFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticLocationFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStatisticPost(
  api: any,
  { filter: { fromDate, toDate, searchType } }: any
) {
  try {
    const filterString = {
      startDate: fromDate,
      endDate: toDate,
      type: searchType,
    };

    const response = yield call(api.postStatistic, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getStatisticPostSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticPostFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticPostFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStatisticUser(
  api: any,
  { filter: { fromDate, toDate, searchType } }: any
) {
  try {
    const filterString = {
      startDate: fromDate,
      endDate: toDate,
      type: searchType,
    };

    const response = yield call(api.userStatistic, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getStatisticUserSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticUserFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticUserFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStatisticPlan(
  api: any,
  { filter: { fromDate, toDate, searchType } }: any
) {
  try {
    const filterString = {
      startDate: fromDate,
      endDate: toDate,
      type: searchType,
    };

    const response = yield call(api.planStatistic, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getStatisticPlanSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticPlanFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticPlanFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStatisticPage(
  api: any,
  { filter: { fromDate, toDate, searchType, pageType } }: any
) {
  try {
    const filterString = {
      startDate: fromDate,
      endDate: toDate,
      type: searchType,
      pageType: pageType,
    };

    const response = yield call(api.pageStatistic, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getStatisticPageSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticPageFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticPageFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStatisticDashboard(api: any) {
  try {
    const response = yield call(api.dashboardStatistic);
    if (response.ok) {
      const { data } = response?.data;

      yield put(StatictisAction.getStatisticDashboardSuccess(data));
    } else {
      yield put(StatictisAction.getStatisticDashboardFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getStatisticDashboardFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListUserStatistic(api: any) {
  try {
    const filter = {
      filterUsers: {
        order: FILTER.NEWEST,
        offset: 0,
        limit: 5,
        where: {
          isActive: true,
          or: [
            { userTypeAccess: USER_ACCESS_TYPES.NORMAL },
            { userTypeAccess: USER_ACCESS_TYPES.FACEBOOK },
          ],
        },
      },
    };
    const response = yield call(api.listUser, filter);

    if (response.ok) {
      const { data } = response?.data;

      yield put(StatictisAction.getListUserStatisticSuccess(data));
    } else {
      yield put(StatictisAction.getListUserStatisticFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getListUserStatisticFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListLocationStatistic(api: any) {
  try {
    const filter = {
      filterAdminLocations: {
        order: FILTER.NEWEST,
        offset: 0,
        limit: 5,
      },
    };
    const response = yield call(api.getLocationsAdmin, filter);

    if (response.ok) {
      const { data } = response?.data;

      yield put(StatictisAction.getListLocationStatisticSuccess(data));
    } else {
      yield put(StatictisAction.getListLocationStatisticFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getListLocationStatisticFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListPostStatistic(api: any) {
  try {
    const filter = {
      filterPosts: {
        order: FILTER.NEWEST,
        offset: 0,
        limit: 5,
        include: [{ relation: 'creator' }, { relation: 'location' }],
      },
    };
    const response = yield call(api.listPost, filter);

    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getListPostStatisticSuccess(data));
    } else {
      yield put(StatictisAction.getListPostStatisticFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getListPostStatisticFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListPlanStatistic(api: any) {
  try {
    const filter = {
      filter: {
        order: FILTER.NEWEST,
        offset: 0,
        limit: 5,
      },
    };
    const response = yield call(api.getListPlan, filter);

    if (response.ok) {
      const { data } = response;

      yield put(StatictisAction.getListPlanStatisticSuccess(data));
    } else {
      yield put(StatictisAction.getListPlanStatisticFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StatictisAction.getListPlanStatisticFailure());
    SweetAlert.error(e.message);
  }
}
