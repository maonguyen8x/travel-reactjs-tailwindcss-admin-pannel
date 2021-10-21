import { DASHBOARD_TYPES } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getPostSelectOption,
} from 'app/utils';

export default {
  LOCK_ACTIVITY: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.ACTIVITY, getPostSelectOption());
  },

  UN_LOCK_ACTIVITY: (props: any) => (id: number) => {
    const { lockActivity } = props;
    showConfirmUnLockPopup(lockActivity, id, DASHBOARD_TYPES.ACTIVITY);
  },
};
