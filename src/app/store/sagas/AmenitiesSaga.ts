import { call, put, all, select } from 'redux-saga/effects';
import AmenitiesActions from 'app/store/redux/AmenitiesRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import SweetAlert from '../../components/SweetAlert';
import { FILTER } from '../../constants';
import { history } from '../../services/History';

export function* getListAmenities(
  api: any,
  { filter: { offset, limit, order } }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
      order: order,
    };

    const [response, resCount]: any = yield all([
      call(api.getListAmenities, { filter }),
      call(api.getCountAmenities),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(AmenitiesActions.getListAmenitiesSuccess(data, pages));
    } else {
      yield put(AmenitiesActions.getListAmenitiesFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(AmenitiesActions.getListAmenitiesFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteAmenities(api: any, action: any) {
  const { id } = action;
  const offset = yield select((state) => state?.amenities.filter.offset);
  const limit = yield select((state) => state?.amenities.filter.limit);
  const filter = {
    order: FILTER.ID_NEWEST,
    offset,
    limit,
  };

  try {
    const response = yield call(api.deleteAmenities, id);
    if (response.ok) {
      yield put(AmenitiesActions.deleteAmenitiesSuccess());
      SweetAlert.success(t('AMENITIES_DELETE_SUCCESS'));
      const [resList, resCount]: any = yield all([
        call(api.getListAmenities, { filter }),
        call(api.getCountAmenities),
      ]);
      if (resList.ok && resCount) {
        yield put(AmenitiesActions.getListAmenitiesSuccess(resList.data));
      }
    } else {
      yield put(AmenitiesActions.deleteAmenitiesFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(AmenitiesActions.deleteAmenitiesFailure());
    SweetAlert.error(e.message);
  }
}

export function* createAmenities(api: any, action: any) {
  try {
    const { amenities } = action;
    const response = yield call(api.createAmenities, amenities);
    if (response.ok) {
      yield put(AmenitiesActions.createAmenitiesSuccess());
      SweetAlert.success(t('CREATE_AMENITIES_SUCCESS'));
      history.goBack();
    } else {
      yield put(AmenitiesActions.createAmenitiesFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(AmenitiesActions.createAmenitiesFailure());
    SweetAlert.error(e.message);
  }
}
