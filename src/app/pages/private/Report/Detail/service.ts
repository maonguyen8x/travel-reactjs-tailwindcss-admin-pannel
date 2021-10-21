import API from 'app/services/Api';

const changeStatus = async (id: number, body: any) => {
  const status = await API.editReport(id, body);
  return status;
};

export { changeStatus };
