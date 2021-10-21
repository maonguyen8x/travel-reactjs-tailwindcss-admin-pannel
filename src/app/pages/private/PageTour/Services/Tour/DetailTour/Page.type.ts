export interface IProps {
  pages?: number;
  fetching?: boolean;
  getListServicesPage: any;
  list: any;
  filter: any;
  id: string;
  currencies: any;
  getListNewsPage: any;
  getListPageReviews: any;
}

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  pageId?: string;
}
