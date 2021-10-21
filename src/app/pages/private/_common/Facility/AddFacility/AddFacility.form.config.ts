import * as Yup from 'yup';
import { t } from 'app/i18n';

const mapPropsToValues = () => ({
  FacilityVi: '',
  FacilityEn: '',
});

const validationSchema = Yup.object().shape({
  FacilityVi: Yup.string().required(t('APP.FACILITY.VIETNAM')),
  FacilityEn: Yup.string().required(t('APP.FACILITY.ENGLISH')),
});

export { mapPropsToValues, validationSchema };
