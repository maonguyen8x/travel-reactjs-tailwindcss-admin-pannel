import ReportActions from 'app/store/redux/ReportRedux';
import { compose, withHandlers } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import PostActions from 'app/store/redux/PostRedux';
import PageActions from 'app/store/redux/PageRedux';
import UserActions from 'app/store/redux/UserRedux';
import LocationActions from 'app/store/redux/LocationRedux';
import handlers from './DetailReport.handler';
import DetailReportView from './DetailReport.view';

const mapStateToProps = (state: IReduxStates) => ({
  reportDetail: state.report.reportDetail,
  postDetail: state.post.postDetail,
  userDetail: state.user.userDetail,
  pageDetail: state.page.foodPageDetail,
  locationDetail: state.location.locationDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getReportById: (id: number) =>
    dispatch(ReportActions.getReportByIdRequest(id)),
  getPostById: (id: number) => dispatch(PostActions.getPostByIdRequest(id)),
  getUserById: (id: number) => dispatch(UserActions.getUserByIdRequest(id)),
  getPageById: (id: number) => dispatch(PageActions.getPageFoodByIdRequest(id)),
  getLocationById: (id: number) =>
    dispatch(LocationActions.getLocationByIdRequest(id)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers)
);

export default enhancer(DetailReportView);
