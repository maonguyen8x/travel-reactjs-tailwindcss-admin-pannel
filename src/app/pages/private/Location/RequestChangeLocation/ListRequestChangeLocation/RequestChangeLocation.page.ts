import { compose } from 'recompose';
import { IReduxStates } from 'app/store/redux/redux.type';
import { connect } from 'react-redux';
import LocationActions from 'app/store/redux/LocationRedux';
import ListRequestChangeLocationView from './RequestChangeLocation.view';

const mapStateToProps = (state: IReduxStates) => ({
  listRequestChangeLocation: state?.location.listRequestChangeLocation,
  pages: state?.location.pages,
  filter: state?.location.filterChangeLocation,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListRequestChangeLocation: (filter: any) =>
    dispatch(LocationActions.getListRequestChangeLocationRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(ListRequestChangeLocationView);
