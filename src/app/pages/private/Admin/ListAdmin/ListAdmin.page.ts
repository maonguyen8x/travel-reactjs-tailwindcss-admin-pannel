import { compose, withHandlers } from 'recompose';
import ListAdminView from './ListAdmin.view';
import handlers from './ListAdmin.handler';

const enhancer = compose<any, any>(withHandlers(handlers));

export default enhancer(ListAdminView);
