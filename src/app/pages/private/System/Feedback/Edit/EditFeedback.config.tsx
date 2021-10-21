import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: t('APP.FEEDBACK.TITLE'),
  breadcrumb: t('APP.ACTION.EDIT'),
  id: props?.match.params.id,
});

export { configContainer };
