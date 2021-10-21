import { COLORS, LOCATION_POST_TYPE } from 'app/constants';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';

export const getFieldsAttractions = () => [
  {
    id: 'name?.keyword',
    name: t('location.name'),
    show: true,
  },
  {
    id: 'formatedAddress.keyword',
    name: t('location.location'),
    show: true,
  },
  {
    id: 'creator',
    name: t('location.creator'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('location.created'),
    show: true,
  },
  {
    id: 'totalReview',
    name: t('location.total_checkin'),
    show: true,
  },
  {
    id: 'totalPost',
    name: t('location.total_posts'),
    show: false,
  },
  {
    id: 'totalActivity',
    name: t('location.total_activity'),
    show: false,
  },
  {
    id: t('location.total_posts'),
    name: 'Số lượng bài viết',
    show: false,
  },

  {
    id: 'totalPlan',
    name: t('location.total_plan'),
    show: false,
  },
  {
    id: 'averagePoint',
    name: t('location.averagePoint'),
    show: false,
  },
  {
    id: 'score',
    name: t('location.trend_point'),
    show: false,
  },
  {
    id: 'totalReport',
    name: t('location.total_report'),
    show: false,
  },
  {
    id: 'dateEdit',
    name: t('location.edit_date'),
    show: false,
  },
  {
    id: 'action',
    name: t('location.action'),
    show: true,
  },
];

export const getFieldsLocation = () => [
  {
    id: 'name?.keyword',
    name: t('location.name'),
    show: true,
  },
  {
    id: 'formatedAddress.keyword',
    name: t('location.location'),
    show: true,
  },
  {
    id: 'creator',
    name: t('location.creator'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('location.created'),
    show: true,
  },
  {
    id: 'totalActivity',
    name: t('location.total_activity'),
    show: false,
  },
  {
    id: t('location.total_posts'),
    name: 'Số lượng bài viết',
    show: false,
  },

  {
    id: 'totalPlan',
    name: t('location.total_plan'),
    show: false,
  },
  {
    id: 'dateEdit',
    name: t('location.edit_date'),
    show: false,
  },
  {
    id: 'action',
    name: t('location.action'),
    show: true,
  },
];

export const getFieldDuplicateLocation = () => [
  {
    id: 'address',
    name: t('location.address'),
    show: true,
  },
  {
    id: 'duplicateNumber',
    name: t('location.total_duplicate'),
    show: true,
  },
  {
    id: 'locationType',
    name: t('location.type'),
    show: true,
  },
  {
    id: 'verified',
    name: t('location.verified'),
    show: true,
  },
  {
    id: 'note',
    name: t('location.note'),
    show: true,
  },
];

export const showConfirmDeleteLocationPopup = (
  id: number,
  delLocation: any,
  system = false
) => {
  Swal.fire({
    title: t('message.edit.location_title'),
    icon: 'question',
    text: t('message.edit.location_sub_title'),
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: t('sweet.button.yes'),
    cancelButtonText: t('button.cancel'),
    inputValidator: (value) => (value === '' ? t('error_text') : ''),
  }).then((result) => {
    if (result.isConfirmed) {
      delLocation(id, { system });
    }
  });
};
export const getTotalCount = (data: any, key: string) =>
  data?.filter((items: any) => items?.myMapType === key)?.length;

export const getMyMapType = (data: any, key: string) =>
  data?.filter((items: any) => items?.myMapType === key);

export const getLocationSelectOption = () => ({
  '': `${t('sweet.user.reason_select')}`,
  'Địa điểm có nội dung, địa điểm vi phạm quy tắc cộng đồng': `${t(
    'sweet.location.community_rules'
  )}`,
  'Địa điểm vi phạm quyền bản quyền và được báo cáo từ Cộng đồng': `${t(
    'sweet.location.license'
  )}`,
});

export const getLocationFormatAddress = (value: any) => {
  const address = [
    value?.number,
    value?.street,
    value?.ward,
    value?.district,
    value?.city,
    value?.country,
  ]
    ?.filter((items: any) => !!items && items)
    .join(', ');
  return address;
};

export const getTitleHeaderLocationView = (type: string) => {
  switch (type) {
    case LOCATION_POST_TYPE.POST:
      return t('location.detail.list_posts');
    case LOCATION_POST_TYPE.ACTIVITY:
      return t('location.detail.list_activity');
    case LOCATION_POST_TYPE.RANKING:
      return t('location.detail.list_ranking');
    case LOCATION_POST_TYPE.REPORT:
      return t('location.detail.list_report');
    default:
      return null;
  }
};
