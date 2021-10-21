import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('stay.title'),
  breadcrumb: t('breadcrunb.detail'),
  id: props?.match.params.id,
});

export { configContainer };
