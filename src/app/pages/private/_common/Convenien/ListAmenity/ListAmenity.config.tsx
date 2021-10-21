import { t } from 'app/i18n';

const configContainer = (props: any) => ({
  title: 'List Amenity',
  onAdd: props?.ON_ADD_AMENITY,
  buttonAdd: 'Add Amenity',
  onSearch: props?.ON_SEARCH,
});

export { configContainer };
