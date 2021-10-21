export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListFoodPage: any;
  listFoodPage: any;
  history: any;
  filter: any;
  deleteTour: (p: any) => void;
  ON_NAVIGATE: any;
  roles: string;
  match: any;
  LOCK_PAGE: any;
  UN_LOCK_PAGE: any;
  lockPage: any;
  delPage: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
