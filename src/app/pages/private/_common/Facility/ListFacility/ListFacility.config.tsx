import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.LIST_FACILITY.TITLE'),
  onAdd: props?.ON_ADD_FACILITY,
  buttonAdd: t('APP.BUTTON_FORM.ADD_FACILITY'),
  onSearch: props?.ON_SEARCH,
});

export { configContainer };
