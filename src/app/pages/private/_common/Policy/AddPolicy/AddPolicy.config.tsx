import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSubmit: props?.handleSubmit,
  title: t('APP.POLICY.TITLE'),
  breadcrumb: t('APP.ACTION.ADD'),
  isLoading: props?.isSubmitting,
});

export { configContainer };
