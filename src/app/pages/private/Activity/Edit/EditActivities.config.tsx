import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSave: props?.handleSubmit,
  title: t('APP.ACTIVITIES.TITLE'),
  breadcrumb: t('APP.ACTION.EDIT'),
  subTitle: props?.match?.params?.id,
  isLoading: props?.isLoading,
});

export { configContainer };
