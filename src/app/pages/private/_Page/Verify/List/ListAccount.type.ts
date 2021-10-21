export interface IProps {
  pages: number;
  fetching: boolean;
  isShowColumn: boolean;
  filter: any;
  verifyPage: any;
  listVerifyPage: any;
  getListVerifyPage: any;
  history: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  fromDate?: string;
  toDate?: string;
}
