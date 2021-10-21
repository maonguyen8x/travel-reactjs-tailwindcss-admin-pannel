import { compose } from 'recompose';
import { connect } from 'react-redux';
import TourActions from 'app/store/redux/TourRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import withApp from 'app/hocs/withApp';
import ListTourView from './ListTour.view';

const mapStateToProps = (state: IReduxStates) => ({
  listTour: state.tour.listTour,
  pages: state.tour.pages,
  filter: state.tour.filter,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListTour: (filter: any) =>
    dispatch(TourActions.getListTourRequest(filter)),
});

const enhancer = compose<any, any>(
  withApp,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListTourView);
