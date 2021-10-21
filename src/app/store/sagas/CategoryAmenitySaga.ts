import { call, put, all, select } from 'redux-saga/effects';
import CategoryAmenityActions from 'app/store/redux/CategoryAmenityRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import SweetAlert from '../../components/SweetAlert';
import { FILTER, SEARCH_TYPES } from '../../constants';
import { history } from '../../services/History';

export function* getListCategoryAmenity(
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
      call(api.getListCategoryAmenity, { filter }),
      call(api.getCountCategoryAmenity),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(
        CategoryAmenityActions.getListCategoryAmenitySuccess(data, pages)
      );
    } else {
      yield put(CategoryAmenityActions.getListCategoryAmenityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryAmenityActions.getListCategoryAmenityFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteCategoryAmenity(api: any, action: any) {
  const { id } = action;
  const offset = yield select((state) => state?.categoryAmenity.filter.offset);
  const limit = yield select((state) => state?.categoryAmenity.filter.limit);
  const filter = {
    order: FILTER.ID_NEWEST,
    offset,
    limit,
  };

  try {
    const response = yield call(api.deleteCategoryAmenity, id);
    if (response.ok) {
      yield put(CategoryAmenityActions.deleteCategoryAmenitySuccess());
      SweetAlert.success(t('CATEGORY_AMENITY_DELETE_SUCCESS'));
      const [resList, resCount]: any = yield all([
        call(api.getListCategoryAmenity, { filter }),
        call(api.getCountCategoryAmenity),
      ]);
      if (resList.ok && resCount) {
        yield put(
          CategoryAmenityActions.getListCategoryAmenitySuccess(resList.data)
        );
      }
    } else {
      yield put(CategoryAmenityActions.deleteCategoryAmenityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryAmenityActions.deleteCategoryAmenityFailure());
    SweetAlert.error(e.message);
  }
}

export function* createCategoryAmenity(api: any, action: any) {
  try {
    const { categoryAmenity } = action;

    const response = yield call(api.createCategoryAmenity, categoryAmenity);

    if (response.ok) {
      yield put(CategoryAmenityActions.createCategoryAmenitySuccess());
      SweetAlert.success(t('CREATE_CATEGORY_AMENITY_SUCCESS'));
      history.goBack();
    } else {
      yield put(CategoryAmenityActions.createCategoryAmenityFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(CategoryAmenityActions.createCategoryAmenityFailure());
    SweetAlert.error(e.message);
  }
}
