import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('report.title'),
  breadcrumb: t('breadcrumb.detail'),
  id: props?.match.params.id,
  tabTitle: t('tabs.title.report'),
});

export { configContainer };
