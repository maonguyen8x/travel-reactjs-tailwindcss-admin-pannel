import API from 'app/services/Api';
import { pathOr } from 'ramda';
import SweetAlert from 'app/components/SweetAlert';
import { IValues } from './EditCategoryAmenity.type';

export default {
  EDIT_CATEGORY_AMENITY: (props: any) => async (values: IValues) => {
    const { match, history } = props;
    const amenityCategoryId = match?.params?.id;

    const res = await API.editCategoryAmenity(amenityCategoryId, {
      name: {
        en: values.AmenityEn,
        vi: values.AmenityVi,
      },
    });

    if (res.ok) {
      SweetAlert.success('Edit catogery amenity successfully');
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], res);
      SweetAlert.error(message);
    }
  },
};
