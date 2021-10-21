export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  id?: string;
}

export interface IProps {
  pages?: number;
  fetching?: boolean;
  getListReviewFood: any;
  listReviewFood: any;
  filter: any;
  id: string;
  history: any;
  getListNewsFood: any;
  listNewsFood: any;
  getListServicesFood: any;
  listServiceFood: any;
  currencies: any;
  LOCK_FOOD: any;
  UN_LOCK_FOOD: any;
  foodPageDetail: any;
  getFoodPageById: any;
  match: any;
  lockPage: any;
  delPage: any;
}
