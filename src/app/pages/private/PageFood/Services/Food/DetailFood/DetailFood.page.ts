import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import PageActions from 'app/store/redux/PageRedux';
import DetailFoodView from './DetailFood.view';
import handlers from './DetailFood.handlers';

const mapStateToProps = (state: IReduxStates) => ({
  foodPageDetail: state.page.foodPageDetail,
  currencies: state.app.currencies,
  fetching: state.page.fetchingFoodPageDetail,
  list: state.page.list,
  filter: state.page.filter,
  pages: state.page.pages,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  getFoodPageById: (id: number) =>
    dispatch(PageActions.getPageFoodByIdRequest(id)),
  lockPage: (id: number, data: string) =>
    dispatch(PageActions.lockPageRequest(id, data)),
  delPage: (id: number, data: any) =>
    dispatch(PageActions.deletePageRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(DetailFoodView);
