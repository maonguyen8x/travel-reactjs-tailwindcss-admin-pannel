export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListFacility: any;
  history: any;
  listFacility: any;
  keywordSort: string;
  filter: any;
  deleteFacility: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
}
