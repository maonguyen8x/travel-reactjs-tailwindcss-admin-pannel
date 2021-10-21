export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListPolicy: any;
  history: any;
  list: any;
  keywordSort: string;
  filter: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
