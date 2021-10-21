import { call, put } from 'redux-saga/effects';
import StaySubServicesActions from 'app/store/redux/StaySubServicesRedux';
import SweetAlert from '../../components/SweetAlert';
import { history } from '../../services/History';
import { ROUTERS } from '../../constants';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';

export function* createStaySubServices(api: any, action: any) {
  const { data } = action;
  const {
    title,
    description,
    type,
    facilities,
    serviceId,
    price,
    imageDescription
  } = data;

  const files = data && data.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i += 1) {
    formData.append('files', files[i]);
  }
  try {
    const resUpload = yield call(api.upload, formData);
    if (resUpload.ok) {
      const dataUpload = resUpload.data;

      const formatData = dataUpload.map((item: any) => ({
        mediaContentId: item.id,
        description: imageDescription
      }));

      const formStaySubServices = {
        title,
        description,
        type,
        facilities,
        serviceId,
        price,
        attachments: formatData
      };
      const resStaySubServices = yield call(
        api.createStaySubServices,
        formStaySubServices
      );

      if (resStaySubServices.ok) {
        yield put(
          StaySubServicesActions.createStaySubServicesSuccess(
            resStaySubServices.data
          )
        );
        SweetAlert.success(t('ROOM_ADD_SUCCESS'));
        history.push(ROUTERS.LIST_STAY);
      } else {
        yield put(StaySubServicesActions.createStaySubServicesFailure());
        const message = pathOr(
          '',
          ['data', 'error', 'message'],
          resStaySubServices
        );
        SweetAlert.error(message);
      }
    } else {
      yield put(StaySubServicesActions.createStaySubServicesFailure());
      const message = pathOr('', ['data', 'error', 'message'], resUpload);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StaySubServicesActions.createStaySubServicesFailure());
    SweetAlert.error(e.message);
  }
}
export function* getStaySubServicesById(api: any, action: any) {
  const { id } = action;
  try {
    const response = yield call(api.staySubServicesById, id);
    if (response.ok) {
      const { data } = response;
      yield put(StaySubServicesActions.getStaySubServicesByIdSuccess(data));
    } else {
      yield put(StaySubServicesActions.createStaySubServicesFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(StaySubServicesActions.createStaySubServicesFailure());
    SweetAlert.error(e.message);
  }
}
