import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.BOOKING_STAY.TITLE'),
  breadcrumb: t('APP.ACTION.DETAIL'),
  id: props?.match.params.id,
});

export { configContainer };
