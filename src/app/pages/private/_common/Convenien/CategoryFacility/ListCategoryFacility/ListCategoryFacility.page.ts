import { compose, withHandlers } from 'recompose';
import CategoryFacilityActions from 'app/store/redux/CategoryFacilityRedux';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListCategoryFacilityView from './ListCategoryFacility.view';
import handlers from './ListCategoryFacility.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.categoryFacility.fetchingFacility,
  listCategoryFacility: state.categoryFacility.listCategoryFacility,
  filter: state.categoryFacility.filter,
  pages: state.categoryFacility.pages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListCategoryFacility: (filter: any) =>
    dispatch(CategoryFacilityActions.getListCategoryFacilityRequest(filter)),
  deleteCategoryFacility: (id: number) =>
    dispatch(CategoryFacilityActions.deleteCategoryFacilityRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListCategoryFacilityView);
