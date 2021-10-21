export interface IProps {
  pages: number;
  fetching: boolean;
  userId: number;
  getUserIdPosts: any;
  userIdPost: any;
  filter: any;
  id: string;
  wishList: any;
  getWishList: any;
  interestings: any;
  getInterestings: any;
  getUserIdLocation: any;
  userIdLocation: any;
  followers: any;
  getFollowers: any;
  history: any;
  followings: any;
  getFollowings: any;
  blockersByUser: any;
  getBlockers: any;
  listPlanByUser: any;
  plan: any;
}

export interface IFilter {
  id?: string;
  offset?: number;
  limit?: number;
  order?: string | string[];
}
