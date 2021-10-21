import { call, put } from 'redux-saga/effects';
import BookingActions from 'app/store/redux/BookingRedux';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { SEARCH_TYPES } from '../../constants';

export function* getListBookingTour(
  api: any,
  {
    filter: {
      offset,
      limit,
      order,
      search,
      searchType,
      fromDate,
      toDate,
      status,
    },
  }: any
) {
  try {
    let filterBooking = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filterBooking = {
        ...filterBooking,
        ...{
          where: {
            ...(search && {
              bookingCode: { like: `%${search}%` },
            }),
          },
        },
      };
    }

    if (searchType === SEARCH_TYPES.STATUS) {
      filterBooking = {
        ...filterBooking,
        ...(status && {
          where: {
            status,
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.TIME) {
      filterBooking = {
        ...filterBooking,
        ...{
          where: {
            and: [
              { createdAt: { gt: fromDate } },
              { createdAt: { lt: toDate } },
            ],
          },
        },
      };
    }

    const response = yield call(api.getBookingTour, { filterBooking });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);

      yield put(BookingActions.getListBookingTourSuccess(data, pages));
    } else {
      yield put(BookingActions.getListBookingTourFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(BookingActions.getListBookingTourFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListBookingStay(
  api: any,
  {
    filter: {
      offset,
      limit,
      order,
      search,
      searchType,
      fromDate,
      toDate,
      status,
    },
  }: any
) {
  try {
    let filterBooking = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filterBooking = {
        ...filterBooking,
        ...{
          where: {
            ...(search && {
              bookingCode: { like: `%${search}%` },
            }),
          },
        },
      };
    }

    if (searchType === SEARCH_TYPES.STATUS) {
      filterBooking = {
        ...filterBooking,
        ...(status && {
          where: {
            status,
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.TIME) {
      filterBooking = {
        ...filterBooking,
        ...{
          where: {
            and: [
              { createdAt: { gt: fromDate } },
              { createdAt: { lt: toDate } },
            ],
          },
        },
      };
    }

    const response = yield call(api.getBookingStay, { filterBooking });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);

      yield put(BookingActions.getListBookingStaySuccess(data, pages));
    } else {
      yield put(BookingActions.getListBookingStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(BookingActions.getListBookingStayFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListBooking(api: any, { id }: any) {
  try {
    const filter = {
      where: {
        createdById: id,
      },
    };

    const response = yield call(api.listBooking, { filter });

    if (response.ok) {
      const { data } = response;

      yield put(BookingActions.getListBookingSuccess(data));
    } else {
      yield put(BookingActions.getListBookingFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(BookingActions.getListBookingFailure());
    SweetAlert.error(e.message);
  }
}
