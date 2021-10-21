import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';
import API from 'app/services/Api';
import { checkStatusApi } from 'app/utils';

const addBackgroundPost = async (body: any) => {
  const backgroundAdd: any = await API.createBackgroundPost(body);
  return checkStatusApi(backgroundAdd)
    ? SweetAlert.toastSuccess(t('background_post.create_success'))
    : SweetAlert.error(backgroundAdd?.data?.error?.message);
};

export { addBackgroundPost };
