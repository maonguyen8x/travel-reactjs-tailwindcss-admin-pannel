import { ROUTERS } from 'app/constants';

export default {
  ON_ADD_BACKGROUND_POST: ({ history }: any) => () => {
    history.push(ROUTERS.ADD_BACKGROUND_POST);
  },
};
