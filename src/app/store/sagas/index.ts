import { takeEvery, all } from 'redux-saga/effects';

import { LocationTypes } from 'app/store/redux/LocationRedux';
import { UserTypes } from 'app/store/redux/UserRedux';
import { PostTypes } from 'app/store/redux/PostRedux';
import { StayyTypes } from 'app/store/redux/StayRedux';
import { StaySubServices } from 'app/store/redux/StaySubServicesRedux';
import { TourTypes } from 'app/store/redux/TourRedux';
import { AuthTypes } from 'app/store/redux/AuthRedux';
import { ReportTypes } from 'app/store/redux/ReportRedux';
import { MediaContentTypes } from 'app/store/redux/MediaContentRedux';
import { PolicyTypes } from 'app/store/redux/PolicyRedux';
import { PlanTypes } from 'app/store/redux/PlanRedux';
import { StatisticTypes } from 'app/store/redux/StatisticRedux';
import { FeedbackTypes } from 'app/store/redux/FeedbackRedux';
import { FoodTypes } from 'app/store/redux/FoodRedux';
import { PageTypes } from 'app/store/redux/PageRedux';
import { NotificationTypes } from 'app/store/redux/NoticationRedux';
import { ActivitiesTypes } from 'app/store/redux/ActivitiesRedux';
import { FacilityTypes } from 'app/store/redux/FacilityRedux';
import { BookingTypes } from 'app/store/redux/BookingRedux';
import { CategoryFacilityTypes } from 'app/store/redux/CategoryFacilityRedux';
import { CategoryAmenityTypes } from 'app/store/redux/CategoryAmenityRedux';
import { MessengerTypes } from 'app/store/redux/MessengerRedux';
import { SecurityTypes } from 'app/store/redux/SecurityRedux';
import { IntegrationConfigTypes } from 'app/store/redux/IntegrationConfigRedux';
import api from '../../services/Api';

import {
  getListLocationsDuplicated,
  createLocation,
  getLocationById,
  getUserIdLocation,
  getListLocations,
  getListAttractions,
  deleteLocation,
  getListRequestChangeLocation,
  changeStatusLocation,
  getRequestChangeLocationById,
  lockLocation,
} from './LocationSaga';

import {
  getListPost,
  createPost,
  deletePost,
  getPostById,
  lockPost,
  editPost,
} from './PostSaga';

import {
  getListUser,
  getListUserBlocked,
  getUserById,
  updateUserProfile,
  lockUser,
} from './UserSaga';

import { login, getUserMe } from './AuthSaga';

import {
  getListStay,
  createStay,
  editStay,
  deleteStay,
  getStayById,
  getListReviewBooking,
} from './StaySaga';

import {
  createStaySubServices,
  getStaySubServicesById,
} from './StaySubServiesSaga';
import {
  getListTour,
  createTourService,
  getTourById,
  deleteTour,
  editTour,
  getListServices,
  getListPageReviews,
  getListPageNews,
} from './TourSaga';

import { getListReport, editStatusReport, getReportById } from './ReportSaga';

import {
  getListImage,
  getListVideo,
  deleteMediaContent,
  searchTimeMediaContent,
  getListBackgroundPost,
  deleteBackgroundPost,
  createBackgroundPost,
  editBackgroundPost,
  getBackgroundPostById,
} from './MediaContentSaga';
import {
  getListPolicy,
  getPolicyById,
  createPolicy,
  editPolicy,
} from './PolicySaga';
import { getListPlan, getPlanById } from './PlanSaga';

import {
  getStatisticLocation,
  getStatisticPost,
  getStatisticUser,
  getStatisticPlan,
  getStatisticDashboard,
  getListUserStatistic,
  getListLocationStatistic,
  getListPostStatistic,
  getListPlanStatistic,
  getStatisticPage,
} from './StatisticSaga';

import {
  getListFeedback,
  getFeedbackById,
  deleteFeedback,
  editFeedback,
} from './FeedbackSaga';
import { getListFood, getFoodById, createFood } from './FoodSaga';

import {
  getListFoodPage,
  getFoodPageById,
  getListPageReview,
  getListFoodPageNews,
  createPage,
  getListVerifyPage,
  verifyPageDetail,
  lockPage,
  deletePage,
} from './PageSaga';

import { getListNotification, deleteNotification } from './NotificationSaga';

import {
  getListActivities,
  getActivityById,
  editActivity,
  deleteActivity,
  lockActivity,
} from './ActivitiesSaga';

import {
  getListFacility,
  deleteFacility,
  createFacility,
} from './FacilitySaga';

import {
  getListBookingStay,
  getListBookingTour,
  getListBooking,
} from './BookingSaga';

