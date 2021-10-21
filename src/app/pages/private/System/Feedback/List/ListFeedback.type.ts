export interface IProps {
  pages: number;
  fetching: any;
  getListFeedback: any;
  history: any;
  listFeedback: any;
  deleteFeedback: (p: any) => void;
  filter: any;
  editFeedback: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  status?: string;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
