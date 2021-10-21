import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import UserActions from 'app/store/redux/UserRedux';
import PostActions from 'app/store/redux/PostRedux';
import DetailUserView from './DetailUser.view';
import handlers from './DetailUser.handlers';

const mapStateToProps = (state: IReduxStates) => {
  return {
    userDetail: state.user.userDetail,
    listPost: state.user.listPost,
    postDetail: state.post.postDetail,
    listBooking: state.user.listBookings,
    listPage: state.user.listPage,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  getUserById: (id: number) => dispatch(UserActions.getUserByIdRequest(id)),
  getPostById: (id: number) => dispatch(PostActions.getPostByIdRequest(id)),
  lockUser: (id: number, data: any) =>
    dispatch(UserActions.lockUserRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(DetailUserView);
