import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSave: props?.handleSubmit,
  title: 'Edit Amenity',
  breadcrumb: t('APP.CATEGORY.TITLE_ADD'),
  isLoading: props?.fetching,
});

export { configContainer };
