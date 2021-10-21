import { compose } from 'recompose';
import { connect } from 'react-redux';
import PageActions from 'app/store/redux/PageRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import DetailAccount from './DetailAccount.view';

const mapStateToProps = (state: IReduxStates) => ({
  verifyDetail: state.page.verifyDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getVerifyPageById: (id: number) =>
    dispatch(PageActions.getListVerifyPageIdRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch)
);

export default enhancer(DetailAccount);
