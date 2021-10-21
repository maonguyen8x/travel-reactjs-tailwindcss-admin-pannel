import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import CategoryAmenityActions from 'app/store/redux/CategoryAmenityRedux';
import ListCategoryAmenityView from './ListCategoryAmenity.view';
import handlers from './ListCategoryAmenity.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.categoryAmenity.fetchingAmenity,
  listCategoryAmenity: state.categoryAmenity.listCategoryAmenity,
  filter: state.categoryAmenity.filter,
  pages: state.categoryAmenity.pages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListCategoryAmenity: (filter: any) =>
    dispatch(CategoryAmenityActions.getListCategoryAmenityRequest(filter)),
  deleteCategoryAmenity: (id: number) =>
    dispatch(CategoryAmenityActions.deleteCategoryAmenityRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListCategoryAmenityView);
