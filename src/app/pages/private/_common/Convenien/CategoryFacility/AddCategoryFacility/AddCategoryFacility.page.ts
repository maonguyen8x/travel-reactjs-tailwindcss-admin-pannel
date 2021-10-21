import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import CategoryFacilityActions from 'app/store/redux/CategoryFacilityRedux';
import { FormikBag } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import AddCategoryFacilityView from './AddCategoryFacility.view';
import {
  mapPropsToValues,
  validationSchema,
} from './AddCategoryFacility.form.config';
import handlers from './AddCategoryFacility.handler';
import { IValues } from './AddCategoryFacility.type';

const mapStateToProps = (state: IReduxStates) => ({
  token: state.app.token,
});

const mapPropsToDispatch = (dispatch: any) => ({
  createCategoryFacility: (categoryFacilities: any) =>
    dispatch(
      CategoryFacilityActions.createCategoryFacilityRequest(categoryFacilities)
    ),
});

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_FACILITY_CATEGORY } = formikBag.props;

    CREATE_FACILITY_CATEGORY(values);
  },
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(AddCategoryFacilityView);
