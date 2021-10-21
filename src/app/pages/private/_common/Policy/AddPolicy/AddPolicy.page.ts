import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import PolicyActions from 'app/store/redux/PolicyRedux';
import { FormikBag } from 'formik';
import AddPostView from './AddPolicy.view';
import { mapPropsToValues, validationSchema } from './AddPolicy.form.config';
import handlers from './AddPolicy.handler';
import { IValues } from './AddPolicy.type';

const mapPropsToDispatch = (dispatch: any) => ({
  createPolicy: (post: any) =>
    dispatch(PolicyActions.createPolicyRequest(post)),
});

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_POLICY } = formikBag.props;

    CREATE_POLICY(values);
  },
};

const enhancer = compose<any, any>(
  connect(null, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(AddPostView);