import {
  getListCategoryFacility,
  deleteCategoryFacility,
  createCategoryFacility,
} from './CategoryFacilitySaga';

import {
  getListCategoryAmenity,
  deleteCategoryAmenity,
  createCategoryAmenity,
} from './CategoryAmenitySaga';
import { AmenitiesTypes } from '../redux/AmenitiesRedux';
import {
  getListAmenities,
  deleteAmenities,
  createAmenities,
} from './AmenitiesSaga';

import { senMessenger, editMessenger } from './MessengerSaga';

import { getBlackListIPS } from './SecuritySaga';

import { createIntegrationConfiguration } from './IntegrationConfigSaga';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeEvery(
      LocationTypes.GET_LIST_LOCATION_DUPLICATED_REQUEST,
      getListLocationsDuplicated,
      api
    ),

    takeEvery(LocationTypes.GET_LOCATION_BY_ID_REQUEST, getLocationById, api),

    takeEvery(LocationTypes.CREATE_LOCATION_REQUEST, createLocation, api),

    takeEvery(
      LocationTypes.GET_USER_ID_LOCATION_REQUEST,
      getUserIdLocation,
      api
    ),

    takeEvery(
      LocationTypes.GET_LIST_ATTRACTIONS_REQUEST,
      getListAttractions,
      api
    ),
    takeEvery(LocationTypes.GET_LIST_LOCATIONS_REQUEST, getListLocations, api),

    takeEvery(LocationTypes.DELETE_LOCATION_REQUEST, deleteLocation, api),

    takeEvery(
      LocationTypes.GET_LIST_REQUEST_CHANGE_LOCATION_REQUEST,
      getListRequestChangeLocation,
      api
    ),

    takeEvery(
      LocationTypes.CHANGE_STATUS_LOCATION_REQUEST,
      changeStatusLocation,
      api
    ),

    takeEvery(
      LocationTypes.GET_REQUEST_CHANGE_LOCATION_BY_ID_REQUEST,
      getRequestChangeLocationById,
      api
    ),

    takeEvery(LocationTypes.LOCK_LOCATION_REQUEST, lockLocation, api),

    takeEvery(AuthTypes.LOGIN_REQUEST, login, api),

    takeEvery(UserTypes.UPDATE_USER_PROFILE_REQUEST, updateUserProfile, api),

    takeEvery(AuthTypes.GET_USER_ME_REQUEST, getUserMe, api),

    takeEvery(UserTypes.GET_LIST_USER_REQUEST, getListUser, api),

    takeEvery(UserTypes.GET_LIST_USER_BLOCKED_REQUEST, getListUserBlocked, api),

    takeEvery(UserTypes.GET_USER_BY_ID_REQUEST, getUserById, api),

    takeEvery(UserTypes.LOCK_USER_REQUEST, lockUser, api),

    takeEvery(PostTypes.GET_LIST_POST_REQUEST, getListPost, api),

    takeEvery(PostTypes.GET_POST_BY_ID_REQUEST, getPostById, api),

    takeEvery(PostTypes.LOCK_POST_REQUEST, lockPost, api),

    takeEvery(PostTypes.CREATE_POST_REQUEST, createPost, api),

    takeEvery(PostTypes.EDIT_POST_REQUEST, editPost, api),

    takeEvery(PostTypes.DELETE_POST_REQUEST, deletePost, api),

    takeEvery(StayyTypes.GET_LIST_STAY_REQUEST, getListStay, api),

    takeEvery(StayyTypes.CREATE_STAY_REQUEST, createStay, api),

    takeEvery(StayyTypes.EDIT_STAY_REQUEST, editStay, api),

    takeEvery(StayyTypes.DELETE_STAY_REQUEST, deleteStay, api),

    takeEvery(StayyTypes.GET_STAY_BY_ID_REQUEST, getStayById, api),

    takeEvery(
      StaySubServices.CREATE_STAY_SUB_SERVICES_REQUEST,
      createStaySubServices,
      api
    ),

    takeEvery(
      StaySubServices.GET_STAY_SUB_SERVICES_BY_ID_REQUEST,
      getStaySubServicesById,
      api
    ),

    takeEvery(
      StayyTypes.LIST_REVIEW_BOOKING_STAY_REQUEST,
      getListReviewBooking,
      api
    ),

    takeEvery(TourTypes.GET_LIST_TOUR_REQUEST, getListTour, api),

    takeEvery(TourTypes.CREATE_TOUR_REQUEST, createTourService, api),

    takeEvery(TourTypes.GET_TOUR_BY_ID_REQUEST, getTourById, api),

    takeEvery(TourTypes.DELETE_TOUR_REQUEST, deleteTour, api),

    takeEvery(TourTypes.EDIT_TOUR_REQUEST, editTour, api),

    takeEvery(TourTypes.GET_LIST_SERVICES_REQUEST, getListServices, api),

    takeEvery(TourTypes.GET_LIST_PAGE_REVIEWS_REQUEST, getListPageReviews, api),

    takeEvery(TourTypes.GET_LIST_PAGE_NEWS_REQUEST, getListPageNews, api),

    takeEvery(ReportTypes.GET_LIST_REPORT_REQUEST, getListReport, api),

    takeEvery(ReportTypes.EDIT_STATUS_REPORT_REQUEST, editStatusReport, api),

    takeEvery(ReportTypes.GET_REPORT_BY_ID_REQUEST, getReportById, api),

    takeEvery(MediaContentTypes.GET_LIST_IMAGE_REQUEST, getListImage, api),

    takeEvery(MediaContentTypes.GET_LIST_VIDEO_REQUEST, getListVideo, api),

    takeEvery(
      MediaContentTypes.DELETE_MEDIA_CONTENT_REQUEST,
      deleteMediaContent,
      api
    ),

    takeEvery(
      MediaContentTypes.SEARCH_TIME_MEDIA_CONTENT_REQUEST,
      searchTimeMediaContent,
      api
    ),

    takeEvery(
      MediaContentTypes.GET_LIST_BACKGROUND_POST_REQUEST,
      getListBackgroundPost,
      api
    ),

    takeEvery(
      MediaContentTypes.DELETE_BACKGROUND_POST_REQUEST,
      deleteBackgroundPost,
      api
    ),

    takeEvery(
      MediaContentTypes.CREATE_BACKGROUND_POST_REQUEST,
      createBackgroundPost,
      api
    ),

    takeEvery(
      MediaContentTypes.EDIT_BACKGROUND_POST_REQUEST,
      editBackgroundPost,
      api
    ),

    takeEvery(
      MediaContentTypes.GET_BACKGROUND_POST_BY_ID_REQUEST,
      getBackgroundPostById,
      api
    ),

    takeEvery(PolicyTypes.GET_LIST_POLICY_REQUEST, getListPolicy, api),

    takeEvery(PolicyTypes.GET_POLICY_BY_ID_REQUEST, getPolicyById, api),

    takeEvery(PolicyTypes.CREATE_POLICY_REQUEST, createPolicy, api),

    takeEvery(PolicyTypes.EDIT_POLICY_REQUEST, editPolicy, api),

    takeEvery(PlanTypes.GET_LIST_PLAN_REQUEST, getListPlan, api),

    takeEvery(PlanTypes.GET_PLAN_BY_ID_REQUEST, getPlanById, api),

    takeEvery(
      StatisticTypes.GET_STATISTIC_LOCATION_REQUEST,
      getStatisticLocation,
      api
    ),

    takeEvery(StatisticTypes.GET_STATISTIC_POST_REQUEST, getStatisticPost, api),

    takeEvery(StatisticTypes.GET_STATISTIC_USER_REQUEST, getStatisticUser, api),

    takeEvery(StatisticTypes.GET_STATISTIC_PLAN_REQUEST, getStatisticPlan, api),

    takeEvery(
      StatisticTypes.GET_STATISTIC_DASHBOARD_REQUEST,
      getStatisticDashboard,
      api
    ),

    takeEvery(
      StatisticTypes.GET_LIST_USER_STATISTIC_REQUEST,
      getListUserStatistic,
      api
    ),

    takeEvery(
      StatisticTypes.GET_LIST_LOCATION_STATISTIC_REQUEST,
      getListLocationStatistic,
      api
    ),

    takeEvery(
      StatisticTypes.GET_LIST_POST_STATISTIC_REQUEST,
      getListPostStatistic,
      api
    ),

    takeEvery(
      StatisticTypes.GET_LIST_PLAN_STATISTIC_REQUEST,
      getListPlanStatistic,
      api
    ),

    takeEvery(StatisticTypes.GET_STATISTIC_PAGE_REQUEST, getStatisticPage, api),

    takeEvery(FeedbackTypes.GET_LIST_FEEDBACK_REQUEST, getListFeedback, api),

    takeEvery(FeedbackTypes.GET_FEEDBACK_BY_ID_REQUEST, getFeedbackById, api),

    takeEvery(FeedbackTypes.EDIT_FEEDBACK_REQUEST, editFeedback, api),

    takeEvery(FeedbackTypes.DELETE_FEEDBACK_REQUEST, deleteFeedback, api),
    takeEvery(FoodTypes.GET_LIST_FOOD_REQUEST, getListFood, api),
    takeEvery(FoodTypes.GET_FOOD_BY_ID_REQUEST, getFoodById, api),
    takeEvery(FoodTypes.CREATE_FOOD_REQUEST, createFood, api),

    takeEvery(PageTypes.GET_LIST_PAGE_FOOD_REQUEST, getListFoodPage, api),
    takeEvery(PageTypes.GET_LIST_PAGE_REVIEW_REQUEST, getListPageReview, api),
    takeEvery(PageTypes.GET_PAGE_FOOD_BY_ID_REQUEST, getFoodPageById, api),

    takeEvery(
      NotificationTypes.GET_LIST_NOTIFICATION_REQUEST,
      getListNotification,
      api
    ),
    takeEvery(
      PageTypes.GET_LIST_PAGE_FOOD_NEWS_REQUEST,
      getListFoodPageNews,
      api
    ),

    takeEvery(
      NotificationTypes.DELETE_NOTIFICATION_REQUEST,
      deleteNotification,
      api
    ),

    takeEvery(PageTypes.CREATE_PAGE_REQUEST, createPage, api),

    takeEvery(BookingTypes.GET_LIST_BOOKING_REQUEST, getListBooking, api),

    takeEvery(
      BookingTypes.GET_LIST_BOOKING_STAY_REQUEST,
      getListBookingStay,
      api
    ),

    takeEvery(
      BookingTypes.GET_LIST_BOOKING_TOUR_REQUEST,
      getListBookingTour,
      api
    ),

    takeEvery(AmenitiesTypes.GET_LIST_AMENITIES_REQUEST, getListAmenities, api),

    takeEvery(AmenitiesTypes.DELETE_AMENITIES_REQUEST, deleteAmenities, api),

    takeEvery(AmenitiesTypes.CREATE_AMENITIES_REQUEST, createAmenities, api),

    takeEvery(PageTypes.GET_LIST_VERIFY_PAGE_REQUEST, getListVerifyPage, api),

    takeEvery(
      ActivitiesTypes.GET_LIST_ACTIVITIES_REQUEST,
      getListActivities,
      api
    ),

    takeEvery(FacilityTypes.GET_LIST_FACILITY_REQUEST, getListFacility, api),

    takeEvery(FacilityTypes.DELETE_FACILITY_REQUEST, deleteFacility, api),

    takeEvery(FacilityTypes.CREATE_FACILITY_REQUEST, createFacility, api),
    takeEvery(
      CategoryFacilityTypes.GET_LIST_CATEGORY_FACILITY_REQUEST,
      getListCategoryFacility,
      api
    ),

    takeEvery(
      ActivitiesTypes.GET_ACTIVITIES_BY_ID_REQUEST,
      getActivityById,
      api
    ),
    takeEvery(PageTypes.GET_LIST_VERIFY_PAGE_ID_REQUEST, verifyPageDetail, api),

    takeEvery(PageTypes.LOCK_PAGE_REQUEST, lockPage, api),

    takeEvery(PageTypes.DELETE_PAGE_REQUEST, deletePage, api),

    takeEvery(ActivitiesTypes.EDIT_ACTIVITIES_REQUEST, editActivity, api),

    takeEvery(ActivitiesTypes.DELETE_ACTIVITIES_REQUEST, deleteActivity, api),

    takeEvery(ActivitiesTypes.LOCK_ACTIVITIES_REQUEST, lockActivity, api),

    takeEvery(
      CategoryFacilityTypes.DELETE_CATEGORY_FACILITY_REQUEST,
      deleteCategoryFacility,
      api
    ),

    takeEvery(
      CategoryFacilityTypes.CREATE_CATEGORY_FACILITY_REQUEST,
      createCategoryFacility,
      api
    ),

    takeEvery(
      CategoryAmenityTypes.GET_LIST_CATEGORY_AMENITY_REQUEST,
      getListCategoryAmenity,
      api
    ),

    takeEvery(
      CategoryAmenityTypes.DELETE_CATEGORY_AMENITY_REQUEST,
      deleteCategoryAmenity,
      api
    ),

    takeEvery(
      CategoryAmenityTypes.CREATE_CATEGORY_AMENITY_REQUEST,
      createCategoryAmenity,
      api
    ),

    takeEvery(MessengerTypes.CREATE_MESSENGER_REQUEST, senMessenger, api),

    takeEvery(MessengerTypes.EDIT_MESSENGER_REQUEST, editMessenger, api),

    takeEvery(SecurityTypes.GET_BLACK_LIST_IPS_REQUEST, getBlackListIPS, api),

    takeEvery(
      IntegrationConfigTypes.CREATE_INTEGRATION_CONFIGURATION_REQUEST,
      createIntegrationConfiguration,
      api
    ),
  ]);
}
