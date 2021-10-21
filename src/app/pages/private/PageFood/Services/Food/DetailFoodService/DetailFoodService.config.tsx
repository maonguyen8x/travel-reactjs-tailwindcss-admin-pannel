import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.PAGE.SERVICE_FOOD.TITLE_DETAIL'),
  breadcrumb: t('APP.ACTION.DETAIL'),
  id: props?.match.params.id,
});

export { configContainer };
