import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSave: props?.handleSubmit,
  title: t('MENU.LIST_CATEGORY_AMENITY'),
  breadcrumb: t('APP.CATEGORY.TITLE_ADD'),
  isLoading: props?.fetching,
});

export { configContainer };
