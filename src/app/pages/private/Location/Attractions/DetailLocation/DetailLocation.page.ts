import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import LocationActions from 'app/store/redux/LocationRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import PostActions from 'app/store/redux/PostRedux';
import DetailLocationView from './DetailLocation.view';
import handlers from './DetailLocation.handlers';

const mapStateToProps = (state: IReduxStates) => ({
  locationDetail: state.location.locationDetail,
  postDetail: state.post.postDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getLocationById: (id: number) =>
    dispatch(LocationActions.getLocationByIdRequest(id)),
  getPostById: (id: number) => dispatch(PostActions.getPostByIdRequest(id)),
  lockLocation: (id: number, data: any) =>
    dispatch(LocationActions.lockLocationRequest(id, data)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers)
);
export default enhancer(DetailLocationView);
