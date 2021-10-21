import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('message.title'),
  onAdd: props?.ON_ADD_MESSENGER,
  buttonAdd: t('add.message'),
  isCard: true,
  titleMarginTop: 60,
});

export { configContainer };
