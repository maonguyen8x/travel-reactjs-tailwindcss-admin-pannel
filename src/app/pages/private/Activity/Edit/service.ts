import Api from 'app/services/Api';
import { checkDataApi } from 'app/utils';

export const getListLocationCreated = async (txtSearch: string) => {
  const res = await Api.getLocationsAdmin({
    locationSearch: { q: txtSearch, withExternal: true },
  });
  return checkDataApi(res);
};
