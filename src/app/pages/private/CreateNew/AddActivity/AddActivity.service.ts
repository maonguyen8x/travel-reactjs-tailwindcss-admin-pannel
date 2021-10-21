import Api from 'app/services/Api';

export const createActivity = async (body: any) => {
  const res = await Api.createdActivity(body);
  return res;
};
