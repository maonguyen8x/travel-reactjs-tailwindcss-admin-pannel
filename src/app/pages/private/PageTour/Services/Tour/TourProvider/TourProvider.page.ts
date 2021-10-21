import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import TourActions from 'app/store/redux/TourRedux';
import DetailTourProvider from './TourProvider.view';

const mapStateToProps = (state: any) => ({
  tourDetail: state.tour.tourDetail,
});
const mapDispatchToProps = (dispatch: any) => ({
  getTourById: (id: number) => dispatch(TourActions.getTourByIdRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(DetailTourProvider);
