import * as Yup from 'yup';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';

const mapPropsToValues = (props: any) => {
  const amenityVi = pathOr('', ['data', 'name', 'vi'], props);
  const amenityEn = pathOr('', ['data', 'name', 'en'], props);
  const amenityCategoryId = pathOr('', ['data', 'amenityCategoryId'], props);
  const icon = pathOr([], ['data', 'icon'], props);

  const mediaContents = [icon];

  return {
    amenityVi,
    amenityEn,
    amenityCategoryId,
    files: mediaContents,
  };
};

const validationSchema = Yup.object().shape({
  amenityVi: Yup.string().required(t('APP.AMENITY.VIETNAM')),
  amenityEn: Yup.string().required(t('APP.AMENITY.ENGLISH')),
  amenityCategoryId: Yup.string().required('Amenity Category Id is required!'),
});

export { mapPropsToValues, validationSchema };
