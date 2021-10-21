import moment from 'moment';
import { upLoadImages, toNumber } from 'app/utils';
import { omit } from 'ramda';
import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';
import { ROUTERS } from 'app/constants';
import Swal from 'sweetalert2';
import { IValues } from './AddActivity.type';
import { createActivity } from './AddActivity.service';
import { EnhancedProps } from './AddActivity.view';

export default {
  CREATE_ACTIVITY: (props: EnhancedProps) => async (values: IValues) => {
    Swal.showLoading();
    try {
      const mediaContents = await upLoadImages(values?.files);
      const customMediaContents =
        mediaContents &&
        mediaContents?.map((items: any) => omit(['updatedAt'], items));
      const res: any = await createActivity({
        mediaContents: customMediaContents,
        name: values?.name,
        from: moment
          .utc(`${values?.startDate} ${values.fromHour}`)
          .toISOString(),
        to: moment.utc(`${values?.endDate} ${values.toHour}`).toISOString(),
        price: toNumber(values?.price),
        introduction: values?.introduce,
        currencyId: 1,
        locationId: values?.locationId,
      });

      if (res.ok && res.status === 200) {
        SweetAlert.toastSuccess(
          t('message.activity.created_success', () => {
            props?.history?.push(ROUTERS.LIST_ACTIVITY);
          })
        );

        return;
      }
      SweetAlert.error(res?.data?.error?.message);
    } catch (e) {
      SweetAlert.error(e?.message);
    }
  },
};
