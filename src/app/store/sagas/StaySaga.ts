import { call, put } from 'redux-saga/effects';
import StayActions from 'app/store/redux/StayRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { ROUTERS, TRAVEL_TYPES, FILTER, SEARCH_TYPES } from '../../constants';
import { history } from '../../services/History';

export function* getListStay(
  api: any,
  {
    filter: {
      offset,
      limit,
      creator,
      order,
      search,
      searchType,
      fromDate,
      toDate,
    },
  }: any
) {
  try {
    let filter = {
      offset: offset * limit,
      limit,
      order: order,
      include: [
        { relation: 'user' },
        { relation: 'avatar' },
        { relation: 'location' },
      ],
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filter = {
        ...filter,
        ...{
          where: {
            ...(search && {
              name: { like: `%${search}%` },
            }),
            type: TRAVEL_TYPES.STAY,
          },
        },
      };
    }

    if (searchType === SEARCH_TYPES.OWNER) {
      filter = {
        ...filter,
        ...{
          where: {
            ...(creator && {
              userId: creator,
            }),
            type: TRAVEL_TYPES.STAY,
          },
        },
      };
    }

    if (searchType === SEARCH_TYPES.TIME) {
      filter = {
        ...filter,
        ...{
          where: {
            and: [
              { createdAt: { gt: fromDate } },
              { createdAt: { lt: toDate } },
            ],
            type: TRAVEL_TYPES.STAY,
          },
        },
      };
    }

    const response = yield call(api.listPages, {
      filter,
    });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);
      yield put(StayActions.getListStaySuccess(data, pages));
    } else {
      yield put(StayActions.getListStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StayActions.getListStayFailure());
    SweetAlert.error(e.message);
  }
}

export function* getStayById(api: any, action: any) {
  const filterServices = {
    where: {
      type: TRAVEL_TYPES.STAY,
    },
  };

  const filterString = `?filterServices=${JSON.stringify(filterServices)}`;

  const { id } = action;
  try {
    const response = yield call(api.stayId, id, filterString);
    if (response.ok) {
      const { data } = response;
      yield put(StayActions.getStayByIdSuccess(data));
    } else {
      yield put(StayActions.getStayByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StayActions.getStayByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* createStay(api: any, action: any) {
  const { stay } = action;
  const { title, coordinates, address, description, type, files = [] } = stay;

  const formData = new FormData();

  for (let i = 0; i < files.length; i += 1) {
    formData.append('files', files[i]);
  }

  try {
    const resUpload = yield call(api.upload, formData);

    if (resUpload.ok) {
      const dataUpload = resUpload.data;

      const formatData = dataUpload.map((item: any, index: any) => ({
        mediaContentId: item.id,
        description: files[index].name,
      }));

      const formStay = {
        title,
        coordinates,
        address,
        description,
        type,
        attachments: formatData,
      };

      const resStay = yield call(api.createStay, formStay);
      const stayId = resStay.data.id;

      if (resStay.ok) {
        yield put(StayActions.createStaySuccess(resStay.data));
        SweetAlert.confirmStay(
          'Bạn sẽ chuyển đến taọ phòng',
          'Yes',
          `${ROUTERS.STAY_ADD_SUB_SERVICES.replace(':id', stayId)}`,
          'Bắt đầu tạo dịch vụ phòng'
        );
      } else {
        yield put(StayActions.createStayFailure());
        const message = pathOr('', ['data', 'error', 'message'], resStay);
        SweetAlert.error(message);
      }
    } else {
      yield put(StayActions.createStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], resUpload);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StayActions.createStayFailure());
    SweetAlert.error(e.message);
  }
}
export function* editStay(api: any, action: any) {
  const { id, stay } = action;
  const { title, coordinates, address, description, type, files = [] } = stay;
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
        yield put(StayActions.editStayFailure());
        const message = pathOr('', ['data', 'error', 'message'], resUpload);
        SweetAlert.error(message);
      }
    } catch (e) {
      yield put(StayActions.editStayFailure());
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

  // Gọi api sửa dịch vụ Stay

  if (formatData) {
    const formStay = {
      title,
      coordinates,
      address,
      description,
      type,
      attachments: formatData,
    };

    const resStay = yield call(api.editStay, id, formStay);

    if (resStay.ok) {
      yield put(StayActions.editStaySuccess(resStay.data));
      SweetAlert.success(t('STAY_EDIT_SUCCESS'));
      history.goBack();
    } else {
      yield put(StayActions.editStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], resStay);
      SweetAlert.error(message);
    }
  }
}
export function* deleteStay(api: any, action: any) {
  const filterServices = {
    order: FILTER.NEWEST,
    where: {
      type: TRAVEL_TYPES.STAY,
    },
  };

  const filterString = `?filterServices=${JSON.stringify(filterServices)}`;
  const { id } = action;
  try {
    const response = yield call(api.deleteStay, id);
    if (response.ok) {
      yield put(StayActions.deleteStaySuccess());
      SweetAlert.success(t('STAY_DELETE_SUCCESS'));
      const resList = yield call(api.listStay, filterString);
      if (resList.ok) {
        yield put(StayActions.getListStaySuccess(resList.data));
      }
    } else {
      yield put(StayActions.deleteStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StayActions.deleteStayFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListReviewBooking(
  api: any,
  {
    id,
    filterReview: {
      offset,
      limit,
      order,
      search,
      searchType,
      fromDate,
      toDate,
    },
  }: any
) {
  try {
    let filterServiceReviews = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filterServiceReviews = {
        ...filterServiceReviews,
        ...{
          where: {
            ...(search && {
              name: { like: `%${search}%` },
            }),
            type: TRAVEL_TYPES.STAY,
            serviceId: id,
          },
        },
      };
    }

    if (searchType === SEARCH_TYPES.TIME) {
      filterServiceReviews = {
        ...filterServiceReviews,
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

    const response = yield call(api.listReviewBooking, {
      filterServiceReviews,
    });

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(StayActions.listReviewBookingStaySuccess(data, pages));
    } else {
      yield put(StayActions.listReviewBookingStayFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StayActions.listReviewBookingStayFailure());
    SweetAlert.error(e.message);
  }
}
