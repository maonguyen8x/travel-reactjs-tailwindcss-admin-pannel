import API from 'app/services/Api';

const deleteLocation = async (id: number) => {
  const delLocation = await API.deleteLocation(id);
  return delLocation;
};

export { deleteLocation };
