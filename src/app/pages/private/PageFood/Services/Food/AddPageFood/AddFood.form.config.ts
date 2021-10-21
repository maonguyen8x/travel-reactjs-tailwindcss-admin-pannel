import * as Yup from 'yup';
import { t } from 'app/i18n';
import { COORDINATES } from 'app/constants';

const mapPropsToValues = () => ({
  address: '',
  name: '',
  country: '',
  location: '',
  city: '',
  district: '',
  ward: '',
  street: '',
  numberHouse: '',
  coordinates: '',
  formatedAddress: '',
  lat: COORDINATES.lat,
  lng: COORDINATES.lng,
  phone: '',
  email: '',
});

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  district: Yup.string().required(),
  ward: Yup.string().required(),
  lat: Yup.number().required().typeError(t('validate.number')),
  lng: Yup.number().required().typeError(t('validate.number')),
  phone: Yup.string()
    .required()
    .matches(phoneRegExp, t('validate.number'))
    .min(9, t('number.short'))
    .max(12, t('number.long')),
  email: Yup.string().email().required(),
});

export { mapPropsToValues, validationSchema };
