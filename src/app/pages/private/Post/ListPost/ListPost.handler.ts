import { DASHBOARD_TYPES, ROUTERS } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getPostSelectOption,
} from 'app/utils';

export default {
  ON_ADD_POSTS: ({ history }: any) => () => {
    history.push(ROUTERS.POST_ADD);
  },

  LOCK_POST: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.POST, getPostSelectOption());
  },

  UN_LOCK_POST: (props: any) => (id: number) => {
    const { lockPost } = props;
    showConfirmUnLockPopup(lockPost, id, DASHBOARD_TYPES.POST);
  },
};
