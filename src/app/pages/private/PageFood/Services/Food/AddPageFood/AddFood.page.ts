import { compose, withHandlers } from 'recompose';
import { withFormik, FormikBag } from 'formik';
import { connect } from 'react-redux';
import FoodActions from 'app/store/redux/FoodRedux';
import AddFoodView from './AddFood.view';
import handlers from './AddFood.handler';
import { mapPropsToValues, validationSchema } from './AddFood.form.config';
import { IValues } from './AddFood.type';

const mapPropsToDispatch = (dispatch: any) => ({
  createFood: (food: any) => dispatch(FoodActions.createFoodRequest(food)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_FOOD } = formikBag.props;

    CREATE_FOOD(values);
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
