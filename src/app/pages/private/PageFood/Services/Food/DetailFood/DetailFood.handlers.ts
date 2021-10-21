import { DASHBOARD_TYPES } from 'app/constants';
import {
  getPageSelectOption,
  showConfirmLockPopup,
  showConfirmUnLockPopup,
} from 'app/utils';

export default {
  LOCK_FOOD: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.PAGE, getPageSelectOption());
  },

  UN_LOCK_FOOD: (props: any) => (id: number) => {
    const { lockPage } = props;
    showConfirmUnLockPopup(lockPage, id, DASHBOARD_TYPES.PAGE, true);
  },
};
