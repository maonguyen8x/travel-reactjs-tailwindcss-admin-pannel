import SweetAlert from 'app/components/SweetAlert';
import { upLoadIcon } from 'app/utils';
import { pathOr } from 'ramda';
import Api from 'app/services/Api';
import { IValues } from './EditAmenity.type';

export default {
  EDIT_AMENITY: (props: any) => async (values: IValues) => {
    const { match, history } = props;
    const { files, amenityEn, amenityVi, amenityCategoryId } = values;
    const id = match?.params?.id;

    const icon = await upLoadIcon(files);
    const res = await Api.editAmenity(id, {
      amenityCategoryId: Number(amenityCategoryId),
      name: {
        en: amenityEn,
        vi: amenityVi,
      },
      icon,
    });

    if (res.ok) {
      SweetAlert.success('Create amenity successfully');
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], res);
      SweetAlert.error(message);
    }
  },
};
