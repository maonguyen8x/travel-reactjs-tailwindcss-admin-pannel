import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.POLICY.TITLE'),
  breadcrumb: t('APP.ACTION.EDIT'),
  subTitle: props?.match.params.id,
  isLoading: props?.isSubmitting,
  onSave: props?.handleSubmit,
});

export { configContainer };
