import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import UsersAction from 'app/store/redux/UserRedux';
import { withFormik, FormikBag } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import UpdateProfile from './UpdateUser.view';
import { mapPropsToValues, validationSchema } from './UpdateProfile.config';
import { IValues } from './UpdateUser.type';
import handlers from './UpdateUser.handler';

const mapPropsToState = (state: IReduxStates) => ({
  profile: state.auth.profile,
});
const mapDispatchToProps = (dispatch: any) => ({
  updateUserProfile: (profile: any) =>
    dispatch(UsersAction.updateUserProfileRequest(profile)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { UPDATE_PROFILE } = formikBag.props;

    UPDATE_PROFILE(values);
  },
};

const enhancer = compose<any, any>(
  connect(mapPropsToState, mapDispatchToProps),
  withFormik(formikConfig),
  // @ts-ignore
  withHandlers(handlers)
);

export default enhancer(UpdateProfile);
