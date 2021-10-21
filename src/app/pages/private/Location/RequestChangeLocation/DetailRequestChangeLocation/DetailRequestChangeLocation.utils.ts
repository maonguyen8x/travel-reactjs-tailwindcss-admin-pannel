import { t } from 'app/i18n';
import { equals } from 'ramda';

export const DATA_NEW_LOCATION = (requestChangeLocationDetail: any) => [
  {
    value: requestChangeLocationDetail?.name,
    label: t('change_location.name'),
    changed: !equals(
      requestChangeLocationDetail?.name,
      requestChangeLocationDetail?.location?.name
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.country,
    label: t('change_location.country'),
    changed: !equals(
      requestChangeLocationDetail?.country,
      requestChangeLocationDetail?.location?.country
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.areaLevel2,
    label: t('change_location.city'),
    changed: !equals(
      requestChangeLocationDetail?.areaLevel2,
      requestChangeLocationDetail?.location?.areaLevel2
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.areaLevel1,
    label: t('change_location.district'),
    changed: !equals(
      requestChangeLocationDetail?.areaLevel1,
      requestChangeLocationDetail?.location?.areaLevel1
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.areaLevel3,
    label: t('change_location.ward'),
    changed: !equals(
      requestChangeLocationDetail?.areaLevel3,
      requestChangeLocationDetail?.location?.areaLevel3
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.areaLevel4,
    label: t('change_location.street'),
    changed: !equals(
      requestChangeLocationDetail?.areaLevel4,
      requestChangeLocationDetail?.location?.areaLevel4
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.areaLevel5,
    label: t('change_location.house_number'),
    changed: !equals(
      requestChangeLocationDetail?.areaLevel5,
      requestChangeLocationDetail?.location?.areaLevel5
    )
      ? 'changed'
      : '',
  },
  {
    value: requestChangeLocationDetail?.formatedAddress,
    label: t('change_location.address'),
    changed: !equals(
      requestChangeLocationDetail?.formatedAddress,
      requestChangeLocationDetail?.location?.formatedAddress
    )
      ? 'changed'
      : '',
  },
];

export const DATA_CURRENT_LOCATION = (requestChangeLocationDetail: any) => [
  {
    value: requestChangeLocationDetail?.location?.name,
    label: t('change_location.name'),
  },
  {
    value: requestChangeLocationDetail?.location?.country,
    label: t('change_location.country'),
  },
  {
    value: requestChangeLocationDetail?.location?.areaLevel2,
    label: t('change_location.city'),
  },
  {
    value: requestChangeLocationDetail?.location?.areaLevel1,
    label: t('change_location.district'),
  },
  {
    value: requestChangeLocationDetail?.location?.areaLevel3,
    label: t('change_location.ward'),
  },
  {
    value: requestChangeLocationDetail?.location?.areaLevel4,
    label: t('change_location.street'),
  },
  {
    value: requestChangeLocationDetail?.location?.areaLevel5,
    label: t('change_location.house_number'),
  },
  {
    value: requestChangeLocationDetail?.location?.formatedAddress,
    label: t('change_location.address'),
  },
];
