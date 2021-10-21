import { compose, withHandlers } from 'recompose';
import { FormikBag, withFormik } from 'formik';
import AddLocationView from './AddActivity.view';
import { mapPropsToValues, validationSchema } from './AddActivity.form.config';
import handlers from './AddActivity.handler';
import { IValues } from './AddActivity.type';

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, any>): void => {
    const { CREATE_ACTIVITY } = formikBag?.props;

    CREATE_ACTIVITY(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddLocationView);
