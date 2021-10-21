import { call, put, all, select } from 'redux-saga/effects';
import FacilityActions from 'app/store/redux/FacilityRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import SweetAlert from '../../components/SweetAlert';
import { FILTER, SEARCH_TYPES } from '../../constants';
import { history } from '../../services/History';

export function* getListFacility(
  api: any,
  { filter: { offset, limit, order, search, searchType } }: any
) {
  try {
    let filter = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filter = {
        ...filter,
        ...{
          where: {
            keyword: { like: `%${search}%` },
          },
        },
      };
    }

    const [response, resCount]: any = yield all([
      call(api.getListFacility, { filter }),
      call(api.getCountFacility),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(FacilityActions.getListFacilitySuccess(data, pages));
    } else {
      yield put(FacilityActions.getListFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(FacilityActions.getListFacilityFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteFacility(api: any, action: any) {
  const { id } = action;
  const offset = yield select((state) => state?.facility.filter.offset);
  const limit = yield select((state) => state?.facility.filter.limit);
  const filter = {
    order: FILTER.ID_NEWEST,
    offset,
    limit,
  };

  try {
    const response = yield call(api.deleteFacility, id);
    if (response.ok) {
      yield put(FacilityActions.deleteFacilitySuccess());
      SweetAlert.success(t('FACILITY_DELETE_SUCCESS'));
      const [resList, resCount]: any = yield all([
        call(api.getListFacility, { filter }),
        call(api.getCountFacility),
      ]);
      if (resList.ok && resCount) {
        yield put(FacilityActions.getListFacilitySuccess(resList.data));
      }
    } else {
      yield put(FacilityActions.deleteFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(FacilityActions.deleteFacilityFailure());
    SweetAlert.error(e.message);
  }
}

export function* createFacility(api: any, action: any) {
  try {
    const { facility } = action;
    const response = yield call(api.createFacility, facility);
    if (response.ok) {
      yield put(FacilityActions.createFacilitySuccess());
      SweetAlert.success(t('CREATE_FACILITY_SUCCESS'));
      history.goBack();
    } else {
      yield put(FacilityActions.createFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(FacilityActions.createFacilityFailure());
    SweetAlert.error(e.message);
  }
}
