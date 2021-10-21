import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import StayActions from 'app/store/redux/StayRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import WithApp from 'app/hocs/withApp';
import ListStayView from './ListStay.view';
import handlers from './ListStay.handler';

const mapStateToProps = (state: IReduxStates) => ({
  list: state.stay.listStay,
  fetching: state.stay.fetchingStay,
  pages: state.stay.pages,
  filter: state.stay.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListStay: (filter: any) =>
    dispatch(StayActions.getListStayRequest(filter)),
});

const enhancer = compose<any, any>(
  WithApp,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListStayView);
