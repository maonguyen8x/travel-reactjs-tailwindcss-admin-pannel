import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('MENU.LIST_CATEGORY_AMENITY'),
  onAdd: props?.ON_ADD_CATEGORY_AMENITY,
  buttonAdd: t('APP.BUTTON_FORM.ADD_CATEGORY_AMENITY'),
  onSearch: props?.ON_SEARCH,
});

export { configContainer };
