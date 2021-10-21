export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListCategoryFacility: any;
  history: any;
  listCategoryFacility: any;
  keywordSort: string;
  filter: any;
  deleteCategoryFacility: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
}
