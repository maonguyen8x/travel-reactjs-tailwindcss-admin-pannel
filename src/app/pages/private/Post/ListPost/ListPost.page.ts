import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import PostActions from 'app/store/redux/PostRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListPostView from './ListPost.view';
import handlers from './ListPost.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listPost: state.post.listPost,
  fetching: state.post.fetchingPost,
  pages: state.post.pages,
  filter: state.post.filter,
  roles: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListPost: (filter: any) =>
    dispatch(PostActions.getListPostRequest(filter)),
  lockPost: (id: number, data: any) =>
    dispatch(PostActions.lockPostRequest(id, data)),
  delPost: (id: number) => dispatch(PostActions.deletePostRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListPostView);
