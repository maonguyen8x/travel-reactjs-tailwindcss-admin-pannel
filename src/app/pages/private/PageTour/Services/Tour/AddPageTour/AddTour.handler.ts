import SweetAlert from 'app/components/SweetAlert';
import { ROUTERS, TRAVEL_TYPES } from 'app/constants';
import { t } from 'app/i18n';
import { toNumber } from 'app/utils';
import Swal from 'sweetalert2';
import { IValues } from './AddTour.type';
import { createPageTour } from './service';

export default {
  CREATE_TOUR: (props: any) => (values: IValues) => {
    Swal.showLoading();
    createPageTour({
      type: TRAVEL_TYPES.TOUR,
      name: values.name,
      email: values?.email,
      phone: values?.phone,
      location: {
        coordinates: values?.coordinates,
        latitude: toNumber(values?.lat),
        longitude: toNumber(values?.lng),
        formatedAddress: values?.formatedAddress,
        address: values?.formatedAddress,
        country: values.country,
        areaLevel1: values.city,
        areaLevel2: values.district,
        areaLevel3: values?.ward,
        areaLevel4: values?.street,
        areaLevel5: values?.number,
      },
    }).then((res) => {
      if (res && !res?.dismiss) {
        SweetAlert.toastSuccess(t('sweet.message.create_tour.success')).then(
          () => {
            props?.history?.push(ROUTERS.LIST_TOUR);
          }
        );
      }
    });
  },
};
