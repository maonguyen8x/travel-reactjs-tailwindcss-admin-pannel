import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import Profile from './ListProfile.view';
import handlers from './ListProfile.handler';

const mapStateToProps = (state: IReduxStates) => ({
  profile: state.auth.profile,
});
const enhancer = compose<any, any>(
  connect(mapStateToProps, null),
  withHandlers(handlers)
);
export default enhancer(Profile);
