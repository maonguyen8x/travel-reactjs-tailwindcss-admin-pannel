import API from 'app/services/Api';
import { checkDataApi } from 'app/utils/api';

const getListCheckLocatocationDuplicate = async (address: number) => {
  const checkLocations = await API.getListCheckLocationDuplicate({
    dbQuery: {
      where: {
        address: address,
        isDuplicated: true,
      },
    },
  });
  return checkDataApi(checkLocations);
};

const getListLocationSearch = async (txtSearch: string) => {
  const res = await API.getLocationsAdmin({
    locationSearch: { q: txtSearch, withExternal: true },
  });
  return checkDataApi(res);
};

export { getListCheckLocatocationDuplicate, getListLocationSearch };
