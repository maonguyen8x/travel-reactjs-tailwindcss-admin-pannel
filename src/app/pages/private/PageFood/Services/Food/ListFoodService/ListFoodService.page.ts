import { compose } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import FoodActions from 'app/store/redux/FoodRedux';
import ListFoodServiceView from './ListFoodService.view';

const mapStateToProps = (state: IReduxStates) => ({
  currencies: state.app.currencies,
  listServiceFood: state.food.listFood,
  fetching: state.food.fetchingFood,
  pages: state.food.pages,
  filter: state.food.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListServicesFood: (filter: any) =>
    dispatch(FoodActions.getListFoodRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListFoodServiceView);
