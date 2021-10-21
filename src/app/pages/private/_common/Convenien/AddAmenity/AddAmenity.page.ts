import { compose, withHandlers } from 'recompose';
import { withFormik } from 'formik';
import { FormikBag } from 'formik';
import AddAmenityView from './AddAmenity.view';
import { mapPropsToValues, validationSchema } from './AddAmenity.form.config';
import handlers from './AddAmenity.handler';
import { IValues } from './AddAmenity.type';

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_AMENITY } = formikBag.props;

    CREATE_AMENITY(values);
  },
};

const enhancer = compose<any, any>(
  withHandlers(handlers),
  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(AddAmenityView);
