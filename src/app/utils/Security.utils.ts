import { t } from 'app/i18n';
import SweetAlert from 'app/components/SweetAlert';
import { COLORS } from 'app/constants';
import Swal from 'sweetalert2';
import { deleteIPAddress } from 'app/pages/private/System/Security/service';
import { checkStatusApi } from './api';

export const getFieldBlackList = () => [
  {
    id: 'ips',
    name: t('security.ips'),
    show: true,
  },
  {
    id: 'time',
    name: t('security.time'),
    show: true,
  },
];

export const deleteIPAddressById = (
  id: number,
  onGetListBlackListIPS: any,
  filter: any
) => {
  Swal.fire({
    title: t('message?.edit.location_title'),
    icon: 'question',
    text: t('message?.edit.location_sub_title'),
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t('sweet.button.submit'),
    cancelButtonText: t('sweet.button.cancel'),

    inputValidator: (value) => (value === '' ? t('error_text') : ''),
  }).then((result) => {
    if (result.isConfirmed) {
      deleteIPAddress(id).then((res: any) => {
        if (checkStatusApi(res)) {
          SweetAlert.toastSuccess(res?.data?.message).then(() =>
            onGetListBlackListIPS(filter)
          );
        } else {
          SweetAlert.error(res?.data?.message);
        }
      });
    }
  });
};
