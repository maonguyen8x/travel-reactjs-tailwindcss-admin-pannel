import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import PlanActions from 'app/store/redux/PlanRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListPlan from './ListPlan.view';
import handlers from './ListPlan.handler';

const mapStateToProps = (state: IReduxStates) => {
  return {
    fetching: state.plan.fetching,
    pages: state.plan.pages,
    listPlan: state.plan.listPlan,
    filter: state.plan.filter,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getListPlan: (id: number, filter: any) =>
    dispatch(PlanActions.getListPlanRequest(id, filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListPlan);
