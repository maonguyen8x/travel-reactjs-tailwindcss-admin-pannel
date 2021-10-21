import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('report.title'),
  onSearch: props?.ON_SEARCH,
  tabTitle: t('tabs.title.report'),
});

export { configContainer };
