import { call, put, select } from 'redux-saga/effects';
import TourActions, { TourSelectors } from 'app/store/redux/TourRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { TRAVEL_TYPES, FILTER, SEARCH_TYPES } from '../../constants';

export function* getListTour(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      TourSelectors.getCurrentFilterGetListTour
    );

    const newFilter = filter || currentFilter;

    let pageFilterSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      include: [
        { relation: 'user' },
        { relation: 'avatar' },
        { relation: 'location' },
      ],
      ...(newFilter.search && { q: newFilter.search }),
      where: {
        type: TRAVEL_TYPES.TOUR,
      },
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      pageFilterSearch = {
        ...pageFilterSearch,
        ...{
          where: {
            userId: newFilter.mine,
            type: TRAVEL_TYPES.TOUR,
          },
        },
      };
    }

    const response = yield call(api.listPages, {
      pageFilterSearch,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / newFilter.limit);
      yield put(TourActions.getListTourSuccess(data, pages));
    } else {
      yield put(TourActions.getListTourFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(TourActions.getListTourFailure());
    SweetAlert.error(e.message);
  }
}

export function* createTourService(api: any, action: any) {
  try {
    const { tour } = action;

    const resTour = yield call(api.createTourService, tour);

    if (resTour.ok) {
      SweetAlert.success(t('CREATE_TOUR_SUCCESS'));
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], resTour);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* getTourById(api: any, action: any) {
  const { id } = action;
  try {
    const filter = {
      filter: {
        include: [
          { relation: 'user' },
          { relation: 'avatar' },
          { relation: 'background' },
          { relation: 'location' },
        ],
      },
    };

    const response = yield call(api.getPageId, id, filter);
    if (response.ok) {
      const { data } = response;
      yield put(TourActions.getTourByIdSuccess(data));
    } else {
      yield put(TourActions.getTourByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(TourActions.getTourByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* deleteTour(api: any, action: any) {
  const { id } = action;
  try {
    const response = yield call(api.deleteService, id);
    if (response.ok) {
      SweetAlert.success(t('DELETE_TOUR_SUCCESS'));
      yield put(TourActions.getListTourRequest());
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* editTour(api: any, action: any) {
  const { id, tour } = action;
  const {
    title,
    coordinates,
    address,
    description,
    type,
    price,
    files = [],
  } = tour;
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
        SweetAlert.error(message);
      }
    } catch (e) {
      SweetAlert.error(e.message);
    }
  } else {
    // Sửa ảnh không chọn ảnh mới, chỉ xóa ảnh đã tồn tại
    formatData = files
      .filter((item: any) => item.id)
      .map((item: any, index: any) => ({
        mediaContentId: item.id,
        description: files[index].description,
      }));
  }

  // Gọi api sửa dịch vụ Tour
  if (formatData) {
    const formTour = {
      title,
      coordinates,
      address,
      description,
      type,
      price,
      attachments: formatData,
    };

    const resTour = yield call(api.editTour, id, formTour);

    if (resTour.ok) {
      SweetAlert.success(t('EDIT_TOUR_SUCCESS'));
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], resTour);
      SweetAlert.error(message);
    }
  }
}

export function* getListServices(
  api: any,
  { filter: { offset, limit, order, pageId } }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
      order: order,
      where: {
        type: TRAVEL_TYPES.TOUR,
        pageId,
      },
    };

    const response = yield call(api.listServices, {
      filter,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);
      yield put(TourActions.getListServicesSuccess(data, pages));
    } else {
      yield put(TourActions.getListServicesFail());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(TourActions.getListServicesFail());
    SweetAlert.error(e.message);
  }
}

export function* getListPageReviews(
  api: any,
  { filter: { offset, limit, order, pageId } }: any
) {
  try {
    const filter = {
      offset: offset * limit,
      limit,
      order: order,
      include: [
        {
          relation: 'page',
          scope: {
            include: [{ relation: 'user' }],
          },
        },
        { relation: 'post' },
      ],
      where: {
        type: TRAVEL_TYPES.TOUR,
        pageId,
      },
    };

    const response = yield call(api.listPageReviews, {
      filter,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);
      yield put(TourActions.getListPageReviewsSuccess(data, pages));
    } else {
      yield put(TourActions.getListPageReviewsFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(TourActions.getListPageReviewsFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListPageNews(
  api: any,
  { filterNews: { offset, limit, order, pageId } }: any
) {
  try {
    const filterPosts = {
      offset: offset * limit,
      limit,
      order: order,
      include: [{ relation: 'mediaContents' }],
      where: {
        postType: TRAVEL_TYPES.PAGE_NEW,
        pageId,
      },
    };

    const response = yield call(api.listPost, {
      filterPosts,
    });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);
      yield put(TourActions.getListPageNewsSuccess(data, pages));
    } else {
      yield put(TourActions.getListPageNewsFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(TourActions.getListPageNewsFailure());
    SweetAlert.error(e.message);
  }
}
