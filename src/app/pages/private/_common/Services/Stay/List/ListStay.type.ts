export interface IProps {
  pages: number;
  getListStay: any;
  list: any;
  history: any;
  filter: any;
  ON_NAVIGATE: any;
  fetching: boolean;
  ON_DETAIL_USER: any;
  ON_DELETE: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
