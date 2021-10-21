import { ROUTERS } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';

export default {
  ON_ADD_CATEGORY_AMENITY: ({ history }: any) => () => {
    history.push(ROUTERS.ADD_CATEGORY_AMENITY);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListCategoryAmenity(customFilter);
  },
  ON_DETAIL: (props: any) => (amenityId: string) => {
    props.history.push(ROUTERS.LIST_AMENITY.replace(':id', amenityId));
  },

  ON_EDIT: (props: any) => (amenityId: string) => {
    props.history.push(ROUTERS.EDIT_CATEGORY_AMENITY.replace(':id', amenityId));
  },

  ON_DELETE: (props: any) => (amenityId: string) => {
    SweetAlert.confirm(t('APP.TABLE.DELETE'), t('APP.TABLE.ANWSER'), () =>
      props?.deleteCategoryAmenity(amenityId)
    );
  },
};
