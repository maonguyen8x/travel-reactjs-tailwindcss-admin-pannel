export interface IProps {
  pages: number;
  fetching: any;
  listTour: any;
  history: any;
  getListTour: any;
  deleteTour: (p: any) => void;
  filter: any;
  ON_NAVIGATE: any;
  roles: string;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  fromDate?: string;
  toDate?: string;
}
