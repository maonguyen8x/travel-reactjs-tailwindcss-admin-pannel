import * as Yup from 'yup';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';

const mapPropsToValues = (props: any) => {
  const AmenityVi = pathOr('', ['data', 'name', 'vi'], props);
  const AmenityEn = pathOr('', ['data', 'name', 'en'], props);

  return {
    AmenityVi,
    AmenityEn,
  };
};

const validationSchema = Yup.object().shape({
  AmenityVi: Yup.string().required(t('APP.AMENITY.VIETNAM')),
  AmenityEn: Yup.string().required(t('APP.AMENITY.ENGLISH')),
});

export { mapPropsToValues, validationSchema };
