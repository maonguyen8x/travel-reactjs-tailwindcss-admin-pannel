import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import MediaContentAction from 'app/store/redux/MediaContentRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListBackgroundPostView from './ListBackgroundPost.view';
import handlers from './ListBackGroundPost.handler';

const mapStateToProps = (state: IReduxStates) => {
  const { mediaContent } = state;
  return {
    listBackgroundPost: mediaContent.listBackgroundPost,
    fetchingListBackgroundPost: mediaContent.fetchingListBackgroundPost,
    pages: mediaContent.pages,
    offset: mediaContent.offset,
    limit: mediaContent.limit,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getListBackgroundPost: (offset: number, limit: number) =>
    dispatch(MediaContentAction.getListBackgroundPostRequest(offset, limit)),
  deleteBackgroundPost: (id: number) =>
    dispatch(MediaContentAction.deleteBackgroundPostRequest(id)),
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListBackgroundPostView);
