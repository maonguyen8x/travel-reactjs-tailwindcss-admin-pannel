import { checkDataApi } from 'app/utils';
import API from 'app/services/Api';

const getDetailStay = async (id: number) => {
  const filter: any = {
    filter: {
      include: [{ relation: 'user' }, { relation: 'location' }],
    },
  };
  const res: any = await API.getPageId(id, filter);
  const detailStay = checkDataApi(res);
  return detailStay;
};

export { getDetailStay };
