import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import PageActions from 'app/store/redux/PageRedux';
import ListFoodView from './ListFood.view';
import handlers from './ListFood.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listFoodPage: state.page.listFoodPage,
  filter: state.page.filter,
  pages: state.page.pages,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListFoodPage: (filter: any) =>
    dispatch(PageActions.getListPageFoodRequest(filter)),
  lockPage: (id: number, data: string) =>
    dispatch(PageActions.lockPageRequest(id, data)),
  delPage: (id: number, data: any) =>
    dispatch(PageActions.deletePageRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListFoodView);
