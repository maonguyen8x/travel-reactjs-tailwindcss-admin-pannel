export interface IProps {
  pages: number;
  fetching: boolean;
  getUserListBlocked: any;
  history: any;
  userType: boolean;
  listUserBlocked: any;
  filter: any;
  roles: any;
  total: number;
  lockUser: any;
  unLockUser: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
