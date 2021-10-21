import { connect } from 'react-redux';
import { compose } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import UsersAction from 'app/store/redux/UserRedux';
import ListUserView from './ListUserBlocked.view';

const mapStateToProps = (state: IReduxStates) => ({
  listUserBlocked: state.user.listUserBlocked,
  pages: state.user.pagesUserBlocked,
  filter: state.user.filterUserBlocked,
  total: state.user.totalUserBlocked,
  roles: state?.auth?.profile?.roles,
});
const mapDispatchToProps = (dispatch: any) => ({
  getUserListBlocked: (filter: any) =>
    dispatch(UsersAction.getListUserBlockedRequest(filter)),
  lockUser: (id: number, data: any) =>
    dispatch(UsersAction.lockUserRequest(id, data)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListUserView);
