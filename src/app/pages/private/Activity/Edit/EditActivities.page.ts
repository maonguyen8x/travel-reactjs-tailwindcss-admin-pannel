import { compose, withHandlers, withState } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import ActivitiesAction from 'app/store/redux/ActivitiesRedux';
import { FormikBag, withFormik } from 'formik';
import EditActivities from './EditActivities.view';
import {
  mapPropsToValues,
  validationSchema,
} from './EditActivities.form.config';
import handlers from './EditActivities.handler';
import { IValues } from './EditActivities.type';

const mapStateToProps = (state: IReduxStates) => ({
  currencies: state.app.currencies,
  isLoading: state.activities.fetching,
  activityDetail: state.activities.activitiesDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  activitiesById: (id: number) =>
    dispatch(ActivitiesAction.getActivitiesByIdRequest(id)),
  editActivity: (id: number, body: any) =>
    dispatch(ActivitiesAction.editActivitiesRequest(id, body)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_ACTIVITIES } = formikBag?.props;

    EDIT_ACTIVITIES(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore

  withFormik(formikConfig)
);

export default enhancer(EditActivities);
