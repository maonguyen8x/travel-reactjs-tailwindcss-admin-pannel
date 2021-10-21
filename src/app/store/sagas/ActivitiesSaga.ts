import { call, delay, put, select } from 'redux-saga/effects';
import ActivitiesActions, {
  ActivitySelectors,
} from 'app/store/redux/ActivitiesRedux';
import { t } from 'app/i18n';
import { pathOr, omit } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { ROUTERS, SEARCH_TYPES } from '../../constants';

export function* getListActivities(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      ActivitySelectors.getCurrentFilterGetListActivities
    );

    const newFilter = filter || currentFilter;

    let filterActivity = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      filterActivity = {
        ...filterActivity,
        ...{
          where: {
            createdById: newFilter.mine,
          },
        },
      };
    }

    const activitySearch = {
      ...(newFilter.search && { q: newFilter.search }),
    };

    const response = yield call(api.listActivities, {
      filterActivity,
      activitySearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / newFilter.limit);

      yield put(ActivitiesActions.getListActivitiesSuccess(data, pages));
    } else {
      yield put(ActivitiesActions.getListActivitiesFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(ActivitiesActions.getListActivitiesFailure());
    SweetAlert.error(e.message);
  }
}

export function* getActivityById(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.activitiesId, id);
    if (response.ok) {
      const { data } = response;
      yield put(ActivitiesActions.getActivitiesByIdSuccess(data));
    } else {
      yield put(ActivitiesActions.getActivitiesByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(ActivitiesActions.getActivitiesByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* editActivity(api: any, action: any) {
  try {
    const { id, activities } = action;
    const { mediaContents = [] } = activities;

    const filesNeedUpload = mediaContents.filter((item: any) => !item.id);
    const filesUploaded = mediaContents.filter((item: any) => item.id);

    let formatData = null;

    if (filesNeedUpload.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < filesNeedUpload.length; i += 1) {
        formData.append('mediaContents', filesNeedUpload[i]);
      }

      try {
        const resUpload = yield call(api.upload, formData);
        if (resUpload.ok) {
          const dataUpload = resUpload.data;

          const formatData1 = dataUpload.map((item: any, index: any) => ({
            mediaContentId: item.id,
            description: filesNeedUpload[index].name,
          }));

          const formatData2 = filesUploaded.map((item: any) => ({
            mediaContentId: item.id,
            description: item.description,
          }));

          formatData = [...formatData2, ...formatData1];
        } else {
          const message = pathOr('', ['data', 'error', 'message'], resUpload);
          SweetAlert.toastError(message);
        }
      } catch (e) {
        SweetAlert.toastError(e?.message);
      }
    } else {
      formatData = mediaContents
        .filter((item: any) => item.id)
        .map((item: any, index: any) => ({
          ...item,
        }));
    }

    if (formatData) {
      const response = yield call(api.editActivities, id, {
        ...activities,
        mediaContents: formatData.map((item: any) =>
          omit(['deletedAt', 'postId'], item)
        ),
      });
      if (response.ok) {
        SweetAlert.toastSuccess(t('activity.create_success')).then(() => {
          history.push(ROUTERS.LIST_ACTIVITY);
        });
      } else {
        const message = pathOr('', ['data', 'error', 'message'], response);
        SweetAlert.toastError(message);
      }
    }
  } catch (e) {
    SweetAlert.toastError(e.message);
  }
}

export function* deleteActivity(api: any, action: any) {
  const { id, data } = action;

  const { system } = data;

  try {
    const response = yield call(api.deleteActivity, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('activity.delete_success'));
      yield delay(1000);
      if (system) {
        history.push(ROUTERS.LIST_ACTIVITY);
      } else {
        yield put(ActivitiesActions.getListActivitiesRequest());
      }
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* lockActivity(api: any, action: any) {
  try {
    const { id, data } = action;

    const { reason, detail } = data;

    if (!!reason) {
      const resLock = yield call(api.lockActivity, id, {
        blockMessage: reason,
      });
      if (resLock.ok) {
        if (detail) {
          yield put(ActivitiesActions.getActivitiesByIdRequest(id));
        } else {
          yield put(ActivitiesActions.getListActivitiesRequest());
        }
        SweetAlert.toastSuccess(t('activity.message.block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resLock);
        SweetAlert.error(message);
      }
    } else {
      const resUnLock = yield call(api.unLockActivity, id);
      if (resUnLock.ok) {
        if (detail) {
          yield put(ActivitiesActions.getActivitiesByIdRequest(id));
        } else {
          yield put(ActivitiesActions.getListActivitiesRequest());
        }
        SweetAlert.toastSuccess(t('activity.message.un_block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUnLock);
        SweetAlert.error(message);
      }
    }
  } catch (error) {
    SweetAlert.error(error.message);
  }
}
