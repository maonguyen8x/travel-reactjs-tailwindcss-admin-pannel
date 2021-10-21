import * as Yup from 'yup';
import { t } from 'app/i18n';
import { ACCESS_TYPES } from 'app/constants';

const mapPropsToValues = () => ({
  accessType: ACCESS_TYPES.PUBLIC,
  content: '',
  files: [],
  locationId: null,
});

const validationSchema = Yup.object().shape({
  accessType: Yup.string().required(t('required.content')),
  content: Yup.string().required(t('required.content')),
  files: Yup.array()
    .test(
      'empty-check',
      t('required.media_content'),
      (file) => Number(file) !== 0
    )
    .nullable(),
  locationId: Yup.number()
    .typeError(t('required.location'))
    .required(t('required.location')),
});

export { mapPropsToValues, validationSchema };
