export const ROUTERS = {
  DASHBOARD: '/app/dashboard',
  LOGIN: '/login',

  POST_POSTAL: '/app/post/:path/:id?',
  LIST_POST: '/app/post/list',
  POST_ADD: '/app/add-new/post',
  CREATE_NEW: '/app/add-new/:path',
  POST_DETAIL: '/app/post/detail/:id',
  POST_DETAIL_BY_LOCATIONS: '/app/location/detail/:locationId/post/:id ',
  POST_EDIT: '/app/post/edit/:id',

  // USER
  USER_POSTAL: '/app/user/:path/:id?',
  LIST_USER: '/app/user/list',
  USER_ADD: '/app/user/add',
  USER_DETAIL: '/app/user/detail/:id',
  USER_LOCATION: '/app/users-locations/:id',
  LIST_POST_USER_CREATED: '/app/user/list-post',
  LIST_ACCOUNT_BLOCKED: '/app/user/blocked',

  // LOCATION
  LOCATION_POSTAL: '/app/location/:path/:id?',
  LIST_LOCATION: '/app/location/list',
  LIST_SYSTEM_LOCATION: '/app/location/system-location',
  LIST_REQUEST_CHANGE_LOCATION: '/app/location/request-change-location',
  DETAIL_REQUEST_CHANGE_LOCATION: '/app/location/request-change-location/:id',
  LOCATION_ADD: '/app/add-new/location',
  LOCATION_DETAIL: '/app/location/detail/:id',
  LOCATION_EDIT: '/app/location/edit/:id',
  LOCATION_SYSTEM_DETAIL: '/app/location/system-location/:id',
  LOCATION_SYSTEM_EDIT: '/app/location/system-location/:id',
  LOCATION_DUPLICATE: '/app/location/duplicate',

  // SYSTEM
  SYSTEM_POSTAL: '/app/system/:path/:subPath?/:id?',
  LIST_FEEDBACK: '/app/system/feedback/list',
  FEEDBACK_CHAT_ROOM: '/app/system/feedback/chat-room',
  FEEDBACK_DETAIL: '/app/system/feedback/detail/:id',
  FEEDBACK_EDIT: '/app/system/feedback/edit/:id',

  LIST_PICTURE: '/app/gallery/pictures',
  LIST_VIDEO: '/app/gallery/videos',
  LIST_BACKGROUND_POST: '/app/system/background-post/list',
  ADD_BACKGROUND_POST: '/app/system/background-post/add',
  EDIT_BACKGROUND_POST: '/app/system/background-post/edit/:id',

  LIST_MESSENGER: '/app/system/messenger/list',
  MESSENGER_ADD: '/app/system/messenger/add',
  MESSENGER_EDIT: '/app/system/messenger/edit/:slug',

  CHANGE_ROLES: '/app/user/change-roles/:id',
  ADMIN_CREATE: '/app/admin-create',
  ADMIN_SYSTEM: '/app/admin-system',
  ADMIN_SECURITY: '/app/system/security',
  ADMIN_INTEGRATION_CONFIGURATION: '/app/system/integration-configuration',

  ADMIN_AUDIT: '/app/system/audit',

  LIST_ADMIN: '/app/admin',
  ADMIN_ADD: '/app/admin/add',

  LIST_STAY: '/app/stay',
  STAY_ADD: '/app/stay/add',
  STAY_ADD_SUB_SERVICES: '/app/stay/add-sub-services/:id',
  STAY_DETAIL_SUB_SERVICES: '/app/stay/detail-sub-services/:id',
  STAY_EDIT_SUB_SERVICES: '/app/stay/edit-sub-services/:id',
  STAY_DETAIL: '/app/stay/detail/:id',
  STAY_EDIT: '/app/stay/edit/:id',
  LIST_CONVENIENT: '/app/amenities',
  ADD_AMENITIES: '/app/amenities/add',
  LIST_ORDER_STAY: '/app/order-stay',
  ORDER_STAY_DETAIL: '/app/order-stay/:id',
  STAY_AUTHENTICATION_PAGE: '/app/page-stay/authentication/:id',

  // Tour
  TOUR_POSTAL: '/app/page-tour/:path/:id?',
  LIST_TOUR: '/app/page-tour/list',
  TOUR_DETAIL: '/app/page-tour/detail/:id',
  TOUR_DETAIL_PROVIDER: '/app/page-tour/provider/:id',

  TOUR_LIST_SERVICE: '/app/page-tour/:id/services',
  TOUR_SERVICE_DETAIL: '/app/page-tour/service-detail/:id',
  TOUR_AUTHENTICATION_PAGE: '/app/page-tour/authentication/:id',

  TOUR_LIST_BOOKING: '/app/page-tour/bookings',
  TOUR_BOOKING_DETAIL: '/app/page-tour/booking-detail/:id',
  TOUR_ADD: '/app/add-new/tour',
  TOUR_EDIT: '/app/page-tour/edit/:id',

  PROFILE: '/app/profile',
  UPDATE_PROFILE: '/app/profile/update',
  UPDATE_AVATAR_PROFILE: '/app/profile/update-avatar',

  COMMENT_POST: '/app/comment/:id',
  LIKE_POST: '/app/like/:id',
  SHARE_POST: '/app/share/:id',
  RANKING_POST: '/app/ranking/:id',

  REPORT_POSTAL: '/app/report/:path/:id?',
  LIST_REPORT: '/app/report/list',
  LIST_REPORT_ID: '/app/report/list/:id',
  REPORT_DETAIL: '/app/report/detail/:id',

  ANALYSIS_LOCATION: '/app/analysis-location',
  ANALYSIS_POST: '/app/analysis-post',
  ANALYSIS_USERS: '/app/analysis-users',
  ANALYSIS_PLAN: '/app/analysis-plan',

  LIST_POLICY: '/app/policy',
  POLICY_DETAIL: '/app/policy/detail/:id',
  POLICY_ADD: '/app/policy/add',
  POLICY_EDIT: '/app/policy/edit/:id',

  // Food
  FOOD_POSTAL: '/app/page-food/:path/:id?',
  LIST_FOOD: '/app/page-food/list',
  FOOD_ADD: '/app/add-new/food',
  FOOD_DETAIL: '/app/page-food/detail/:id',
  FOOD_AUTHENTICATION_PAGE: '/app/page-food/authentication/:id',

  LIST_PLAN: '/app/plan/:id',
  PLAN_DETAIL: '/app/plan/detail/:id',

  LIST_NOTIFICATION: '/app/notification',
  NOTIFICATION_DETAIL: '/app/notification/:id',

  LIST_FOOD_SERVICE: '/app/food-service',
  SERVICE_FOOD_DETAIL: '/app/food-service-detail/:id',

  LIST_PAGE: '/app/page',
  PAGE_ADD: '/app/page/add',

  // Activity
  ACTIVITY_POSTAL: '/app/activity/:path/:id?',
  LIST_ACTIVITY: '/app/activity/list',
  ACTIVITY_DETAIL: '/app/activity/detail/:id',
  EDIT_ACTIVITY: '/app/activity/edit/:id',
  PAGE_DETAIL: '/app/page/detail/:id',
  CREATE_NEW_ACTIVITY: '/app/add-new/activity',
  ACTIVITY_PARTICIPANTS: '/app/activity/:id/participants',

  LIST_ORDER_TOUR: '/app/order-tour',
  ORDER_TOUR_DETAIL: '/app/order-tour/detail/:id',
  ADD_ORDER_TOUR: '/app/order-tour/add',

  VERIFY_POSTAL: '/app/verify/:path/:id?',
  LIST_VERIFY_ACCOUNT: '/app/verify/list',
  VERIFY_ACCOUNT_DETAIL: '/app/verify/detail/:id',

  LIST_FACILITY: '/app/facility',
  FACILITY_ADD: '/app/facility/add',
  LIST_CATEGORY_FACILITY: '/app/category-facility',
  ADD_CATEGORY_FACILITY: '/app/category-facility/add',

  LIST_CATEGORY_AMENITY: '/app/category-amenity',
  ADD_CATEGORY_AMENITY: '/app/category-amenity/add',
  EDIT_CATEGORY_AMENITY: '/app/category-amenity/edit/:id',
  LIST_AMENITY: '/app/category-amenity/:id/amenity',
  ADD_AMENITY: '/app/amenity/:id/add',
  EDIT_AMENITY: '/app/amenity/:id/edit',

  SOS_POSTAL: '/app/sos/:path/:id?',

  SOS_LIST: '/app/sos/list',
  SOS_DETAIL: '/app/sos/detail/:id',
  FORUM_LIST: '/app/sos/forum',
};
