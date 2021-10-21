import { DASHBOARD_TYPES, ROUTERS } from 'app/constants';
import { history } from 'app/services/History';

export const checkKeyIcon = (name: string) => {
  switch (name) {
    case 'LOCATION':
      return <i className="fas fa-map-marker-alt" />;
    case 'POST':
      return <i className="fas fa-file-alt" />;
    case 'USER':
      return <i className="fas fa-user-friends" />;
    case 'PAGE':
      return <i className="fas fa-flag" />;
    case 'ACTIVITY':
      return <i className="fas fa-star" />;
    case 'STAY':
      return <i className="fas fa-bed" />;
    case 'TOUR':
      return <i className="fas fa-hiking" />;
    case 'FOOD':
      return <i className="fas fa-utensils" />;
    default:
      return '';
  }
};

export const checkPath = (path: string) => {
  switch (path) {
    case DASHBOARD_TYPES.LOCATION:
      return history.push(ROUTERS.LIST_LOCATION);
    case DASHBOARD_TYPES.POST:
      return history.push(ROUTERS.LIST_POST);
    case DASHBOARD_TYPES.USER:
      return history.push(ROUTERS.LIST_USER);
    case DASHBOARD_TYPES.PAGE:
      return history.push(ROUTERS.LIST_PAGE);
    case DASHBOARD_TYPES.ACTIVITY:
      return history.push(ROUTERS.LIST_ACTIVITY);
    case DASHBOARD_TYPES.STAY:
      return history.push(ROUTERS.LIST_STAY);
    case DASHBOARD_TYPES.TOUR:
      return history.push(ROUTERS.LIST_TOUR);
    case DASHBOARD_TYPES.FOOD:
      return history.push(ROUTERS.LIST_FOOD);
    default:
      return '';
  }
};

export const customDashBoardType = (type: string) => {
  switch (type) {
    case DASHBOARD_TYPES.REPORT:
      return true;
    case DASHBOARD_TYPES.FEEDBACK:
      return true;
    case DASHBOARD_TYPES.CHANGE_LOCATION:
      return true;
    case DASHBOARD_TYPES.VERIFY_PAGE:
      return true;
    case DASHBOARD_TYPES.PAGE:
      return true;
    case DASHBOARD_TYPES.DUPLICATED_LOCATION:
      return true;
    default:
      return false;
  }
};
