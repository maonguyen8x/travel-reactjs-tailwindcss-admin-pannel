import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSave: props?.handleSubmit,
  title: t('APP.PROFILE'),
  breadcrumb: t('APP.PROFILE_UPDATE'),
  id: props?.match.params.id,
  isLoading: props?.isSubmitting,
});

export { configContainer };
