import { compose } from 'recompose';
import { connect } from 'react-redux';
import PolicyActions from 'app/store/redux/PolicyRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import DetailPostView from './DetailPolicy.view';

const mapStateToProps = (state: IReduxStates) => ({
  policyDetail: state.policy.policyDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getPolicyById: (id: number) =>
    dispatch(PolicyActions.getPolicyByIdRequest(id)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch)
);

export default enhancer(DetailPostView);
