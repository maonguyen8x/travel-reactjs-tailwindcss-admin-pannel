export interface IProps {
  pages: any;
  limit: any;
  offset: any;
  fetching: any;
  getListCategoryAmenity: any;
  history: any;
  listCategoryAmenity: any;
  keywordSort: string;
  filter: any;
  deleteCategoryAmenity: any;
  ON_DETAIL: any;
  ON_EDIT: any;
  ON_DELETE: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
}
