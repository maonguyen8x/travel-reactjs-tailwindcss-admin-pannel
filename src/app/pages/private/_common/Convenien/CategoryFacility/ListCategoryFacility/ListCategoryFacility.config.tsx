import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.LIST_CATEGORY_FACILITY.TITLE'),
  onAdd: props?.ON_ADD_CATEGORY_FACILITY,
  buttonAdd: t('APP.BUTTON_FORM.ADD_CATEGORY_FACILITY'),
  onSearch: props?.ON_SEARCH,
});

export { configContainer };
