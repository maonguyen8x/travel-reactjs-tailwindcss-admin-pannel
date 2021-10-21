import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.BOOKING_TOUR.TITLE_DETAIL'),
  breadcrumb: t('APP.ACTION.DETAIL'),
  subTitle: props?.match.params.id,
});

export { configContainer };
