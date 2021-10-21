import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSubmit: props?.handleSubmit,
  title: t('MENU.LIST_CATEGORY_FACILITY'),
  breadcrumb: t('APP.CATEGORY.TITLE_ADD'),
  isLoading: props?.fetching,
});

export { configContainer };
