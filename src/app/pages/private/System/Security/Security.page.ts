import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import FeedbackActions from 'app/store/redux/FeedbackRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import SecurityView from './Security.view';
import handlers from './Security.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.feedback.fetching,
  pages: state.feedback.pages,
  listFeedback: state.feedback.listFeedback,
  filter: state.feedback.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListFeedback: (filter: any) =>
    dispatch(FeedbackActions.getListFeedbackRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(SecurityView);
