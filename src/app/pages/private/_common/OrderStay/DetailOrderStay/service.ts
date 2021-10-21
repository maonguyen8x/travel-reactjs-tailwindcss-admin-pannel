import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';

const getBookingStayById = async (id: number) => {
  const res: any = await API.getBookingStayById(id);
  const bookingDetail = checkDataApi(res);
  return bookingDetail;
};

export { getBookingStayById };
