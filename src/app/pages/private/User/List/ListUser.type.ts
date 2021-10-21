import { AnyTxtRecord } from 'dns';

export interface IProps {
  pages: number;
  fetching: boolean;
  getUserList: any;
  history: any;
  userType: boolean;
  listUser: any;
  filter: any;
  roles: any;
  ON_ADD_USER: (props: any) => (newFilter: any) => void;
  lockUser: any;
  unLockUser: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: any;
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}
