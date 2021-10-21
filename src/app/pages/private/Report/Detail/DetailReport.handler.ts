import { ROUTERS } from 'app/constants';
import { onChangeStatus } from 'app/utils';
import { changeStatus } from './service';

export default {
  CHANGE_STATUS: (props: any) => (values: any) => {
    const id = props?.match?.params?.id;
    onChangeStatus(id, values, changeStatus, () =>
      props?.history?.push(ROUTERS.LIST_REPORT)
    );
  },
};
