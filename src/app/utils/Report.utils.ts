import SweetAlert from 'app/components/SweetAlert';
import {
  COLORS,
  REPORT_STATUS_TYPES,
  REPORT_TYPES,
  REPORT_VALUES,
} from 'app/constants';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';

export const getFieldReport = () => [
  {
    id: 'name',
    name: t('report.name'),
    show: true,
  },
  {
    id: 'content',
    name: t('report.content'),
    show: true,
  },
  {
    id: 'type',
    name: t('report.type'),
    show: true,
  },
  {
    id: 'status',
    name: t('report.status'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('report.created'),
    show: true,
  },
];

export const getFieldStatus = () => [
  {
    name: t('report.processing'),
    value: REPORT_STATUS_TYPES.PROCESSING,
  },
  {
    name: t('report.completed'),
    value: REPORT_STATUS_TYPES.COMPLETED,
  },
  {
    name: t('report.wait_processing'),
    value: REPORT_STATUS_TYPES.WAITING_FOR_PROCESSING,
  },
];

const getReportSelectOptions = () => ({
  '': `${t('sweet.user.reason_select')}`,
  'Chúng tôi đã nhận được báo cáo và đang trong quá trình xử lý': `${t(
    'sweet.report.processing'
  )}`,
  'Báo cáo của bạn đã bị huỷ yêu cầu gửi lại': `${t('sweet.report.canceled')}`,
});

export const onChangeStatus = async (
  id: string,
  status: string,
  editStatus: any,
  getData: any
) => {
  Swal.fire({
    input: 'radio',
    inputOptions: getReportSelectOptions(),
    showCancelButton: true,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonColor: COLORS.GREEN,
    confirmButtonText: t('report.submit'),
    cancelButtonText: t('booking.canceled'),
    reverseButtons: true,
    showCloseButton: true,
    html:
      `<label class="uto-label">${t('sweet.label.noti')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea"></textarea>',
    focusConfirm: false,
    preConfirm: (reason) => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value || reason,
      ];
    },
  }).then(async (result: any) => {
    if (result?.isConfirmed && !!result?.value?.[0]) {
      const res = await editStatus(id, {
        reportStatus: status,
        feedback: result?.value?.[0],
      });
      if (res?.ok) {
        SweetAlert.toastSuccess(t('report.submit_sccess'));
        setTimeout(() => {
          getData();
        }, 1000);
      } else {
        SweetAlert.error(res?.data?.message);
      }
    }
  });
};

export const getTypeReport = (name: string) => {
  switch (name) {
    case REPORT_TYPES.USER:
      return t('type.user');
    case REPORT_TYPES.LOCATION:
      return t('type.location');
    case REPORT_TYPES.POST:
      return t('type.post');
    case REPORT_TYPES.RANKING:
      return t('type.ranking');
    case REPORT_TYPES.PAGE:
      return t('type.page');
    case REPORT_TYPES.REPORT_ACTIVITY:
      return t('type.avtivity');
    default:
      return '';
  }
};
