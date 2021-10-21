import { compose, withHandlers, withState } from 'recompose';
import ListAmenityView from './ListAmenity.view';
import handlers from './ListAmenity.handler';

const enhancer = compose<any, any>(
  withState('data', 'setData', []),
  withHandlers(handlers)
);

export default enhancer(ListAmenityView);
