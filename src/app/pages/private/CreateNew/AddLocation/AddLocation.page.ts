import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { FormikBag } from 'formik';
import { withFormik } from 'formik';
import LocationActions from '../../../../store/redux/LocationRedux';
import AddLocationView from './AddLocation.view';
import { mapPropsToValues, validationSchema } from './AddLocation.form.config';
import handlers from './AddLocation.handler';
import { IValues } from './AddLocation.type';

const mapPropsToDispatch = (dispatch: any) => ({
  createLocation: (location: any) =>
    dispatch(LocationActions.createLocationRequest(location)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_LOCATION } = formikBag?.props;

    CREATE_LOCATION(values);
  },
};

const enhancer = compose<any, any>(
  connect(null, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddLocationView);
