import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  breadcrumb: t('breadcrumb.change_location'),
  title: t('change_request.title'),
  subTitle: props?.match.params.id,
  tabTitle: t('tabs.title.change_location'),
});

export { configContainer };
