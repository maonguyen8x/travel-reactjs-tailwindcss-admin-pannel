import { DASHBOARD_TYPES } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getLocationSelectOption,
} from 'app/utils';

export default {
  LOCK_LOCATION: () => async (id: number) => {
    showConfirmLockPopup(
      id,
      DASHBOARD_TYPES.LOCATION,
      getLocationSelectOption()
    );
  },

  UN_LOCK_LOCATION: (props: any) => (id: number) => {
    const { lockLocation } = props;
    showConfirmUnLockPopup(lockLocation, id, DASHBOARD_TYPES.LOCATION);
  },
};
