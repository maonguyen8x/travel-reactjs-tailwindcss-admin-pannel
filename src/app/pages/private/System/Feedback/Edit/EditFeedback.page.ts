import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import FeedbackActions from 'app/store/redux/FeedbackRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import EditFeedbackView from './EditFeedback.view';
import { mapPropsToValues, validationSchema } from './EditFeedback.form.config';
import { EDIT_FEEDBACK } from './EditFeedback.handler';

const mapStateToProps = (state: IReduxStates) => ({
  feedbackDetail: state.feedback.feedbackDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  editFeedback: (id: number, feedback: any) =>
    dispatch(FeedbackActions.editFeedbackRequest(id, feedback)),

  getFeedbackById: (id: number) =>
    dispatch(FeedbackActions.getFeedbackByIdRequest(id)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withFormik({
    // @ts-ignore
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true,
    handleSubmit: EDIT_FEEDBACK,
  })
);

export default enhancer(EditFeedbackView);
