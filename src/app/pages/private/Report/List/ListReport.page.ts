import ReportActions from 'app/store/redux/ReportRedux';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { withRouter } from 'react-router-dom';
import ListReportView from './ListReport.view';
import handlers from './ListReport.handler';

const mapStateToProps = (state: IReduxStates) => ({
  listReport: state.report.listReport,
  pages: state.report.pages,
  filter: state.report.filter,
});
const mapDispatchToProps = (dispatch: any) => ({
  getListReport: (filter: any) =>
    dispatch(ReportActions.getListReportRequest(filter)),
});
const enhancer = compose<any, any>(
  withRouter,
  withHandlers(handlers),
  connect(mapStateToProps, mapDispatchToProps)
);
export default enhancer(ListReportView);
