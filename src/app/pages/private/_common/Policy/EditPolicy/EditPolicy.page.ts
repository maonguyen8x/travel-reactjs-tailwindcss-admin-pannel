import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import PolicyActions from 'app/store/redux/PolicyRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { FormikBag } from 'formik';
import AddPostView from './EditPolicy.view';
import { mapPropsToValues, validationSchema } from './EditPolicy.form.config';
import handlers from './EditPolicy.handler';
import { IValues } from './EditPolicy.type';

const mapStateToProps = (state: IReduxStates) => ({
  policyDetail: state.policy.policyDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getPolicyById: (id: number) =>
    dispatch(PolicyActions.getPolicyByIdRequest(id)),
  editPolicy: (id: number, policy: any) =>
    dispatch(PolicyActions.editPolicyRequest(id, policy)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_POLICY } = formikBag.props;

    EDIT_POLICY(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddPostView);
