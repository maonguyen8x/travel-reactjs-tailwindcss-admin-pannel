import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  onSubmit: props?.handleSubmit,
  title: 'Add Amenity',
  breadcrumb: t('APP.CATEGORY.TITLE_ADD'),
  isLoading: props?.fetching,
});

export { configContainer };
