import { ROUTERS } from 'app/constants';
import { DASHBOARD_TYPES } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getPostSelectOption,
} from 'app/utils';

export default {
  ON_LIST_JOIN: (props: any) => () => {
    const { id } = props?.match?.params;
    props.history.push(ROUTERS.ACTIVITY_PARTICIPANTS.replace(':id', id));
  },

  LOCK_ACTIVITY: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.ACTIVITY, getPostSelectOption());
  },

  UN_LOCK_ACTIVITY: (props: any) => (id: number) => {
    const { lockActivity } = props;
    showConfirmUnLockPopup(lockActivity, id, DASHBOARD_TYPES.ACTIVITY, true);
  },
};
