import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_CATEGORY_FACILITY: ({ history }: any) => () => {
    history.push(ROUTERS.ADD_CATEGORY_FACILITY);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListCategoryFacility(customFilter);
  },
};
