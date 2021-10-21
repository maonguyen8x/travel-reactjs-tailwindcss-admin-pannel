export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListNotification: any;
  history: any;
  list: any;
  filter: any;
  deleteNotification: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
