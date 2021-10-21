import { changeStatus } from './service';

export default {
  CHANGE_STATUS: (props: any) => (values: any) => {
    const id = props?.match?.params?.id;
    changeStatus(id, values);
  },
};
