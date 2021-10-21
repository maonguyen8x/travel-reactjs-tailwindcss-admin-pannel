import { call, delay, put, select } from 'redux-saga/effects';
import LocationAction, {
  LocationSelectors,
} from 'app/store/redux/LocationRedux';
import { t } from 'app/i18n';
import { omit, pathOr } from 'ramda';
import Swal from 'sweetalert2';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { ROUTERS, SEARCH_TYPES, TRAVEL_TYPES } from '../../constants';

export function* getListAttractions(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      LocationSelectors.getCurrentFilterGetListAttractions
    );

    const newFilter = filter || currentFilter;

    let locationSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      ...(newFilter.search && { q: newFilter.search }),
      where: {
        locationType: TRAVEL_TYPES.WHERE,
        isPublished: true,
      },
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      locationSearch = {
        ...locationSearch,
        ...{
          where: {
            userId: newFilter.mine,
          },
        },
      };
    }

    const response = yield call(api.getLocationsAdmin, {
      locationSearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / newFilter.limit);

      yield put(LocationAction.getListAttractionsSuccess(data, pages));
    } else {
      yield put(LocationAction.getListAttractionsFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getListAttractionsFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListLocations(api: any, { filterListLocations }: any) {
  try {
    const currentFilter = yield select(
      LocationSelectors.getCurrentFilterGetListLocations
    );

    const newFilter = filterListLocations || currentFilter;

    let locationSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      ...(newFilter.search && { q: newFilter.search }),
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      locationSearch = {
        ...locationSearch,
        ...{
          where: {
            userId: newFilter.mine,
          },
        },
      };
    }

    const response = yield call(api.getLocationsAdmin, {
      locationSearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / newFilter.limit);

      yield put(LocationAction.getListLocationsSuccess(data, pages));
    } else {
      yield put(LocationAction.getListLocationsFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getListLocationsFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListLocationsDuplicated(
  api: any,
  { filterLocationDuplicated: { offset, limit, order, search } }: any
) {
  try {
    const filter = yield select(
      LocationSelectors.getCurrentFilterGetListLocationDuplicated
    );

    const duplicatedLocationSearch = {
      ...{
        offset: filter.offset,
        limit: filter.limit,
        order: filter.order,
      },
      offset: offset * limit,
      limit,
      order: order,
      ...(search && { q: search }),
    };

    const response = yield call(api.getListLocationsDuplicated, {
      duplicatedLocationSearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(LocationAction.getListLocationDuplicatedSuccess(data, pages));
    } else {
      yield put(LocationAction.getListLocationDuplicatedFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getListLocationDuplicatedFailure());
    SweetAlert.error(e.message);
  }
}

export function* getLocationById(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.getLocationId, id);
    if (response.ok) {
      const { data } = response;
      yield put(LocationAction.getLocationByIdSuccess(data));
    } else {
      yield put(LocationAction.getLocationByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getLocationByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* createLocation(api: any, action: any) {
  Swal.showLoading();
  try {
    const { location } = action;
    const { post } = location;

    const formData = new FormData();
    for (let i = 0; i < post?.mediaContents?.length; i += 1) {
      formData.append('files', post?.mediaContents?.[i]);
    }

    const resUpload = yield call(api.upload, formData);
    if (resUpload?.ok) {
      const mediaContents =
        resUpload &&
        resUpload?.data?.map((item: any) => omit(['updatedAt'], item));

      const response = yield call(api.createLocation, {
        ...location,
        post: {
          ...post,
          mediaContents,
        },
      });
      if (response.ok) {
        SweetAlert.toastSuccess(t('location.created_success')).then(() => {
          history.push(ROUTERS.LIST_LOCATION);
        });
      } else {
        const message = pathOr('', ['data', 'error', 'message'], response);
        SweetAlert.error(message);
      }
    } else {
      const message = pathOr('', ['data', 'error', 'message'], resUpload);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* getUserIdLocation(
  api: any,
  { filter: { offset, limit, order, userId } }: any
) {
  const filterLocations = {
    offset: offset * limit,
    limit,
    order: order,
    where: {
      userId,
    },
  };

  try {
    const response = yield call(api.getLocations, {
      filterLocations,
    });
    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(LocationAction.getUserIdLocationSuccess(data, pages));
    } else {
      yield put(LocationAction.getUserIdLocationFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getUserIdLocationFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteLocation(api: any, action: any) {
  const { id, data } = action;

  const { system } = data;

  try {
    const response = yield call(api.deleteLocation, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('location.delete_success'));
      yield delay(1000);
      if (system) {
        yield put(LocationAction.getListLocationsRequest());
      } else {
        yield put(LocationAction.getListAttractionsRequest());
      }
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* getListRequestChangeLocation(
  api: any,
  { filterChangeLocation: { offset, limit, order, search } }: any
) {
  try {
    const filter = yield select(
      LocationSelectors.getCurrentFilterGetRequestChangeListLocation
    );

    const locationRequestFilter = {
      ...{
        offset: filter.offset,
        limit: filter.limit,
        order: filter.order,
      },
      offset: offset * limit,
      limit,
      order,
      ...(search && { q: search }),
    };

    const response = yield call(api.getRequestChangeLocations, {
      locationRequestFilter,
    });
    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(
        LocationAction.getListRequestChangeLocationSuccess(data, pages)
      );
    } else {
      yield put(LocationAction.getListRequestChangeLocationFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getListRequestChangeLocationFailure());
    SweetAlert.error(e.message);
  }
}

export function* changeStatusLocation(api: any, action: any) {
  const { id, data } = action;

  const { status, refusingReason } = data;

  try {
    const response = yield call(api.changeStatusRequestLocation, id, status, {
      refusingReason,
    });

    if (response.ok) {
      SweetAlert.toastSuccess(t('change_location.success')).then(() => {
        history.push(ROUTERS.LIST_REQUEST_CHANGE_LOCATION);
      });
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.changeStatusLocationFailure());
    SweetAlert.error(e.message);
  }
}

export function* getRequestChangeLocationById(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.getRequestChangeLocationId, id);
    if (response.ok) {
      const { data } = response;
      yield put(LocationAction.getRequestChangeLocationByIdSuccess(data));
    } else {
      yield put(LocationAction.getRequestChangeLocationByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(LocationAction.getRequestChangeLocationByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* lockLocation(api: any, action: any) {
  try {
    const { id, data } = action;

    const { reason, detail, system } = data;

    if (!!reason) {
      const resLock = yield call(api.lockLocation, id, {
        blockMessage: reason,
      });
      if (resLock.ok) {
        if (detail) {
          yield put(LocationAction.getLocationByIdRequest(id));
        }
        if (system) {
          yield put(LocationAction.getListLocationsRequest());
        } else {
          yield put(LocationAction.getListAttractionsRequest());
        }
        SweetAlert.toastSuccess(t('location.message.block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resLock);
        SweetAlert.error(message);
      }
    } else {
      const resUnLock = yield call(api.unLockLocation, id);
      if (resUnLock.ok) {
        if (detail) {
          yield put(LocationAction.getLocationByIdRequest(id));
        }
        if (system) {
          yield put(LocationAction.getListLocationsRequest());
        } else {
          yield put(LocationAction.getListAttractionsRequest());
        }
        SweetAlert.toastSuccess(t('location.message.un_block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUnLock);
        SweetAlert.error(message);
      }
    }
  } catch (error) {
    SweetAlert.error(error.message);
  }
}
