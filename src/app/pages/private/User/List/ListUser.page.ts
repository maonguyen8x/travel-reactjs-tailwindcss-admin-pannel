import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import UsersAction from 'app/store/redux/UserRedux';
import ListUserView from './ListUser.view';
import handlers from './ListUser.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listUser: state.user.listUser,
  pages: state.user.pages,
  filter: state.user.filter,
  roles: state?.auth?.profile?.roles,
});
const mapDispatchToProps = (dispatch: any) => ({
  getUserList: (filter: any) =>
    dispatch(UsersAction.getListUserRequest(filter)),
  lockUser: (id: number, data: any) =>
    dispatch(UsersAction.lockUserRequest(id, data)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListUserView);
