import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import PostActions from 'app/store/redux/PostRedux';
import { FormikBag } from 'formik';
import AddPostView from './AddPost.view';
import { mapPropsToValues, validationSchema } from './AddPost.form.config';
import handlers from './AddPost.handler';
import { IValues } from './AddPost.type';

const mapPropsToDispatch = (dispatch: any) => ({
  createPost: (post: any) => dispatch(PostActions.createPostRequest(post)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { CREATE_POST } = formikBag.props;
    CREATE_POST(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(null, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddPostView);
