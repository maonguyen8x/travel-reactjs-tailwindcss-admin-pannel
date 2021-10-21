import { compose, map, filter } from 'ramda';
import { getTypeStatusManageBookingStay } from 'app/utils';

const handleBookingWithStatus = (listBooking: any, filterStatus: string) =>
  compose(
    filter((item: any) => {
      if (!filterStatus) {
        return true;
      }

      return item.bookingStatus === filterStatus;
    }),
    map((item: any) => {
      const startDate = item?.stayReservation?.startDate;
      const endDate = item?.stayReservation?.endDate;
      const status = item?.status;
      return {
        ...item,
        bookingStatus: getTypeStatusManageBookingStay(
          startDate,
          endDate,
          status
        ),
      };
    })
  )(listBooking);

export { handleBookingWithStatus };
