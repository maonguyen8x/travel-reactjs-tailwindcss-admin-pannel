export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListFeedback: any;
  history: any;
  listFeedback: any;
  filter: any;
  roles: string;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  status?: string;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
