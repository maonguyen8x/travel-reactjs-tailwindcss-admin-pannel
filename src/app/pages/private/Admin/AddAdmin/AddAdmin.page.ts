import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFormik, FormikBag } from 'formik';
import { IReduxStates } from 'app/store/redux/redux.type';
import UsersAction from 'app/store/redux/UserRedux';
import AddAdmin from './AddAdmin.view';

const mapStateToProps = (state: IReduxStates) => ({
  userId: state.user.userId,
  listUser: state.user.listUser,
  fetching: state.user.fetchingListUser,
  pages: state.user.pages,
  filter: state.user.filter,
});
const mapDispatchToProps = (dispatch: any) => ({
  getUserList: (filter: any) =>
    dispatch(UsersAction.getListUserRequest(filter)),
});

const formikConfig = {
  handleSubmit: (values: any, formikBag: FormikBag<any, any>): void => {
    const { CREATE_LOCATION } = formikBag?.props;

    CREATE_LOCATION(values);
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik(formikConfig)
);

export default enhancer(AddAdmin);
