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
  filter: any;
  locationType: boolean;
  roles: string;
  delLocation: any;
  listLocation: any;
  LOCK_LOCATION: any;
  UN_LOCK_LOCATION: any;
  lockLocation: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  search?: string;
}
