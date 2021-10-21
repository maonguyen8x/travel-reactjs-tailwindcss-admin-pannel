import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';

const { Types, Creators } = createActions<any, any>({
  getListFoodRequest: ['filter'],
  getListFoodSuccess: ['listFood', 'pages'],
  getListFoodFailure: null,

  getFoodByIdRequest: ['id'],
  getFoodByIdSuccess: ['foodDetail'],
  getFoodByIdFailure: null,

  createFoodRequest: ['food'],
});

export const FoodTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetchingListFood: false,
  fetchingFoodDetail: false,
  fetching: false,
  error: null,
  listFood: [],
  foodDetail: null,
  pages: 0,
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    search: '',
  },
});

const getListFoodRequest = (state: any, { filter }: any) =>
  state.merge({ fetchingListFood: true, filter });
const getListFoodSuccess = (state: any, { listFood, pages }: any) =>
  state.merge({
    fetchingListFood: false,
    error: null,
    listFood,
    pages,
  });
const getListFoodFailure = (state: any) =>
  state.merge({ fetchingListFood: false, error: true });

const getFoodByIdRequest = (state: any) =>
  state.merge({ fetchingFoodDetail: true });
const getFoodByIdSuccess = (state: any, { foodDetail }: any) =>
  state.merge({
    fetchingFoodDetail: false,
    foodDetail,
  });
const getFoodByIdFailure = (state: any) =>
  state.merge({ fetchingFoodDetail: false, foodDetail: null });

export const FoodReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_FOOD_REQUEST]: getListFoodRequest,
  [Types.GET_LIST_FOOD_SUCCESS]: getListFoodSuccess,
  [Types.GET_LIST_FOOD_FAILURE]: getListFoodFailure,

  [Types.GET_FOOD_BY_ID_REQUEST]: getFoodByIdRequest,
  [Types.GET_FOOD_BY_ID_SUCCESS]: getFoodByIdSuccess,
  [Types.GET_FOOD_BY_ID_FAILURE]: getFoodByIdFailure,
});
