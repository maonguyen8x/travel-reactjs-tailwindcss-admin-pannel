export interface IProps {
  fetching: any;
  GET_AMENITIES: any;
  ON_EDIT: any;
  match: any;
  ON_DELETE: any;
  setData: any;
  data: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
}
