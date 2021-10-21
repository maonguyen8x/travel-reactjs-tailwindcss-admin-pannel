import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';

const getBookingStayById = async (id: number) => {
  const res: any = await API.getBookingTourById(id);
  const bookingDetail = checkDataApi(res);
  return bookingDetail;
};

export { getBookingStayById };
