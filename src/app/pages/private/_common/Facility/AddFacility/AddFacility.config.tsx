import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSubmit: props?.handleSubmit,
  title: t('APP.FACILITY.ADD'),
  breadcrumb: t('APP.FACILITY.TITLE_ADD'),
  isLoading: props?.fetching,
});

export { configContainer };
