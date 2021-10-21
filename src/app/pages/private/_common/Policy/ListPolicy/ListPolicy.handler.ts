import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_POLICY: ({ history }: any) => () => {
    history.push(ROUTERS.POLICY_ADD);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListPolicy(customFilter);
  },
};
