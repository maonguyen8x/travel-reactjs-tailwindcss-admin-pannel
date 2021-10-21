import { checkStatusApi, upLoadIcon } from 'app/utils';
import SweetAlert from 'app/components/SweetAlert';
import { pathOr } from 'ramda';
import Api from 'app/services/Api';
import { IValues } from './AddAmenity.type';

export default {
  CREATE_AMENITY: (props: any) => async (values: IValues) => {
    const { match, history } = props;
    const { files, amenityEn, amenityVi } = values;
    const amenityCategoryId = match.params.id;

    const icon = await upLoadIcon(files);
    const res = await Api.createAmenity({
      amenityCategoryId: Number(amenityCategoryId),
      name: {
        en: amenityEn,
        vi: amenityVi,
      },
      icon,
    });

    if (checkStatusApi(res)) {
      SweetAlert.success('Create amenity successfully');
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], res);
      SweetAlert.error(message);
    }
  },
};
