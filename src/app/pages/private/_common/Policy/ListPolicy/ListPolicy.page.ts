import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import PolicyActions from 'app/store/redux/PolicyRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListPolicyView from './ListPolicy.view';
import handlers from './ListPolicy.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.policy.fetching,
  pages: state.policy.pages,
  list: state.policy.listPolicy,
  filter: state.policy.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListPolicy: (filter: any) =>
    dispatch(PolicyActions.getListPolicyRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListPolicyView);
