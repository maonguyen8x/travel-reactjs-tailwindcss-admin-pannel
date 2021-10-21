import Swal from 'sweetalert2';
import { history } from '../../services/History';
import { t } from '../../i18n';

const confirmStay = (
  text: string,
  confirmButtonText: string,
  moveSubSercices: any,
  textConfirm: string
) => {
  Swal.fire({
    title: '',
    text,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
  }).then((result) => {
    if (result.value) {
      history.push(moveSubSercices);
      Swal.fire(textConfirm);
    }
  });
};

const confirm = (
  text: string,
  confirmButtonText: any,
  functionConfirm: any
) => {
  Swal.fire({
    title: t('APP.CONFIRM.TITLE'),
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
  }).then((result) => {
    if (result.value) {
      functionConfirm();
    }
  });
};

const success = (text: string, cb?: () => void) => {
  Swal.fire(text, '', 'success').then(() => {
    if (cb) cb();
  });
};

const error = (text: string) => {
  Swal.fire(text, '', 'error');
};

const warning = (text: string) => {
  Swal.fire(text, '', 'warning');
};

const CheckTable = () => {
  Swal.fire(
    t('APP.CONFIRM.OH_NO'),
    t('APP.CONFIRM.SORRY_INFORMATION'),
    'error'
  );
};

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const toastSuccess = (title: string) =>
  Toast.fire({
    icon: 'success',
    title: `${title}`,
  });

const toastError = (title: string) =>
  Toast.fire({
    icon: 'error',
    title: `${title}`,
  });

const SweetAlert = {
  confirmStay,
  confirm,
  success,
  error,
  warning,
  CheckTable,
  toastSuccess,
  toastError,
};

export default SweetAlert;
