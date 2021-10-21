import Swal from 'sweetalert2';
import { t } from '../../../../../i18n';
import { COLORS, STATUS_CHANGE_LOCATION_TYPES } from '../../../../../constants';

export default {
  ON_CANCEL_REQUEST_LOCATION: (props: any) => () => {
    const { match } = props;
    const id = match?.params?.id;

    Swal.fire({
      title: t('message.change_required.cancel_title'),
      icon: 'question',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: COLORS.RED,
      confirmButtonText: t('sw.button.send'),
      cancelButtonText: t('sw.button.cancel'),
      inputValidator: (value) => (value === '' ? t('error_text') : ''),
    }).then((result) => {
      if (result.isConfirmed) {
        props.changeStatusLocation(id, {
          status: STATUS_CHANGE_LOCATION_TYPES.REJECTED,
          refusingReason: result?.value,
        });
      }
    });
  },

  ON_CONFIRM_REQUEST_LOCATION: (props: any) => () => {
    const { match } = props;
    const id = match?.params?.id;
    Swal.fire({
      title: t('message.change_required.accept.title'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: COLORS.GREEN,
      confirmButtonText: t('sw.button.verify'),
      cancelButtonText: t('sw.button.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        props.changeStatusLocation(id, {
          status: STATUS_CHANGE_LOCATION_TYPES.ACCEPTED,
        });
      }
    });
  },
};
