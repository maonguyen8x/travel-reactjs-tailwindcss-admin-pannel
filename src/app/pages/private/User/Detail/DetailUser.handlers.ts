import { DASHBOARD_TYPES } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getSelectOption,
} from 'app/utils';

export default {
  LOCK_USER: (props: any) => () => {
    const { match } = props;
    const id = match?.params?.id;
    showConfirmLockPopup(id, DASHBOARD_TYPES.USER, getSelectOption());
  },

  UN_LOCK_USER: (props: any) => () => {
    const { match, lockUser } = props;
    const id = match?.params?.id;
    showConfirmUnLockPopup(lockUser, id, DASHBOARD_TYPES.USER, true);
  },
};
