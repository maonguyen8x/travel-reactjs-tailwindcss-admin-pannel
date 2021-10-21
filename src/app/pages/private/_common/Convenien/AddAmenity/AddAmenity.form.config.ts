import * as Yup from 'yup';
import { t } from 'app/i18n';

const mapPropsToValues = ({ match }: any) => ({
  amenityVi: '',
  amenityEn: '',
  amenityCategoryId: match.params.id,
  files: [],
});

const validationSchema = Yup.object().shape({
  amenityVi: Yup.string().required(t('APP.AMENITY.VIETNAM')),
  amenityEn: Yup.string().required(t('APP.AMENITY.ENGLISH')),
  amenityCategoryId: Yup.string().required('Amenity Category Id is required!'),
});

export { mapPropsToValues, validationSchema };
