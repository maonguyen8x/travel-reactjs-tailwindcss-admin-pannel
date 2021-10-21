import { ROUTERS } from 'app/constants';

export default {
  ON_UPDATE_PROFILE: ({ history }: any) => () => {
    history.push(ROUTERS.UPDATE_PROFILE);
  },
};
