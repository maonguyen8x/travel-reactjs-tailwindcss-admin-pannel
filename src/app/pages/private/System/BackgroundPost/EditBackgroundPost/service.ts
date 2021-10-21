import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';
import API from 'app/services/Api';
import { checkStatusApi, checkDataApi } from 'app/utils';

const EditBackgroundPost = async (id: number, body: any) => {
  const backgroundEdit: any = await API.editBackgroundPost(id, body);
  return checkStatusApi(backgroundEdit)
    ? SweetAlert.toastSuccess(t('background_post.edit_success'))
    : SweetAlert.error(backgroundEdit?.data?.error?.message);
};

const getBackgroundPostById = async (id: number) => {
  const listBackground = await API.getBackgroundPostById(id);
  return checkDataApi(listBackground);
};

export { EditBackgroundPost, getBackgroundPostById };
