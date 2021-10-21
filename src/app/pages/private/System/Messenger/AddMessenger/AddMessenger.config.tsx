import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('message.title'),
  breadcrumb: t('breadcrumb.add'),
  isLoading: props?.fetching,
  tabTitle: t('message.title_list'),
});

export { configContainer };
