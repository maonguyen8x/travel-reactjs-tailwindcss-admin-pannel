import { compose } from 'recompose';
import { connect } from 'react-redux';
import StatisticActions from 'app/store/redux/StatisticRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListDashboard from './ListDashboard.view';

const mapStateToProps = (state: IReduxStates) => ({
  statisticLocation: state.statistic.statisticLocation,
  statisticUser: state.statistic.statisticUser,
  statisticPost: state.statistic.statisticPost,
  statisticPage: state.statistic.statisticPage,
  statisticDashboard: state.statistic.statisticDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  getStatisticDashboard: () =>
    dispatch(StatisticActions.getStatisticDashboardRequest()),

  getStatisticLocation: (filter: any) =>
    dispatch(StatisticActions.getStatisticLocationRequest(filter)),

  getStatisticUser: (filter: any) =>
    dispatch(StatisticActions.getStatisticUserRequest(filter)),

  getStatisticPost: (filter: any) =>
    dispatch(StatisticActions.getStatisticPostRequest(filter)),

  getStatisticPage: (filter: any) =>
    dispatch(StatisticActions.getStatisticPageRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListDashboard);
