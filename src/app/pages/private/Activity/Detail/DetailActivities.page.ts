import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ActivitiesAction from 'app/store/redux/ActivitiesRedux';
import DetailActivities from './DetailActivities.view';
import handlers from './DetailActivities.handler';

const mapStateToProps = (state: IReduxStates) => ({
  currencies: state.app.currencies,
  activitiesDetail: state.activities.activitiesDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  activitiesById: (id: number) =>
    dispatch(ActivitiesAction.getActivitiesByIdRequest(id)),
  delActivity: (id: number, data: any) =>
    dispatch(ActivitiesAction.deleteActivitiesRequest(id, data)),
  lockActivity: (id: number, data: string) =>
    dispatch(ActivitiesAction.lockActivitiesRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers)
);

export default enhancer(DetailActivities);
