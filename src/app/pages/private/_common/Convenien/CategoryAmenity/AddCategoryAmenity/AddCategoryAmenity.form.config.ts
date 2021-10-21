import * as Yup from 'yup';
import { t } from 'app/i18n';

const mapPropsToValues = () => ({
  AmenityVi: '',
  AmenityEn: '',
});

const validationSchema = Yup.object().shape({
  AmenityVi: Yup.string().required(t('APP.AMENITY.VIETNAM')),
  AmenityEn: Yup.string().required(t('APP.AMENITY.ENGLISH')),
});

export { mapPropsToValues, validationSchema };
