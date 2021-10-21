import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import ActivitiesAction from 'app/store/redux/ActivitiesRedux';
import ListActivitiesView from './ListActivities.view';
import handlers from './ListActivities.handler';

const mapStateToProps = (state: IReduxStates) => ({
  currencies: state.app.currencies,
  fetching: state.activities.fetching,
  list: state.activities.listActivities,
  pages: state.activities.pages,
  filter: state.activities.filter,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  listActivities: (filter: any) =>
    dispatch(ActivitiesAction.getListActivitiesRequest(filter)),
  delActivity: (id: number, data: any) =>
    dispatch(ActivitiesAction.deleteActivitiesRequest(id, data)),
  lockActivity: (id: number, data: string) =>
    dispatch(ActivitiesAction.lockActivitiesRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListActivitiesView);
