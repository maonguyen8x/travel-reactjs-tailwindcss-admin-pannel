import API from 'app/services/Api';

const onDeletePage = async (id: number, deletedMessage: any) => {
  const delFood = await API.deletePage(id, { deletedMessage });
  return delFood;
};

export { onDeletePage };
