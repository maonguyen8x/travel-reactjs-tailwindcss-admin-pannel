import API from 'app/services/Api';
// eslint-disable-next-line import/order
import SweetAlert from '../../../../components/SweetAlert';
import { checkDataApi } from 'app/utils';
import { t } from 'app/i18n';

const deleteIPAddress = async (id: number) => {
  const delIPAddress = await API.deleteIPAddress(id).then((result: any) => {
    if (checkDataApi(result)) {
      SweetAlert.toastSuccess(t('sweet.IP_Address.delete_success'));
    } else {
      SweetAlert.error(result?.data?.message);
    }
  });
  return delIPAddress;
};

export { deleteIPAddress };
