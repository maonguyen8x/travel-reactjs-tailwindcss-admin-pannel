import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  isCard: true,
  onSubmit: props?.handleSubmit,
  title: t('post.title'),
  breadcrumb: t('add.post'),
  isLoading: props?.isSubmitting,
  titleMarginTop: 50,
});

export { configContainer };
