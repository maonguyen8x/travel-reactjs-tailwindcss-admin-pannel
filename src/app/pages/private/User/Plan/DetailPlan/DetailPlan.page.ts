import { compose } from 'recompose';
import { connect } from 'react-redux';
import PlanActions from 'app/store/redux/PlanRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import PlanDetail from './DetailPlan.view';

const mapStateToProps = (state: IReduxStates) => ({
  planDetail: state.plan.planDetail,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlanById: (id: number) => dispatch(PlanActions.getPlanByIdRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(PlanDetail);
