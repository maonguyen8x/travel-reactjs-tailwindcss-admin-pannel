import { compose, withHandlers, withState } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import BookingActions from 'app/store/redux/BookingRedux';
import withApp from 'app/hocs/withApp';
import { connect } from 'react-redux';
import ListOrderTourView from './ListOrderTour.view';
import handlers from './ListOrderTour.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listBooking: state.booking.bookingTour,
  fetching: state.booking.fetchingBooking,
  pages: state.booking.pages,
  filter: state.booking.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListBookingTour: (filter: any) =>
    dispatch(BookingActions.getListBookingTourRequest(filter)),
});

const enhancer = compose<any, any>(
  withApp,
  connect(mapStateToProps, mapDispatchToProps),
  withState('filterStatus', 'setFilterStatus', ''),
  withHandlers(handlers)
);

export default enhancer(ListOrderTourView);
