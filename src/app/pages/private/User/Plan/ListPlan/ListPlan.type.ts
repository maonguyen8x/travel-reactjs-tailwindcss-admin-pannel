export interface IProps {
  fetching: boolean;
  pages: number;
  offset: number;
  limit: number;
  keywordSort: string;
  listPlan: any;
  getListPlan: any;
  history: any;
  isPlan: boolean;
  searchName: string;
  searchTime: any;
  searchFrom: string;
  searchTo: string;
  searchType: string;
  filter: any;
  planType: boolean;
  match: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
}
