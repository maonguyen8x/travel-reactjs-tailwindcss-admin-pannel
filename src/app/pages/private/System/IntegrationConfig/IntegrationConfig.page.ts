import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import IntegrationConfigActions from 'app/store/redux/FeedbackRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import IntegrationConfigView from './IntegrationConfig.view';
import handlers from './IntegrationConfig.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.feedback.fetching,
  pages: state.feedback.pages,
  listFeedback: state.feedback.listFeedback,
  filter: state.feedback.filter,
});

const mapDispatchToProps = (dispatch: any) => ({});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(IntegrationConfigView);
