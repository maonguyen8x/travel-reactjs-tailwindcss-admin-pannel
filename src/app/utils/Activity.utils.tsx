import { t } from 'app/i18n';
import SweetAlert from 'app/components/SweetAlert';
import {
  COLORS,
  ACTIVITY_POST_TYPES,
  ACTIVITY_STATUS_TYPES,
} from 'app/constants';
import Swal from 'sweetalert2';
// import { deleteActivity } from 'app/pages/private/Activity/List/service';
import { checkStatusApi } from './api';

export const getFieldActivity = () => [
  {
    id: 'name',
    name: t('activity.name'),
    show: true,
  },
  {
    id: 'time',
    name: t('activity.time'),
    show: true,
  },
  {
    id: 'location',
    name: t('activity.address'),
    show: true,
  },
  {
    id: 'creator',
    name: t('activity.creator'),
    show: true,
  },
  {
    id: 'price',
    name: t('activity.price'),
    show: true,
  },
  {
    id: 'participantCount',
    name: t('activity.join'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('activity.createdAt'),
    show: true,
  },
  {
    id: 'action',
    name: t('activity.action'),
    show: true,
  },
  {
    id: 'status',
    name: t('app.table.status'),
    show: true,
  },
];

export const showConfirmDeleteActivityPopup = (
  id: number,
  delActivity: any,
  system = false
) => {
  Swal.fire({
    title: t('message.edit.activity_title'),
    icon: 'question',
    text: t('message.edit.activity_sub_title'),
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: t('sweet.button.yes'),
    cancelButtonText: 'Thoát',
    inputValidator: (value) => (value === '' ? t('error_text') : ''),
  }).then((result) => {
    if (result.isConfirmed) {
      delActivity(id, { system });
    }
  });
};

export const getTitleHeaderActivityView = (type: string) => {
  switch (type) {
    case ACTIVITY_POST_TYPES.MEDIA:
      return t('activity.image');
    case ACTIVITY_POST_TYPES.MEMBER_JOIN:
      return t('activity.count_member_join');
    default:
      return null;
  }
};

export const getStyleActivityStatus = (name: string) => {
  switch (name) {
    case ACTIVITY_STATUS_TYPES.PUBLIC:
      return (
        <span className="text-yellow-500 font-medium">
          {t('activity.status.upcoming')}
        </span>
      );
    case ACTIVITY_STATUS_TYPES.DRAFT:
      return (
        <span className="text-green-400 font-medium">
          {t('activity.status.inprogress')}
        </span>
      );
    case ACTIVITY_STATUS_TYPES.IN_PAST:
      return (
        <span className="text-gray-500 font-medium">
          {t('activity.status.inpast')}
        </span>
      );
    default:
      return '';
  }
};
