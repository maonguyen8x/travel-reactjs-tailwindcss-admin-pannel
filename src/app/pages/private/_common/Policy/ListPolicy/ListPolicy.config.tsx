import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.POLICY.TITLE'),
  onAdd: props?.ON_ADD_POLICY,
  buttonAdd: t('APP.BUTTON_FORM.ADD_POLICY'),
  onSearch: props?.ON_SEARCH,
});

export { configContainer };
