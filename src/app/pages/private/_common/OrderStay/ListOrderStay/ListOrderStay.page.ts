import { compose, withHandlers, withState } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import BookingActions from 'app/store/redux/BookingRedux';
import withApp from 'app/hocs/withApp';
import { connect } from 'react-redux';
import ListOrderTourView from './ListOrderStay.view';
import handlers from './ListOrderStay.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listBooking: state.booking.bookingStay,
  fetching: state.booking.fetching,
  pages: state.booking.pages,
  filter: state.booking.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListBookingStay: (filter: any) =>
    dispatch(BookingActions.getListBookingStayRequest(filter)),
});

const enhancer = compose<any, any>(
  withApp,
  connect(mapStateToProps, mapDispatchToProps),
  withState('filterStatus', 'setFilterStatus', ''),
  withHandlers(handlers)
);

export default enhancer(ListOrderTourView);
