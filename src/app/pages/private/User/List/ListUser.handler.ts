import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_USER: ({ history }: any) => () => {
    history.push(ROUTERS.USER_ADD);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter
    };
    props?.getUserList(customFilter);
  }
};
