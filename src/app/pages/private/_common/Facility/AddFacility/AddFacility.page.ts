import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import FacilityActions from 'app/store/redux/FacilityRedux';
import { FormikBag } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import AddFacilityView from './AddFacility.view';
import { mapPropsToValues, validationSchema } from './AddFacility.form.config';
import handlers from './AddFacility.handler';
import { IValues } from './AddFacility.type';

const mapStateToProps = (state: IReduxStates) => ({
  token: state.app.token,
});

const mapPropsToDispatch = (dispatch: any) => ({
  createFacility: (facility: any) =>
    dispatch(FacilityActions.createFacilityRequest(facility)),
});

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_FACILITY } = formikBag.props;

    CREATE_FACILITY(values);
  },
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(AddFacilityView);
