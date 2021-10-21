import { compose, withHandlers, withState } from 'recompose';
import ListLocationView from './ListMessenger.view';
import handlers from './ListMessenger.handler';

const enhancer = compose<any, any>(
  withState('data', 'setData', []),
  withHandlers(handlers)
);

export default enhancer(ListLocationView);
