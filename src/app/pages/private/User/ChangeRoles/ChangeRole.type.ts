export interface IProps {
  pages?: any;
  getUserList?: any;
  filter?: any;
  id: string;
  toggle?: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
}
