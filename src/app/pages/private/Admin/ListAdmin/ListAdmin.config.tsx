import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('admin.decentralization'),
  onAdd: props?.ON_ADD_ADMIN,
  buttonAdd: t('add.user'),
});

export { configContainer };
