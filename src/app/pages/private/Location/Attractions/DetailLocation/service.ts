import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';
import { FILTER } from 'app/constants';

const getListPostByLocationId = async (id: number) => {
  const listPostById = await API.listPostByLocationId(id, {
    filterPosts: { order: FILTER.NEWEST },
  });
  return checkDataApi(listPostById);
};

const getListUsersCheckin = async (id: number) => {
  const listUsersCheckin = await API.getLocationCheckin(id);
  return checkDataApi(listUsersCheckin);
};

export { getListPostByLocationId, getListUsersCheckin };
