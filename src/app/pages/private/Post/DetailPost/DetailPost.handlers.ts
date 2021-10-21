import { DASHBOARD_TYPES, ROUTERS } from 'app/constants';
import {
  showConfirmLockPopup,
  showConfirmUnLockPopup,
  getPostSelectOption,
} from 'app/utils';

export default {
  LOCK_POST: () => async (id: number) => {
    showConfirmLockPopup(id, DASHBOARD_TYPES.POST, getPostSelectOption());
  },

  UN_LOCK_POST: (props: any) => (id: number) => {
    const { lockPost } = props;
    showConfirmUnLockPopup(lockPost, id, DASHBOARD_TYPES.POST, true);
  },

  ON_VIEW_SOURCE_POST: (props: any) => () => {
    const { history, postDetail } = props;
    history.push(
      ROUTERS.POST_DETAIL.replace(':id', postDetail?.sourcePost?.id)
    );
  },
  ON_VIEW_SOURCE_PLAN: (props: any) => () => {
    const { history, planDetail } = props;
    history.push(ROUTERS.PLAN_DETAIL.replace(':id', planDetail?.id));
  },
};
