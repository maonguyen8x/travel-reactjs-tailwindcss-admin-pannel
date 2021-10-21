export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListBookingTour: any;
  history: any;
  listBooking: any;
  keywordSort: string;
  filter: any;
  orderType: boolean;
  ON_FILTER_BY_STATUS: any;
  filterStatus: string;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
