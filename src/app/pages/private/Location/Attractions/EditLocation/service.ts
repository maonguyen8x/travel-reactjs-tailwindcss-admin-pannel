import API from 'app/services/Api';

export const editLocation = async (id: number, body: any) => {
  try {
    return API.editLocation(id, body);
  } catch (e) {
    return false;
  }
};
