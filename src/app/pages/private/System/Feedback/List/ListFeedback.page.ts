import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import FeedbackActions from 'app/store/redux/FeedbackRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListFeedbackView from './ListFeedback.view';
import handlers from './ListFeedback.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.feedback.fetching,
  pages: state.feedback.pages,
  listFeedback: state.feedback.listFeedback,
  filter: state.feedback.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListFeedback: (filter: any) =>
    dispatch(FeedbackActions.getListFeedbackRequest(filter)),

  deleteFeedback: (id: string) =>
    dispatch(FeedbackActions.deleteFeedbackRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListFeedbackView);
