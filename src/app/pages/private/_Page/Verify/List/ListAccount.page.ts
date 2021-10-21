import { compose } from 'recompose';
import { connect } from 'react-redux';
import PageActions from 'app/store/redux/PageRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListAccount from './ListAccount.view';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.page.fetching,
  pages: state.page.pages,
  filter: state.page.filter,
  listVerifyPage: state.page.listVerifyPage,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListVerifyPage: (filter: any) =>
    dispatch(PageActions.getListVerifyPageRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListAccount);
