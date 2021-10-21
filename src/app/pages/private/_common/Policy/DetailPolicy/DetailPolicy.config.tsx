import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.POLICY.TITLE'),
  breadcrumb: t('APP.POLICY_TITLE_DETAIL'),
  id: props?.match.params.id,
});

export { configContainer };
