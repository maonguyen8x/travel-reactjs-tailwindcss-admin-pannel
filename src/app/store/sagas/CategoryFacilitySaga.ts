import { call, put, all, select } from 'redux-saga/effects';
import CategoryFacilityActions from 'app/store/redux/CategoryFacilityRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import SweetAlert from '../../components/SweetAlert';
import { FILTER, SEARCH_TYPES } from '../../constants';
import { history } from '../../services/History';

export function* getListCategoryFacility(
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
      call(api.getListCategoryFacility, { filter }),
      call(api.getCountCategoryFacility),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(
        CategoryFacilityActions.getListCategoryFacilitySuccess(data, pages)
      );
    } else {
      yield put(CategoryFacilityActions.getListCategoryFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryFacilityActions.getListCategoryFacilityFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteCategoryFacility(api: any, action: any) {
  const { id } = action;
  const offset = yield select((state) => state?.categoryFacility.filter.offset);
  const limit = yield select((state) => state?.categoryFacility.filter.limit);
  const filter = {
    order: FILTER.ID_NEWEST,
    offset,
    limit,
  };

  try {
    const response = yield call(api.deleteCategoryFacility, id);
    if (response.ok) {
      yield put(CategoryFacilityActions.deleteCategoryFacilitySuccess());
      SweetAlert.success(t('CATEGORY_FACILITY_DELETE_SUCCESS'));
      const [resList, resCount]: any = yield all([
        call(api.getListCategoryFacility, { filter }),
        call(api.getCountCategoryFacility),
      ]);
      if (resList.ok && resCount) {
        yield put(
          CategoryFacilityActions.getListCategoryFacilitySuccess(resList.data)
        );
      }
    } else {
      yield put(CategoryFacilityActions.deleteCategoryFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryFacilityActions.deleteCategoryFacilityFailure());
    SweetAlert.error(e.message);
  }
}

export function* createCategoryFacility(api: any, action: any) {
  try {
    const { categoryFacilities } = action;

    const response = yield call(api.createCategoryFacility, categoryFacilities);

    if (response.ok) {
      yield put(CategoryFacilityActions.createCategoryFacilitySuccess());
      SweetAlert.success(t('CREATE_CATEGORY_FACILITY_SUCCESS'));
      history.goBack();
    } else {
      yield put(CategoryFacilityActions.createCategoryFacilityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryFacilityActions.createCategoryFacilityFailure());
    SweetAlert.error(e.message);
  }
}
