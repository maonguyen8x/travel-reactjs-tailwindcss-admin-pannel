export interface IProps {
  pages: number;
  limit: number;
  offset: number;
  fetching: boolean;
  deleteLocation: (p: any) => void;
  keywordSort: string;
  getListLocation: any;
  history: any;
  searchTime: any;
  listLocation: any;
  searchFrom: string;
  searchTo: string;
  searchType: string;
  filter: any;
  locationType: boolean;
  roles: string;
  delLocation: any;
  lockLocation: any;
  LOCK_LOCATION: any;
  UN_LOCK_LOCATION: any;
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
