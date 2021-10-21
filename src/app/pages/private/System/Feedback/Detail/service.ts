import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';
import API from 'app/services/Api';
import { history } from 'app/services/History';

const changeStatus = async (id: number, body: any) => {
  const status: any = await API.editFeedback(id, { status: body });
  return status?.ok
    ? SweetAlert.toastSuccess(t('feedback.message_status')).then(() =>
        history.goBack()
      )
    : SweetAlert.error(status?.data?.error?.message);
};

export { changeStatus };
