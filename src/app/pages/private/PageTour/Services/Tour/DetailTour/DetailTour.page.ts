import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import TourActions from 'app/store/redux/TourRedux';
import DetailTourView from './DetailTour.view';
import handlers from './DetailTour.handler';

const mapStateToProps = (state: any) => ({
  currencies: state.app.currencies,
  tourDetail: state.tour.tourDetail,
  fetching: state.tour.fetchingTourDetail,
  list: state.tour.list,
  filter: state.tour.filter,
  pages: state.tour.pages,
  roles: state?.auth?.profile?.roles,
});
const mapDispatchToProps = (dispatch: any) => ({
  getTourById: (id: number) => dispatch(TourActions.getTourByIdRequest(id)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers(handlers)
);

export default enhancer(DetailTourView);
