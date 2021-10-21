import { t } from 'app/i18n';
import * as Yup from 'yup';
import { COORDINATES } from '../../../../constants';

const mapPropsToValues = () => ({
  name: '',
  country: '',
  location: '',
  city: '',
  district: '',
  ward: '',
  street: '',
  number: '',
  address: '',
  lat: COORDINATES.lat,
  lng: COORDINATES.lng,
  ranking: '',
  averagePoint: 0,
  files: [],
  content: '',
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  district: Yup.string().required(),
  ward: Yup.string().required(),
  content: Yup.string().required(),
  files: Yup.array()
    .test(
      'empty-check',
      t('required.media_content'),
      (file) => Number(file) !== 0
    )
    .nullable(),
  lat: Yup.string().required(),
  lng: Yup.string().required(),
  averagePoint: Yup.number().min(1).required(),
});

export { mapPropsToValues, validationSchema };
