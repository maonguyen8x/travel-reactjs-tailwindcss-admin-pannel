import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import FoodActions from 'app/store/redux/FoodRedux';
import DetailFoodServiceView from './DetailFoodService.view';

const mapStateToProps = (state: IReduxStates) => ({
  foodDetail: state.food.foodDetail,
  currencies: state.app.currencies,
  fetching: state.food.fetchingFoodDetail,
  filter: state.food.filter,
  pages: state.food.pages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFoodById: (id: number) => dispatch(FoodActions.getFoodByIdRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(DetailFoodServiceView);
