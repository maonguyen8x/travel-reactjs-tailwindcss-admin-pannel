export interface IProps {
  pages: number;
  limit: number;
  offset: number;
  fetching: boolean;
  deleteLocation: (p: any) => void;
  keywordSort: string;
  getListLocationDuplicated: any;
  history: any;
  searchTime: any;
  listLocationDuplicated: any;
  searchFrom: string;
  searchTo: string;
  searchType: string;
  filter: any;
  locationType: boolean;
  total: number;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  created?: string;
}
