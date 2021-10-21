import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import PostActions from 'app/store/redux/PostRedux';
import PlanActions from 'app/store/redux/PlanRedux';
import DetailPostView from './DetailPost.view';
import handlers from './DetailPost.handlers';

const mapStateToProps = (state: IReduxStates) => ({
  postDetail: state.post.postDetail,
  planDetail: state.plan.planDetail,
});
const mapDispatchToProps = (dispatch: any) => ({
  getPostById: (id: number) => dispatch(PostActions.getPostByIdRequest(id)),
  getPostSharePlan: (id: number) =>
    dispatch(PlanActions.getPlanByIdRequest(id)),
  lockPost: (id: number, reason: string) =>
    dispatch(PostActions.lockPostRequest(id, reason)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(DetailPostView);
