import { TYPE_ORDER } from 'app/constants';

export default {
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListBookingStay(customFilter);
  },
  ON_FILTER_BY_STATUS: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    if (newFilter.status === TYPE_ORDER.GOING_ON) {
      customFilter.status = TYPE_ORDER.CONFIRMED;
    }
    props?.getListBookingStay(customFilter);
    props.setFilterStatus(newFilter.status);
  },
};
