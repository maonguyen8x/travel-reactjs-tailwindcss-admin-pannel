import { DASHBOARD_TYPES, ROUTERS } from 'app/constants';
import {
  getPageSelectOption,
  showConfirmLockPopup,
  showConfirmUnLockPopup,
} from 'app/utils';

export default {
  ON_FOOD_ADD: ({ history }: any) => () => {
    history.push(ROUTERS.FOOD_ADD);
  },
  LOCK_PAGE: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.PAGE, getPageSelectOption());
  },

  UN_LOCK_PAGE: (props: any) => (id: number) => {
    const { lockPage } = props;
    showConfirmUnLockPopup(lockPage, id, DASHBOARD_TYPES.PAGE);
  },
};
