import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';
import { FILTER } from 'app/constants';

const getListPostByUser = async (id: number, offset = 0) => {
  const listPost = await API.listPost({
    postFilterSearch: {
      order: FILTER.NEWEST,
      limit: 10,
      offset,
      where: { creatorId: id },
    },
  });
  return checkDataApi(listPost);
};

const getListPlanByUser = async (id: any, offset = 0) => {
  const listPlan = await API.getListPlan({
    filter: {
      order: FILTER.NEWEST,
      limit: 10,
      offset,
      where: { userId: id },
    },
  });
  return checkDataApi(listPlan);
};

const getListLocationByUser = async (id: number, offset = 0) => {
  const listLocation = await API.getLocationsAdmin({
    locationSearch: {
      order: FILTER.NEWEST,
      limit: 10,
      offset,
      where: { userId: id },
    },
  });
  return checkDataApi(listLocation);
};

const getListBoobmarkLocationByUser = async (id: number, offset = 0) => {
  const listBookmarkLocation = await API.getBookmarkLocations(id, {
    filter: {
      order: FILTER.NEWEST,
      limit: 10,
      offset,
    },
  });
  return checkDataApi(listBookmarkLocation);
};

const getListWishListByUser = async (id: number) => {
  const wishlist = await API.wishList(id);
  return checkDataApi(wishlist);
};

export {
  getListPostByUser,
  getListLocationByUser,
  getListWishListByUser,
  getListPlanByUser,
  getListBoobmarkLocationByUser,
};
