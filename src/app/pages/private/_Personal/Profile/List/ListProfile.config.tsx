import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('profile'),
  onUpdate: props?.ON_UPDATE_PROFILE,
});

export { configContainer };
