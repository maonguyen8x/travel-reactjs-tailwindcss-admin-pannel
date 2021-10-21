import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import NotificationActions from 'app/store/redux/NoticationRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import ListNotificationView from './ListNotification.view';
import handlers from './ListNotification.handler';

const mapStateToProps = (state: IReduxStates) => ({
  fetching: state.notification.fetching,
  pages: state.notification.pages,
  list: state.notification.notifications,
  filter: state.notification.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListNotification: (filter: any) =>
    dispatch(NotificationActions.getListNotificationRequest(filter)),

  deleteNotification: (id: string) =>
    dispatch(NotificationActions.deleteNotificationRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(ListNotificationView);
