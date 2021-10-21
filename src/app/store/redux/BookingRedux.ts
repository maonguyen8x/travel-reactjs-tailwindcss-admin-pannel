import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SEARCH_TYPES, FILTER } from '../../constants';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  getListBookingStayRequest: ['filter'],
  getListBookingStaySuccess: ['bookingStay', 'pages'],
  getListBookingStayFailure: null,

  getListBookingTourRequest: ['filter'],
  getListBookingTourSuccess: ['bookingTour', 'pages'],
  getListBookingTourFailure: null,

  getListBookingRequest: ['id'],
  getListBookingSuccess: ['bookings'],
  getListBookingFailure: null,
});

export const BookingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
  bookingStay: [],
  bookingTour: [],
  bookings: [],
  filter: {
    searchType: SEARCH_TYPES.DEFAULT,
    order: FILTER.NEWEST,
    offset: 0,
    limit: 10,
    page: '',
    search: '',
    pageId: '',
    fromDate: '',
    toDate: '',
    status: '',
  },
});
/* ------------- Reducers ------------- */

const getListBookingStayRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListBookingStaySuccess = (state: any, { bookingStay, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    bookingStay,
    pages,
  });

const getListBookingStayFailure = (state: any) =>
  state.merge({ fetching: false, bookingStay: [] });

const getListBookingTourRequest = (state: any, { filter }: any) =>
  state.merge({ fetching: true, filter });

const getListBookingTourSuccess = (state: any, { bookingTour, pages }: any) =>
  state.merge({
    fetching: false,
    error: null,
    bookingTour,
    pages,
  });

const getListBookingTourFailure = (state: any) =>
  state.merge({ fetching: false, bookingTour: [] });

const getListBookingRequest = (state: any, { id }: any) =>
  state.merge({ fetching: true, id });

const getListBookingSuccess = (state: any, { bookings }: any) =>
  state.merge({
    fetching: false,
    error: null,
    bookings,
  });

const getListBookingFailure = (state: any) =>
  state.merge({ fetching: false, bookings: [] });

/* ------------- Hookup Reducers To Types ------------- */
export const BookingReducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_BOOKING_STAY_REQUEST]: getListBookingStayRequest,
  [Types.GET_LIST_BOOKING_STAY_SUCCESS]: getListBookingStaySuccess,
  [Types.GET_LIST_BOOKING_STAY_FAILURE]: getListBookingStayFailure,

  [Types.GET_LIST_BOOKING_TOUR_REQUEST]: getListBookingTourRequest,
  [Types.GET_LIST_BOOKING_TOUR_SUCCESS]: getListBookingTourSuccess,
  [Types.GET_LIST_BOOKING_TOUR_FAILURE]: getListBookingTourFailure,

  [Types.GET_LIST_BOOKING_REQUEST]: getListBookingRequest,
  [Types.GET_LIST_BOOKING_SUCCESS]: getListBookingSuccess,
  [Types.GET_LIST_BOOKING_FAILURE]: getListBookingFailure,
});
