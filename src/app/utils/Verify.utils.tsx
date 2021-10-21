import {
  REPORT_STATUS_TYPES,
  VERIFY_PAGE_STATUS_TYPES,
  VERIFY_PAGE_TYPES,
} from 'app/constants';
import { t } from 'app/i18n';

export const getTypesStatusVerifyPage = (type: string) => {
  switch (type) {
    case VERIFY_PAGE_STATUS_TYPES.REQUESTED:
      return (
        <span className="text-yellow-500 font-medium">
          {t('change_request.status.requested')}
        </span>
      );
    case VERIFY_PAGE_STATUS_TYPES.COMPLETED:
      return (
        <span className="text-gray-500 font-medium">
          {t('change_request.status.accepted')}
        </span>
      );
    case VERIFY_PAGE_STATUS_TYPES.REJECT:
      return (
        <span className="text-red-400 font-medium">
          {t('change_request.status.rejected')}
        </span>
      );
    default:
      return '';
  }
};

export const getTypesVerifyPage = (type: string) => {
  switch (type) {
    case VERIFY_PAGE_TYPES.IDENTITY_CARD:
      return t('verify.card');
    case VERIFY_PAGE_TYPES.PASSPORT:
      return t('verify.passport');
    default:
      return '';
  }
};

export const getFieldVerify = () => [
  {
    id: 'fullName',
    name: t('verify.name'),
    show: true,
  },
  {
    id: 'status',
    name: t('verify.status'),
    show: true,
  },
  {
    id: 'identityType',
    name: t('verify.type'),
    show: true,
  },
  {
    id: 'identityCode',
    name: t('verify.code'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('verify.created'),
    show: true,
  },
];

export const getInformationVerify = (data: any) => {
  const DATA = [
    {
      key: t('verify.owner'),
      value: data?.fullName,
    },
    {
      key: t('verify.id_number'),
      value: data?.identityCode,
    },
    {
      key: t('verify.nationality'),
      value: data?.nationality,
    },
    {
      key: t('verify.company_name'),
      value: data?.enterpriseName,
    },
  ];
  return DATA;
};

export const getVerifyStatus = () => [
  {
    name: t('verify.pending'),
    value: REPORT_STATUS_TYPES.PENDING,
  },
  {
    name: t('verify.wait_processing'),
    value: REPORT_STATUS_TYPES.WAITING_FOR_PROCESSING,
  },
  {
    name: t('verify.completed'),
    value: REPORT_STATUS_TYPES.CLOSED,
  },
];
