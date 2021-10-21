import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';

const createPageTour = async (body: any) => {
  const pageTour = await API.createPage(body);
  return checkDataApi(pageTour);
};

export { createPageTour };
