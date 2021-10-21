import { call, put, select, all } from 'redux-saga/effects';
import UsersActions, { UserSelectors } from 'app/store/redux/UserRedux';
import AuthActions from 'app/store/redux/AuthRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { FILTER, USER_ROLES } from '../../constants';

export function* getListUser(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      UserSelectors.getCurrentFilterGetListUsers
    );

    const newFilter = filter || currentFilter;

    const userFilterSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      ...(newFilter.search && { q: newFilter.search }),
    };

    const response = yield call(api.listUser, {
      userFilterSearch,
    });

    if (response.ok) {
      const data = response?.data;

      const { count } = response?.data;

      const pages = Math.ceil(count / newFilter.limit);

      yield put(UsersActions.getListUserSuccess(data, pages));
    } else {
      yield put(UsersActions.getListUserFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(UsersActions.getListUserFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListUserBlocked(
  api: any,
  { filterUserBlocked: { offset, limit, order, search } }: any
) {
  try {
    const filter = yield select(
      UserSelectors.getCurrentFilterGetListUsersBlock
    );

    const filterUserBlockedSearch = {
      ...{
        offset: filter.offset,
        limit: filter.limit,
        order: filter.order,
      },
      offset: offset * limit,
      limit,
      order: order,
      flagKeyShow: {
        blockedAt: true,
      },
      ...(search && { q: search }),
    };

    const response = yield call(api.listUser, {
      userFilterSearch: filterUserBlockedSearch,
    });

    if (response.ok) {
      const { count } = response?.data;

      const data = response?.data;
      const pagesUserBlocked = Math.ceil(count / limit);

      yield put(
        UsersActions.getListUserBlockedSuccess(
          data.data,
          pagesUserBlocked,
          data.count
        )
      );
    } else {
      yield put(UsersActions.getListUserBlockedFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(UsersActions.getListUserBlockedFailure());
    SweetAlert.error(e.message);
  }
}

export function* getUserById(api: any, action: any) {
  const { id } = action;
  try {
    const [userDetail, listPost, listBooking, listPage]: any = yield all([
      call(api.getUserById, id),
      call(api.listPost, {
        postFilterSearch: {
          order: FILTER.NEWEST,
          limit: 10,
          offset: 0,
          where: { creatorId: id },
        },
      }),
      call(api.listBooking, {
        filter: {
          order: FILTER.NEWEST,
          where: {
            createdById: id,
          },
        },
      }),
      call(api.listPages, {
        pageFilterSearch: {
          order: FILTER.NEWEST,
          where: {
            userId: id,
          },
        },
      }),
    ]);

    if (userDetail.ok && listPost.ok && listBooking.ok && listPage.ok) {
      yield put(
        UsersActions.getUserByIdSuccess(
          userDetail?.data,
          listPost?.data,
          listBooking?.data,
          listPage?.data
        )
      );
    } else {
      yield put(UsersActions.getUserByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], userDetail);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(UsersActions.getUserByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* updateUserProfile(api: any, action: any) {
  try {
    const { profile } = action;
    const auth = yield select((state) => state.auth);
    const { token } = auth;

    const response = yield call(api.userProfile, profile);

    if (response.ok) {
      yield put(AuthActions.getUserMeRequest(token));
      SweetAlert.success(t('profile.edit_success'));
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* lockUser(api: any, action: any) {
  try {
    const { id, data } = action;

    const { reason, detail } = data;

    if (!!reason) {
      const resLock = yield call(api.lockUser, id, {
        blockMessage: reason,
      });
      if (resLock.ok) {
        if (detail) {
          yield put(UsersActions.getUserByIdRequest(id));
        } else {
          yield put(UsersActions.getListUserRequest());
        }
        SweetAlert.toastSuccess(t('user.message.block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resLock);
        SweetAlert.error(message);
      }
    } else {
      const resUnLock = yield call(api.unLockUser, id);
      if (resUnLock.ok) {
        if (detail) {
          yield put(UsersActions.getUserByIdRequest(id));
        } else {
          yield put(UsersActions.getListUserRequest());
        }
        yield call(api.changeRoles, {
          userId: Number(id),
          newRole: [USER_ROLES.NORMAL_USER],
          newScopes: [],
        });
        SweetAlert.toastSuccess(t('user.message.unblock_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUnLock);
        SweetAlert.error(message);
      }
    }
  } catch (error) {
    SweetAlert.error(error.message);
  }
}
