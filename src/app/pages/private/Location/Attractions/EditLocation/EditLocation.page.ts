import { compose, withHandlers, withProps, withState } from 'recompose';
import { connect } from 'react-redux';
import { FormikBag, withFormik } from 'formik';
import LocationActions from 'app/store/redux/LocationRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { TRAVEL_TYPES } from 'app/constants';
import EditLocationView from './EditLocation.view';
import { mapPropsToValues, validationSchema } from './EditLocation.form.config';
import { IValues } from './EditLocation.type';
import handlers from './EditLocation.handler';

const mapStateToProps = (state: IReduxStates) => ({
  locationDetail: state.location.locationDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getLocationById: (id: string) =>
    dispatch(LocationActions.getLocationByIdRequest(id)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_LOCATION } = formikBag?.props;
    EDIT_LOCATION(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withProps(({ locationDetail }: any) => {
    const isWhere = locationDetail?.locationType === TRAVEL_TYPES.WHERE;
    return {
      isWhere,
    };
  }),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);
export default enhancer(EditLocationView);
