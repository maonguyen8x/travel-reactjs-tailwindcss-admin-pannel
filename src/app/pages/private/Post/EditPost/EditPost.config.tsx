import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSave: props?.handleSubmit,
  title: t('APP.POST.TITLE'),
  breadcrumb: t('APP.ACTION.EDIT'),
  id: props?.match.params.id,
  isLoading: props?.isSubmitting,
  tabTitle: t('tabs.title.posts'),
});

export { configContainer };
