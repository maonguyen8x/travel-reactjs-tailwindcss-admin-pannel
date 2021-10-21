import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { FormikBag } from 'formik';
import { withFormik } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import PostActions from 'app/store/redux/PostRedux';
import EditPostView from './EditPost.view';
import { mapPropsToValues, validationSchema } from './EditPost.form.config';
import handlers from '../EditPost/EditPost.handler';
import { IValues } from './EditPost.type';

const mapStateToProps = (state: IReduxStates) => ({
  postDetail: state.post.postDetail,
});
const mapDispatchToProps = (dispatch: any) => ({
  getPostById: (id: number) => dispatch(PostActions.getPostByIdRequest(id)),
  editPost: (id: number, body: any) =>
    dispatch(PostActions.editPostRequest(id, body)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_POST } = formikBag?.props;

    EDIT_POST(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(EditPostView);
