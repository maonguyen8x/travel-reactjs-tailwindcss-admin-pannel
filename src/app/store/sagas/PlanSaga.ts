import { call, put, all } from 'redux-saga/effects';
import PlanActions from 'app/store/redux/PlanRedux';
import { pathOr } from 'ramda';
import { SEARCH_TYPES } from '../../constants';
import SweetAlert from '../../components/SweetAlert';

export function* getListPlan(
  api: any,
  {
    id,
    filter: {
      offset,
      limit,
      order,
      search,
      searchType,
      fromDate,
      toDate,
      status,
    },
  }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
      order: order,
      where: {
        userId: id,
      },
    };

    const response = yield call(api.getListPlan, {
      filter,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);

      yield put(PlanActions.getListPlanSuccess(data, pages));
    } else {
      yield put(PlanActions.getListPlanFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PlanActions.getListPlanFailure());
    SweetAlert.error(e.message);
  }
}

export function* getPlanById(api: any, action: any) {
  try {
    const { id } = action;

    const response = yield call(api.getplanById, id);
    if (response.ok) {
      const { data } = response;
      yield put(PlanActions.getPlanByIdSuccess(data));
    } else {
      yield put(PlanActions.getPlanByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PlanActions.getPlanByIdFailure());
    SweetAlert.error(e.message);
  }
}
