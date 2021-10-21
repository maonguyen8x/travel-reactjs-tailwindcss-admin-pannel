import { compose, withHandlers } from 'recompose';
import FacilityActions from 'app/store/redux/FacilityRedux';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListFacilityView from './ListFacility.view';
import handlers from './ListFacility.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.facility.fetchingFacility,
  listFacility: state.facility.listFacility,
  filter: state.facility.filter,
  pages: state.facility.pages,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListFacility: (filter: any) =>
    dispatch(FacilityActions.getListFacilityRequest(filter)),
  deleteFacility: (id: number) =>
    dispatch(FacilityActions.deleteFacilityRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListFacilityView);
