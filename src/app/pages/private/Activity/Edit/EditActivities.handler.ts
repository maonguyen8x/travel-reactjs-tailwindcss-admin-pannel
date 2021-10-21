import { toNumber } from 'app/utils';
import moment from 'moment';
import Swal from 'sweetalert2';
import SweetAlert from 'app/components/SweetAlert';
import { IValues } from './EditActivities.type';

export default {
  EDIT_ACTIVITIES: (props: any) => (values: IValues) => {
    Swal.showLoading();
    try {
      const { activityDetail, editActivity } = props;
      const { id } = activityDetail;
      editActivity(id, {
        locationId: values.locationId,
        name: values.name,
        price: toNumber(values?.price),
        from: moment
          .utc(`${values?.startDay} ${values.fromHour}`)
          .toISOString(),
        to: moment.utc(`${values?.endDay} ${values.toHour}`).toISOString(),
        introduction: values.introduction,
        mediaContents: values.files,
      });
    } catch (e) {
      SweetAlert.toastError(e?.message);
    }
  },
};
