import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import LocationActions from 'app/store/redux/LocationRedux';
import ListLocationView from './ListLocation.view';
import handlers from './ListLocation.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.location.fetchingListLocation,
  listLocation: state.location.attractions,
  pages: state.location.pages,
  filter: state.location.filter,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListLocation: (filter: any) =>
    dispatch(LocationActions.getListAttractionsRequest(filter)),
  delLocation: (id: number, data: any) =>
    dispatch(LocationActions.deleteLocationRequest(id, data)),
  lockLocation: (id: number, data: any) =>
    dispatch(LocationActions.lockLocationRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListLocationView);
