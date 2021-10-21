import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import LocationActions from 'app/store/redux/LocationRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import DetailRequestChangeLocationView from './DetailRequestChangeLocation.view';
import handlers from './DetailRequestChangeLocation.handlers';

const mapStateToProps = (state: IReduxStates) => ({
  requestChangeLocationDetail: state.location.requestChangeLocationDetail,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getRequestChangeLocationById: (id: number) =>
    dispatch(LocationActions.getRequestChangeLocationByIdRequest(id)),
  changeStatusLocation: (id: number, status: string) =>
    dispatch(LocationActions.changeStatusLocationRequest(id, status)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers)
);
export default enhancer(DetailRequestChangeLocationView);
