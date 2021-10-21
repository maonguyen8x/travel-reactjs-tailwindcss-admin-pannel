export interface IProps {
  deletePost: (p: any) => void;
  pages: number;
  limit: number;
  offset: number;
  fetching: boolean;
  keywordSort: string;
  getListPost: any;
  searchType: string;
  history: any;
  isPost: boolean;
  listPost: any;
  searchName: string;
  filterStatus: any;
  filterUser: any;
  searchTime: any;
  searchFrom: string;
  searchTo: string;
  typeStatus: string;
  creatorId: string;
  filter: any;
  postTypes: boolean;
  setFieldValue: any;
  listUser: any;
  getUserList: any;
  roles: string;
  LOCK_POST: any;
  UN_LOCK_POST: any;
  lockPost: any;
  delPost: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  search?: string;
  status?: string;
  creator?: string;
  fromDate?: string;
  toDate?: string;
}
