import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('user.title'),
  breadcrumb: '#150511 username',
  subTitle: t('plan.title_list'),
  id: props?.planDetail?.id,
  tabTitle: t('plan.title'),
});

export { configContainer };
