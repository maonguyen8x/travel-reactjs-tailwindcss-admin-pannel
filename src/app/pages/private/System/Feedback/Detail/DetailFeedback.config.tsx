import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('feedback.title_list'),
  breadcrumb: t('breadcrumb.detail'),
  id: props?.match.params.id,
  tabTitle: t('feedback.title'),
});

export { configContainer };
