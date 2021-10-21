import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import BookingActions from 'app/store/redux/BookingRedux';
import withApp from 'app/hocs/withApp';
import { connect } from 'react-redux';
import ListBookingTourView from './ListBookingTour.view';
import handlers from './ListBookingTour.handler';

const mapStateToProps = (state: IReduxStates) => ({
  list: state.booking.bookingTour,
  fetching: state.booking.fetchingOrderTour,
  pages: state.booking.pages,
  filter: state.booking.filter,
  fetchingTourDetail: state.tour.fetchingTourDetail,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListOrderTour: (filter: any) =>
    dispatch(BookingActions.getListBookingTourRequest(filter)),
});

const enhancer = compose<any, any>(
  withApp,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListBookingTourView);
