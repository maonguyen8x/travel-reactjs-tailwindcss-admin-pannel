import * as Yup from 'yup';
import { t } from 'app/i18n';

const mapPropsToValues = () => ({
  alias: '',
  content: '<p></p>',
});

const validationSchema = Yup.object().shape({
  content: Yup.string().min(20).required(t('APP.POLICY.REQUIRED.CONTENT')),
  alias: Yup.string().required(t('APP.POLICY.REQUIRED.ALIAS')),
});

export { mapPropsToValues, validationSchema };
