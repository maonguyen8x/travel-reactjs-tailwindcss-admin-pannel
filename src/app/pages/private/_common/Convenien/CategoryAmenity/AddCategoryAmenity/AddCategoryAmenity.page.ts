import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import CategoryAmenityActions from 'app/store/redux/CategoryAmenityRedux';
import { FormikBag } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import AddCategoryAmenityView from './AddCategoryAmenity.view';
import {
  mapPropsToValues,
  validationSchema,
} from './AddCategoryAmenity.form.config';
import handlers from './AddCategoryAmenity.handler';
import { IValues } from './AddCategoryAmenity.type';

const mapStateToProps = (state: IReduxStates) => ({
  token: state.app.token,
});

const mapPropsToDispatch = (dispatch: any) => ({
  createCategoryAmenity: (categoryAmenity: any) =>
    dispatch(
      CategoryAmenityActions.createCategoryAmenityRequest(categoryAmenity)
    ),
});

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_AMENITY_CATEGORY } = formikBag.props;

    CREATE_AMENITY_CATEGORY(values);
  },
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(AddCategoryAmenityView);
