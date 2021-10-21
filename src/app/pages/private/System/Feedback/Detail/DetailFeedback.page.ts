import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import FeedbackActions from 'app/store/redux/FeedbackRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import DetaiFeedbackView from './DetailFeedback.view';
import handlers from './DetailFeedback.handler';

const mapStateToProps = (state: IReduxStates) => ({
  feedbackDetail: state.feedback.feedbackDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getFeedbackById: (id: number) =>
    dispatch(FeedbackActions.getFeedbackByIdRequest(id)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers)
);

export default enhancer(DetaiFeedbackView);
