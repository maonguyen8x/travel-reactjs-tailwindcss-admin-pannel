import { IReduxStates } from 'app/store/redux/redux.type';
import UsersAction from 'app/store/redux/UserRedux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ChangeRoleView from './ChangeRole.view';

const mapStateToProps = (state: IReduxStates) => ({
  filter: state.user.filter,
});
const mapDispatchToProps = (dispatch: any) => ({
  getUserList: (filter: any) =>
    dispatch(UsersAction.getListUserRequest(filter)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);
export default enhancer(ChangeRoleView);
