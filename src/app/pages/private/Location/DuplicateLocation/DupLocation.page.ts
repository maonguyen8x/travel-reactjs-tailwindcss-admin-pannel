import { compose } from 'recompose';
import { connect } from 'react-redux';
import LocationActions from 'app/store/redux/LocationRedux';
import { IReduxStates } from 'app/store/redux/redux.type';
import DuplicateLocationView from './DupLocation.view';

const mapStateToProps = (state: IReduxStates) => ({
  listLocationDuplicated: state.location.listLocationDuplicated,
  pages: state.location.pages,
  filter: state.location.filterLocationDuplicated,
  fetching: state.location.fetchingListLocationDuplicated,
});

const mapPropsToDispatch = (dispatch: any) => ({
  getListLocationDuplicated: (filter: any) =>
    dispatch(LocationActions.getListLocationDuplicatedRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch)
);
export default enhancer(DuplicateLocationView);
