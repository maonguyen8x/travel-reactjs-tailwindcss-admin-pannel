export interface IProps {
  pages: any;
  offset: any;
  limit: any;
  fetching: any;
  keywordSort: any;
  editStatusReport: any;
  listReport: any;
  getListReport: any;
  history: any;
  filter: any;
  isShowColumn?: boolean;
  reportTypes: boolean;
  reportStatusTypes: boolean;
  match: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
  status?: string;
  type?: string;
}
