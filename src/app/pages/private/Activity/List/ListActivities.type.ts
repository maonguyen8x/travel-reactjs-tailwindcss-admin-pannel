export interface IProps {
  history: any;
  pages: number;
  fetching: boolean;
  currencies: any;
  filter: any;
  listActivities: any;
  list: any;
  roles: string;
  delActivity: any;
  LOCK_ACTIVITY: any;
  UN_LOCK_ACTIVITY: any;
  lockActivity: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  search?: string;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
