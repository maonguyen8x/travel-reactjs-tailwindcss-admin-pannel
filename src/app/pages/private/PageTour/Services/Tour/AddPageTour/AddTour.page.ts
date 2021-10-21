import { compose, withHandlers } from 'recompose';
import { withFormik, FormikBag } from 'formik';
import { connect } from 'react-redux';
import FoodActions from 'app/store/redux/FoodRedux';
import AddFoodView from './AddTour.view';
import handlers from './AddTour.handler';
import { mapPropsToValues, validationSchema } from './AddTour.form.config';
import { IValues } from './AddTour.type';

const mapPropsToDispatch = (dispatch: any) => ({
  createTour: (food: any) => dispatch(FoodActions.createFoodRequest(food)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_TOUR } = formikBag.props;

    CREATE_TOUR(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(null, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddFoodView);
