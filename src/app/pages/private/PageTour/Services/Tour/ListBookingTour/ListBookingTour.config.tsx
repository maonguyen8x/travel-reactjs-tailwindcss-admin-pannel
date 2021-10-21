import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.BOOKING_TOUR.TITLE'),
  onSearch: props?.ON_SEARCH,
  id: props?.match.params.id,
});

export { configContainer };
