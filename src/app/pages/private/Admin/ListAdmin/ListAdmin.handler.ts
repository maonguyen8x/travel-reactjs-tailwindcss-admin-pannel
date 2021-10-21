import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_ADMIN: ({ history }: any) => () => {
    history.push(ROUTERS.ADMIN_ADD);
  },
};
