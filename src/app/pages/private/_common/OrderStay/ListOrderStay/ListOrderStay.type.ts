export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListBookingStay: any;
  history: any;
  listBooking: any;
  keywordSort: string;
  filter: any;
  orderType: boolean;
  filterStatus: any;
  ON_FILTER_BY_STATUS: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
