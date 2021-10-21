import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_FACILITY: ({ history }: any) => () => {
    history.push(ROUTERS.FACILITY_ADD);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListFacility(customFilter);
  },
};
