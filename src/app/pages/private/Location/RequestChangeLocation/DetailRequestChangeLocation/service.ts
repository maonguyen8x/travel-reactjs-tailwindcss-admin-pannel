import API from 'app/services/Api';
import { checkStatusApi } from 'app/utils';

const changeRequestLocation = async (
  id: number,
  status: string,
  reason?: string
) => {
  const requestLocation = await API.changeStatusRequestLocation(id, status, {
    refusingReason: reason,
  });
  return checkStatusApi(requestLocation);
};

export { changeRequestLocation };
