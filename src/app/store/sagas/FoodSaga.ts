import { call, put } from 'redux-saga/effects';
import FoodActions from 'app/store/redux/FoodRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';
import { TRAVEL_TYPES, ROUTERS } from '../../constants';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';

export function* getListFood(
  api: any,
  { filter: { offset, limit, order, pageId } }: any
) {
  try {
    const filter: any = {
      offset: offset * limit,
      limit,
      order: order,
      include: [
        {
          relation: 'post',
          scope: { include: [{ relation: 'mediaContents' }] },
        },
      ],
      where: {
        type: TRAVEL_TYPES.FOOD,
        pageId,
      },
    };

    const response = yield call(api.getListFood, { filter });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);

      yield put(FoodActions.getListFoodSuccess(data, pages));
    } else {
      yield put(FoodActions.getListFoodFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(FoodActions.getListFoodFailure());
    SweetAlert.error(e.message);
  }
}

export function* getFoodById(api: any, action: any) {
  const { id } = action;
  try {
    const filter = {
      filter: {
        include: [
          {
            relation: 'post',
            scope: { include: [{ relation: 'mediaContents' }] },
          },
        ],
      },
    };

    const response = yield call(api.getFoodById, id, filter);

    if (response.ok) {
      const { data } = response;
      yield put(FoodActions.getFoodByIdSuccess(data));
    } else {
      yield put(FoodActions.getFoodByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(FoodActions.getFoodByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* createFood(api: any, action: any) {
  Swal.showLoading();
  try {
    const { food } = action;
    const response = yield call(api.createPage, food);
    if (response.ok) {
      SweetAlert.toastSuccess(t('food.created_success')).then(() => {
        history.push(ROUTERS.LIST_FOOD);
      });
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* deleteDetailFoodPage(api: any, action: any) {
  try {
    const { food } = action;
    const response = yield call(api.deletePage, food);
    if (response.ok) {
      SweetAlert.toastSuccess(t('food.deleted.success')).then(() => {
        history.push(ROUTERS.LIST_FOOD);
      });
    } else {
      SweetAlert.error(response?.data?.message);
    }
  } catch (e) {
    yield put(FoodActions.createFoodFailure());
    SweetAlert.error(e.message);
  }
}
