import { call, put, select } from 'redux-saga/effects';
import PostActions, { PostsSelectors } from 'app/store/redux/PostRedux';
import { omit, pathOr } from 'ramda';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { ROUTERS, SEARCH_TYPES } from '../../constants';

export function* getListPost(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      PostsSelectors.getCurrentFilterGetListPosts
    );

    const newFilter = filter || currentFilter;

    let postFilterSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      ...(newFilter.search && { q: newFilter.search }),
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      postFilterSearch = {
        ...postFilterSearch,
        ...{
          where: {
            creatorId: newFilter.mine,
          },
        },
      };
    }

    const response = yield call(api.listPost, {
      postFilterSearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / newFilter.limit);

      yield put(PostActions.getListPostSuccess(data, pages));
    } else {
      yield put(PostActions.getListPostFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PostActions.getListPostFailure());
    SweetAlert.error(e.message);
  }
}

export function* getPostById(api: any, action: any) {
  const { id } = action;

  try {
    const response = yield call(api.getPostById, id);

    if (response.ok) {
      const { data } = response;

      yield put(PostActions.getPostByIdSuccess(data));
    } else {
      yield put(PostActions.getPostByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PostActions.getPostByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* createPost(api: any, action: any) {
  Swal.showLoading();
  try {
    const { post } = action;

    const mediaContents = post?.mediaContents?.map(
      (item: any) => item?.uploadSize
    );

    const formData = new FormData();

    for (let i = 0; i < mediaContents?.length; i += 1) {
      formData.append('files', mediaContents?.[i]);
    }

    // upload image
    const resUpload = yield call(api.upload, formData);
    if (resUpload?.ok) {
      const mediaContents =
        resUpload &&
        resUpload?.data?.map((item: any) => omit(['updatedAt'], item));

      const response = yield call(api.postPost, {
        ...post,
        mediaContents,
      });

      if (response.ok) {
        SweetAlert.toastSuccess(t('post.created_success')).then(() => {
          history.push(ROUTERS.LIST_POST);
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

export function* editPost(api: any, action: any) {
  Swal.showLoading();
  try {
    const { id, post } = action;

    const { mediaContents = [] } = post;

    const filesNeedUpload = mediaContents?.map(
      (item: any) => !item.id && item?.uploadSize
    );
    const filesUploaded = mediaContents?.filter((item: any) => item.id);

    let formatData = null;

    if (filesNeedUpload?.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < filesNeedUpload?.length; i += 1) {
        formData.append('media', filesNeedUpload?.[i]);
      }

      try {
        const resUpload = yield call(api.upload, formData);
        if (resUpload.ok) {
          const dataUpload = resUpload.data;

          formatData = [...dataUpload, ...filesUploaded];
        } else {
          const message = pathOr('', ['data', 'error', 'message'], resUpload);
          SweetAlert.error(message);
        }
      } catch (e) {
        SweetAlert.error(e?.message);
      }
    } else {
      formatData = filesUploaded;
    }

    if (formatData) {
      const response = yield call(api.editPost, id, {
        ...post,
        mediaContents: formatData.map((item: any) => omit(['deletedAt'], item)),
      });
      if (response.ok) {
        SweetAlert.toastSuccess(t('post.edit_success')).then(() => {
          history.push(ROUTERS.LIST_POST);
        });
      } else {
        const message = pathOr('', ['data', 'error', 'message'], response);
        SweetAlert.error(message);
      }
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* deletePost(api: any, action: any) {
  const { id } = action;
  try {
    const response = yield call(api.deletePost, id);
    if (response.ok) {
      SweetAlert.success(t('post.delete_success'));
      yield put(PostActions.getListPostRequest());
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* lockPost(api: any, action: any) {
  try {
    const { id, data } = action;

    const { reason, detail } = data;

    if (!!reason) {
      const resLock = yield call(api.lockPost, id, {
        blockMessage: reason,
      });
      if (resLock.ok) {
        if (detail) {
          yield put(PostActions.getPostByIdRequest(id));
        } else {
          yield put(PostActions.getListPostRequest());
        }
        SweetAlert.toastSuccess(t('post.message.block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resLock);
        SweetAlert.error(message);
      }
    } else {
      const resUnLock = yield call(api.unLockPost, id);
      if (resUnLock.ok) {
        if (detail) {
          yield put(PostActions.getPostByIdRequest(id));
        } else {
          yield put(PostActions.getListPostRequest());
        }
        SweetAlert.toastSuccess(t('post.message.un_block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUnLock);
        SweetAlert.error(message);
      }
    }
  } catch (error) {
    SweetAlert.error(error.message);
  }
}
