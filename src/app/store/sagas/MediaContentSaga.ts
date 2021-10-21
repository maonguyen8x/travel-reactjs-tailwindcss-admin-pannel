import { call, put, all } from 'redux-saga/effects';
import MediaContentActions from 'app/store/redux/MediaContentRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import { history } from '../../services/History';
import { ROUTERS } from '../../constants';
import SweetAlert from '../../components/SweetAlert';

export function* getListImage(api: any, { offset = 0, limit = 16 }: any) {
  try {
    const whereMedia = { resourceType: 'IMAGE', mediaType: 'UPLOAD' };
    const filterMediaContents = {
      offset: offset * limit,
      limit,
      where: whereMedia,
    };
    const where = whereMedia;
    const [response, resCount]: any = yield all([
      call(api.getMediaContents, { filterMediaContents }),
      call(api.getCountMediaContent, { where }),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);
      yield put(MediaContentActions.getListImageSuccess(data, pages));
    } else {
      yield put(MediaContentActions.getListImageFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.getListImageFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListVideo(api: any, { offset = 0, limit = 16 }: any) {
  try {
    const whereMedia = { resourceType: 'VIDEO', mediaType: 'UPLOAD' };
    const filterMediaContents = {
      offset: offset * limit,
      limit,
      where: whereMedia,
    };
    const where = whereMedia;
    const [response, resCount]: any = yield all([
      call(api.getMediaContents, { filterMediaContents }),
      call(api.getCountMediaContent, { where }),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);
      yield put(MediaContentActions.getListVideoSuccess(data, pages));
    } else {
      yield put(MediaContentActions.getListVideoFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.getListVideoFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteMediaContent(api: any, { id }: any) {
  try {
    const response = yield call(api.deleteMediaContent, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('admin.background.delete.success')).then(() => {
        history.push(ROUTERS.LIST_BACKGROUND_POST);
      });
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* searchTimeMediaContent(
  api: any,
  { createdAt1, createdAt2, offset = 0, limit = 100 }: any
) {
  const filterMediaContents = {
    offset: offset * limit,
    limit,
    where: {
      and: [
        { createdAt: { gt: createdAt1 } },
        { createdAt: { lt: createdAt2 } },
      ],
    },
  };

  const filterString = `?filterMediaContents=${encodeURIComponent(
    JSON.stringify(filterMediaContents)
  )}`;

  try {
    const response = yield call(api.searchTimeMediaContents, filterString);
    if (response.ok) {
      const { data } = response;

      yield put(MediaContentActions.searchTimeMediaContentSuccess(data));
    } else {
      yield put(MediaContentActions.searchTimeMediaContentFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.searchTimeMediaContentFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListBackgroundPost(
  api: any,
  { offset = 0, limit = 16 }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
    };

    const [response, resCount]: any = yield all([
      call(api.getBackgroundPosts, { filter }),
      call(api.getCountBackgroundPost),
    ]);
    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(MediaContentActions.getListBackgroundPostSuccess(data, pages));
    } else {
      yield put(MediaContentActions.getListBackgroundPostFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.getListBackgroundPostFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteBackgroundPost(
  api: any,
  { id, offset = 0, limit = 10 }: any
) {
  try {
    const response = yield call(api.deleteBackgroundPost, id);
    if (response.ok) {
      SweetAlert.toastSuccess(t('admin.background.delete.success')).then(() => {
        history.push(ROUTERS.LIST_BACKGROUND_POST);
      });
    } else {
      yield put(MediaContentActions.getListBackgroundPostFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.getListBackgroundPostFailure());
    SweetAlert.error(e.message);
  }
}

export function* createBackgroundPost(api: any, action: any) {
  const { background } = action;
  const { color, isActive, files = [] } = background;

  const formData = new FormData();

  formData.append('files', files[0]);

  try {
    const resUpload = yield call(api.uploadBackground, formData);
    if (resUpload.ok) {
      const dataUpload = resUpload.data;

      const formBackgroundPost = {
        color,
        isActive,
        backgroundPost: dataUpload[0],
      };

      const resBackgroundPost = yield call(
        api.createBackgroundPost,
        formBackgroundPost
      );

      if (resBackgroundPost.ok) {
        SweetAlert.toastSuccess(t('admin.background.create.success')).then(
          () => {
            history.push(ROUTERS.LIST_BACKGROUND_POST);
          }
        );
      } else {
        const message = pathOr(
          '',
          ['data', 'error', 'message'],
          resBackgroundPost
        );
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

export function* editBackgroundPost(api: any, action: any) {
  const { id, background } = action;
  const { color, isActive, files = [] } = background;
  const filesNeedUpload = files.filter((item: any) => !item.id);
  const filesUploaded = files.filter((item: any) => item.id);

  let formatData = null;
  // Sửa ảnh có chọn ảnh mới

  if (filesNeedUpload.length > 0) {
    const formData = new FormData();

    for (let i = 0; i < filesNeedUpload.length; i += 1) {
      formData.append('files', filesNeedUpload[i]);
    }

    try {
      const resUpload = yield call(api.uploadBackground, formData);
      if (resUpload.ok) {
        const dataUpload = resUpload.data;
        const formatData1 = dataUpload;

        const formatData2 = filesUploaded;

        formatData = [...formatData2, ...formatData1];
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUpload);
        SweetAlert.error(message);
      }
    } catch (e) {
      SweetAlert.error(e.message);
    }
  } else {
    formatData = files;
  }

  // Gọi api sửa dịch vụ Background Post
  if (formatData) {
    const formBackgroundPost = {
      color,
      isActive,
      backgroundPost: formatData[0],
    };

    const resBackgroundPost = yield call(
      api.editBackgroundPost,
      id,
      formBackgroundPost
    );

    if (resBackgroundPost.ok) {
      SweetAlert.success(t('BACKGROUND_EDIT_SUCCESS'));
      history.goBack();
    } else {
      const message = pathOr(
        '',
        ['data', 'error', 'message'],
        resBackgroundPost
      );
      SweetAlert.error(message);
    }
  }
}

export function* getBackgroundPostById(
  api: any,
  { id, offset = 0, limit = 16 }: any
) {
  try {
    const filterBackgroundPosts = {
      offset: offset * limit,
      limit,
    };
    const filterString = `?filter=${encodeURIComponent(
      JSON.stringify(filterBackgroundPosts)
    )}`;
    const response = yield call(api.getBackgroundPostById, id, filterString);

    if (response.ok) {
      const { data } = response;

      yield put(MediaContentActions.getBackgroundPostByIdSuccess(data));
    } else {
      yield put(MediaContentActions.getBackgroundPostByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(MediaContentActions.getBackgroundPostByIdFailure());
    SweetAlert.error(e.message);
  }
}
