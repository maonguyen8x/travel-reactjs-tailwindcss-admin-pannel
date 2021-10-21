import SweetAlert from 'app/components/SweetAlert';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { toNumber } from 'app/utils';
import { history } from 'app/services/History';
import Swal from 'sweetalert2';
import { editLocation } from './service';

export default {
  EDIT_LOCATION: (props: any) => async (values: any) => {
    Swal.showLoading();
    const { locationDetail, match } = props;
    const id = match?.params?.id;
    const res: any = await editLocation(id, {
      userId: locationDetail?.userId,
      latitude: toNumber(values?.lat),
      longitude: toNumber(values?.lng),
      name: values.name,
      country: values.country,
      areaLevel1: values.city,
      areaLevel2: values.district,
      areaLevel3: values?.ward,
      areaLevel4: values?.street || '',
      areaLevel5: values?.number || '',
      rankingPoint: values?.averagePoint,
      locationType: locationDetail?.locationType,
    });

    if (res?.ok && res?.status === 200) {
      SweetAlert.toastSuccess(t('location.updated_success')).then(() => {
        history.push(ROUTERS.LIST_LOCATION);
      });
    } else {
      SweetAlert.error(res?.data?.error?.message);
    }
  },
};
