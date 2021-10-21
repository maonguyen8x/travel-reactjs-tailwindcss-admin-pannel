import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('roles.title'),
  breadcrumb: t('breadcrumb.role'),
  id: props?.match.params.id,
});

export { configContainer };
