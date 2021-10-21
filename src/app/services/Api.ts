import apisauce from 'apisauce';
import { BASE_API } from '../constants';

const create = () => {
  const api = apisauce.create({
    baseURL: BASE_API,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  const apiUpload = apisauce.create({
    baseURL: BASE_API,
    headers: {},
    timeout: 10000,
  });

  const getUserMe = (token: string) => {
    api.setHeader('Authorization', `Bearer ${token}`);
    apiUpload.setHeader('Authorization', `Bearer ${token}`);
    return api.get('user/me');
  };

  const register = (user: any) => api.post('register', user);

  const createUserActive = (user: any) => api.post('user', user);

  const verify = (code: any) => api.post('verify', code);

  const login = (account: any) => api.post('admin/login', account);

  const changeRoles = (body: any) => api.post('/admin/user/change-role', body);

  const getRolesScopes = () => api.get('/admin/roles-scopes');

  const getRolesScopesById = (id: string) =>
    api.get(`/admin/user/roles-scopes/${id}`);

  const listUser = (filter?: any) => api.get('admin/user', filter);

  const getUserById = (id: number) => api.get(`admin/user/${id}`);

  const userAvatar = (avatar: any) => api.put('avatar', avatar);

  const userProfile = (profile: any) => api.put('profiles', profile);

  const userBackground = (background: any) => api.put('background', background);

  const wishList = (id: number, filter = '') =>
    api.get(`admin/user/${id}/my-map`, filter);

  const getBlockersByUser = (filter: string) => api.get('users/block', filter);

  const lockUser = (id: number, body: any) =>
    api.post(`admin/user/${id}/block`, body);

  const unLockUser = (id: number) => api.post(`admin/user/${id}/unblock`);

  const bookMarks = (filter: string) => api.get('bookmarks', filter);

  const interestings = (filter: string) => api.get('interestings', filter);

  const followers = (id: number, filter: string) =>
    api.get(`user/${id}/followers`, filter);

  const followings = (id: number, filter: string) =>
    api.get(`user/${id}/followings`, filter);

  const planByUser = (filter: string) => api.get('admin/plans', filter);

  const planCount = (filter = '') => api.get('plans/count', filter);

  const getListPlan = (filter: any) => api.get('admin/plans', filter);

  const getplanById = (id: number) => api.get(`admin/plans/${id}`);

  const searchTimePlan = (filter = '') => api.get('plans', filter);

  const listPost = (filter?: any) => api.get('admin/posts', filter);

  const listPostByLocationId = (id: number, filter?: any) =>
    api.get(`admin/locations/${id}/posts`, filter);

  const getPostById = (id: number) => api.get(`admin/posts/${id}`);

  const lockPost = (id: number, body: any) =>
    api.post(`admin/post/${id}/block`, body);

  const unLockPost = (id: number) => api.post(`admin/post/${id}/unblock`);

  const getLocations = (filter = '') => api.get('locations', filter);

  const getListCheckLocationDuplicate = (filter: any) =>
    api.get('admin/db/locations', filter);

  const getBookmarkLocations = (id: number, filter: any) =>
    api.get(`admin/bookmark-location/${id}`, filter);

  const getRequestChangeLocations = (filter = '') =>
    api.get('admin/locations/change-requests', filter);

  const deleteLocation = (id: number) => api.delete(`locations/${id}`);

  const deleteActivity = (id: number) => api.delete(`admin/activity/${id}`);

  const editLocation = (id: number, body: any) =>
    api.put(`admin/locations/${id}`, body);

  const getLocationsAdmin = (filter?: any) =>
    api.get('admin/locations', filter);

  const getListLocationsDuplicated = (filter?: any) =>
    api.get('admin/duplicated-locations', filter);

  const chooseLocationCreated = (filter = '') =>
    api.get(`user/posts/location${filter}`);

  const searchTimeLocation = (filter = '') =>
    api.get('admin/locations', filter);

  const locationStatistic = (filter = '') =>
    api.get('locations/statistic', filter);

  const postStatistic = (filter = '') => api.get('posts/statistic', filter);

  const userStatistic = (filter = '') => api.get('users/statistic', filter);

  const planStatistic = (filter = '') => api.get('plans/statistic', filter);

  const pageStatistic = (filter = '') => api.get('pages/statistic', filter);

  const dashboardStatistic = () => api.get('dashboard/statistic');

  const postPost = (post: any) => api.post('admin/posts', post);

  const deletePost = (id: number) => api.delete(`posts/${id}`);

  const editPost = (id: number, body: any) =>
    api.put(`admin/posts/${id}`, body);

  const commentPost = (filter: string) => api.get(`comments${filter}`);

  const sharePost = (id: number, filter: string) =>
    api.get(`post/${id}/shares${filter}`);

  const getRanking = (filter: string) => api.get('rankings', filter);

  const getLocationCheckin = (id: number, filter = '') =>
    api.get(`location/${id}/list-check-in`, filter);

  const likePost = (id: number, filter: string) =>
    api.get(`likes/post/${id}${filter}`);

  const createLocation = (location: any) =>
    api.post('admin/locations', location);

  const locationId = (id: number, filter: string) =>
    api.get(`locations/${id}${filter}`);

  const searchPost = (filter: string) => api.get(`posts/search${filter}`);

  const searchTimePost = (filter = '') => api.get('posts', filter);

  const filterStatus = (filter = '') => api.get('posts', filter);

  const filterUser = (filter = '') => api.get('posts', filter);

  const searchUser = (filter = '') => api.get('user/search', filter);

  const getUserIdPost = (id: number, filter = '') =>
    api.get(`user/${id}/posts`, filter);

  const listStay = (filter: string) => api.get(`services${filter}`);

  const createStay = (stay: any) => api.post('services', stay);

  const editStay = (id: number, stay: any) => api.put(`services/${id}`, stay);

  const deleteStay = (id: number) => api.delete(`services/${id}`);

  const stayId = (id: number) => api.get(`services/${id}`);

  const upload = (files: any) => apiUpload.post('media-contents/upload', files);

  const getLocationId = (id: number) => api.get(`admin/locations/${id}`);

  const lockLocation = (id: number, body: any) =>
    api.post(`admin/locations/${id}/block`, body);

  const unLockLocation = (id: number) =>
    api.post(`admin/locations/${id}/unblock`);

  const getRequestChangeLocationId = (id: number) =>
    api.get(`admin/locations/change-requests/${id}`);

  const changeStatusRequestLocation = (id: number, status: string, body: any) =>
    api.post(`admin/locations/change-request/${id}/${status}`, body);

  const getUserIdLocation = (filter: string) =>
    api.get(`admin/locations${filter}`);

  const listPostFilter = (filter: string) => api.get(`posts${filter}`);

  const createStaySubServices = (staySubServices: any) =>
    api.post('sub_services', staySubServices);

  const staySubServicesById = (id: number) => api.get(`sub_services/${id}`);

  const tourCount = (filter = '') => api.get('services/count', filter);

  const listPages = (filter = '') => api.get('admin/pages', filter);

  const deletePage = (id: number, body: any) =>
    api.delete(`admin/pages/${id}`, body);

  const getPageId = (id: number, filter = '') =>
    api.get(`admin/pages/${id}`, filter);

  const listServices = (filter = '') => api.get('services', filter);

  const listPageReviews = (filter = '') => api.get('page-reviews', filter);

  const createTour = (tour: any) => api.post('services', tour);

  const deleteService = (id: number) => api.delete(`services/${id}`);

  const editTour = (id: number, body: any) => api.put(`services/${id}`, body);

  const getCurrency = () => api.get('currencies');

  const listReport = (filter: '') => api.get('admin/reports', filter);

  const getReportId = (id: number, filter = '') =>
    api.get(`admin/reports/${id}`, filter);

  const getMediaContents = (filter = '') => api.get('media-contents', filter);

  const deleteMediaContent = (id: number) =>
    api.delete(`media-contents/upload/${id}`);

  const searchTimeMediaContents = (fillter = '') =>
    api.get(`media-contents${fillter}`);

  const listPolicy = (filter = '') => api.get('static-page', filter);

  const policyById = (id: number) => api.get(`static-page/${id}`);

  const createPolicy = (policy: any) => api.post('static-page', policy);

  const editPolicy = (id: number, policy: any) =>
    api.put(`static-page/${id}`, policy);

  const aliasPolicy = (alisa: any) => api.get(`static-page/alias/${alisa}`);

  const getBackgroundPosts = (filter: any) =>
    api.get('background-posts', filter);

  const deleteBackgroundPost = (id: number) =>
    api.delete(`background-posts/${id}`);

  const uploadBackground = (files: any) =>
    apiUpload.post('background_post/upload', files);

  const createBackgroundPost = (background: any) =>
    api.post('background-posts', background);

  const editBackgroundPost = (id: number, body: any) =>
    api.put(`background-posts/${id}`, body);

  const getBackgroundPostById = (id: number, filter = '') =>
    api.get(`background-posts/${id}${filter}`);

  const getCountLocation = (filter = '') => api.get('locations/count', filter);

  const getCountBackgroundPost = () => api.get('background-posts/count');

  const getCountBookmarks = () => api.get('bookmarks/count');

  const getCountLike = () => api.get('likes/count');

  const getCountComments = () => api.get('comments/count');

  const getCountPost = (filter = '') => api.get('posts/count', filter);

  const getCountShare = () => api.get('shares/count');

  const getCountRanking = () => api.get('rankings/count');

  const getCountReport = (filter = '') => api.get('reports/count', filter);

  const getCountMediaContent = (filter = '') =>
    api.get('media-contents/count', filter);

  const editReport = (id: number, body: any) =>
    api.patch(`admin/reports/${id}`, body);

  const getListFeedback = (filter = '') => api.get('admin/feedback', filter);

  const feedbackById = (id: number) => api.get(`admin/feedback/${id}`);

  const editFeedback = (id: number, body: any) =>
    api.patch(`admin/feedback/${id}`, body);

  const deleteFeedback = (id: number) => api.delete(`admin/feedback/${id}`);

  const getListFood = (filter = '') => api.get('services', filter);

  const foodCount = (filter = '') => api.get('services/count', filter);

  const getFoodById = (id: number, filter = '') =>
    api.get(`services/${id}`, filter);

  const getListPage = (filter = '') => api.get('admin/pages', filter);

  const getPageById = (id: number, filter: string) =>
    api.get(`admin/pages/${id}`, filter);

  const getPageServiceById = (id: number, filter: string) =>
    api.get(`page/${id}/services`, filter);

  const getListPageReview = (filter = '') => api.get('page-reviews', filter);

  const pageReviewCount = (filter = '') =>
    api.get('page-reviews/count', filter);

  const createPage = (body: any) => api.post('admin/pages', body);

  const listNotification = (filter = '') => api.get('notifications', filter);

  const deleteNotification = (id: number) => api.delete(`notifications/${id}`);

  const countNotification = () => api.get('notifications/count');

  const createTourService = (tour: any) => api.post('services/tour', tour);

  const createFood = (food: any) => api.post('services/food', food);

  const bookmarkActivities = (filter = '') =>
    api.get('activity-bookmarks', filter);

  const bookmarkActivitiesCount = (filter = '') =>
    api.get('activity-bookmarks/count', filter);

  const listActivities = (filter = '') => api.get('admin/activities', filter);

  const lockActivity = (id: number, body: any) =>
    api.post(`admin/activity/${id}/block`, body);

  const unLockActivity = (id: number) =>
    api.post(`admin/activity/${id}/unblock`);

  const activitiesId = (id: string) => api.get(`activities/${id}`);

  const createdActivity = (body: any) => api.post('admin/activities', body);

  const listBooking = (filter = '') => api.get('admin/bookings', filter);

  const getBookingStay = (filter = '') => api.get('bookings/stay', filter);

  const getBookingStayById = (id: number) => api.get(`booking-stay/${id}`);

  const getBookingTour = (filter = '') => api.get('bookings/tour', filter);

  const getBookingTourById = (id: number) => api.get(`booking-tour/${id}`);

  const getCountBookings = (filter = '') => api.get('bookings/count', filter);

  const getBookingsById = (id: number, filter: string) =>
    api.get(`bookings/${id}`, filter);

  const getListAmenities = (filter = '') => api.get('amenities', filter);

  const getCountAmenities = (filter = '') => api.get('amenities/count', filter);

  const deleteAmenities = (id: number) => api.delete(`amenities/${id}`);
  const pageId = (id = '') => api.get(`admin/pages/${id}`);

  const listVerifyPage = (filter = '') =>
    api.get('pages/verifications', filter);

  const verifyPageId = (id: string) => api.get(`page/verifications/${id}`);

  const lockPage = (id: number, body: any) =>
    api.post(`admin/pages/${id}/block`, body);

  const unLockPage = (id: number) => api.post(`admin/pages/${id}/unblock`);

  const activitiesJoin = (id: string, filter = '') =>
    api.get(`activities/${id}/participants`, filter);

  const editActivities = (id: number, activities: any) =>
    api.patch(`activities/${id}`, activities);

  const createAmenities = (amenities: any) => api.post('amenities', amenities);

  const getListFacility = (filter = '') => api.get('facilities', filter);

  const getCountFacility = (filter = '') => api.get('facilities/count', filter);

  const deleteFacility = (id: number) => api.delete(`facilities/${id}`);

  const createFacility = (facilities: any) =>
    api.post('facilities', facilities);

  const getListCategoryFacility = (filter = '') =>
    api.get('facility-categories', filter);

  const getCountCategoryFacility = (filter = '') =>
    api.get('facility-categories/count', filter);

  const deleteCategoryFacility = (id: number) =>
    api.delete(`facility-categories/${id}`);

  const createCategoryFacility = (categoryFacilities: any) =>
    api.post('facility-categories', categoryFacilities);

  const getListCategoryAmenity = (filter = '') =>
    api.get('amenity-categories', filter);

  const getCountCategoryAmenity = (filter = '') =>
    api.get('amenity-categories/count', filter);

  const deleteCategoryAmenity = (id: number) =>
    api.delete(`amenity-categories/${id}`);

  const createCategoryAmenity = (categoryAmenity: any) =>
    api.post('amenity-categories', categoryAmenity);

  const editCategoryAmenity = (id: number, categoryAmenity: any) =>
    api.patch(`amenity-categories/${id}`, categoryAmenity);

  const getCategoryAmenityById = (id: number) =>
    api.get(`amenity-categories/${id}`);

  const getAmenities = (filter: any) => api.get('amenities', filter);

  const createAmenity = (data: any) => api.post('amenities', data);

  const editAmenity = (id: number, data: any) =>
    api.patch(`amenities/${id}`, data);

  const getAmenityById = (id: number) => api.get(`amenities/${id}`);

  const listReviewBooking = (filter = '') => api.get('service-reviews', filter);

  const addMessenger = (message: string) =>
    api.post('create-message-system', message);

  const listMessenger = (filter: any) => api.get('messages-system', filter);

  const editMessenger = (message: string) =>
    api.put('update-message-system', message);

  const deleteMessenger = (message: any) =>
    api.post('delete-message-system', message);

  const getListLikes = (id: number, type: string, filter: any) =>
    api.get(`admin/likes/${type}/${id}`, filter);
  const getListComments = (filter: any) => api.get('admin/comments', filter);
  const getListRanking = (filter: any) => api.get('admin/rankings', filter);

  const addPointRanking = (body: any) => api.post('rankings', body);

  const getBlackListIPS = (filter = '') => api.get('admin/security', filter);

  const deleteIPAddress = (id: number) => api.delete(`admin/security/${id}`);

  const createIntegrationConfiguration = (data: any) =>
    api.post('admin/integration-config', data);

  return {
    // user
    getUserMe,
    userProfile,
    userBackground,
    createUserActive,
    register,
    verify,
    login,
    changeRoles,
    getRolesScopes,
    getRolesScopesById,
    listUser,
    getUserById,
    userAvatar,
    wishList,
    bookMarks,
    interestings,
    followers,
    followings,
    getBlockersByUser,
    searchUser,
    getCountBookmarks,
    planByUser,
    lockUser,
    unLockUser,

    // Media Content
    getMediaContents,
    deleteMediaContent,
    searchTimeMediaContents,
    getBackgroundPosts,
    deleteBackgroundPost,
    uploadBackground,
    createBackgroundPost,
    editBackgroundPost,
    getBackgroundPostById,
    getCountBackgroundPost,
    getCountMediaContent,

    // location
    getLocations,
    getListLocationsDuplicated,
    getListCheckLocationDuplicate,
    searchTimeLocation,
    createLocation,
    getLocationId,
    listPostFilter,
    getUserIdLocation,
    getLocationsAdmin,
    deleteLocation,
    deleteActivity,
    getRequestChangeLocations,
    chooseLocationCreated,
    getCountLocation,
    getRequestChangeLocationId,
    changeStatusRequestLocation,
    getLocationCheckin,
    listPostByLocationId,
    lockLocation,
    unLockLocation,
    editLocation,
    getBookmarkLocations,

    // statistic
    locationStatistic,
    postStatistic,
    userStatistic,
    planStatistic,
    dashboardStatistic,
    pageStatistic,

    // posts
    listPost,
    postPost,
    getPostById,
    deletePost,
    editPost,
    commentPost,
    sharePost,
    getRanking,
    likePost,
    locationId,
    searchPost,
    searchTimePost,
    getUserIdPost,
    filterStatus,
    filterUser,
    getCountLike,
    getCountComments,
    getCountPost,
    getCountShare,
    getCountRanking,
    lockPost,
    unLockPost,

    // services
    listStay,
    createStay,
    editStay,
    deleteStay,
    stayId,
    upload,
    createStaySubServices,
    staySubServicesById,
    listPages,
    createTour,
    getPageId,
    deleteService,
    editTour,
    getCurrency,
    getListFood,
    foodCount,
    getFoodById,
    createTourService,

    // getCountFood,
    tourCount,
    listServices,
    listPageReviews,

    // report
    listReport,
    getCountReport,
    editReport,
    getReportId,

    // policy
    listPolicy,
    policyById,
    createPolicy,
    editPolicy,
    aliasPolicy,

    // plan
    planCount,
    getListPlan,
    getplanById,
    searchTimePlan,

    // Feedback

    getListFeedback,
    feedbackById,
    editFeedback,
    deleteFeedback,

    // Security
    getBlackListIPS,
    deleteIPAddress,
    createIntegrationConfiguration,

    // Pages
    getListPage,
    getPageById,
    getPageServiceById,
    getListPageReview,
    pageReviewCount,
    createPage,
    listVerifyPage,
    pageId,
    deletePage,
    lockPage,
    unLockPage,

    // notification

    listNotification,
    countNotification,
    deleteNotification,

    bookmarkActivities,
    bookmarkActivitiesCount,

    // servies
    createFood,
    verifyPageId,

    // Facility
    getListFacility,
    getCountFacility,
    deleteFacility,
    createFacility,

    listActivities,
    activitiesId,
    createdActivity,
    lockActivity,
    unLockActivity,

    // booking
    listBooking,
    getCountBookings,
    getBookingsById,
    activitiesJoin,
    editActivities,
    getBookingStay,
    getBookingStayById,
    getBookingTour,
    getBookingTourById,
    // Amenities
    getListAmenities,
    getCountAmenities,
    deleteAmenities,
    createAmenities,

    // CategoryFacility
    getListCategoryFacility,
    getCountCategoryFacility,
    createCategoryFacility,
    deleteCategoryFacility,

    // CategoryAmenity
    getListCategoryAmenity,
    getCountCategoryAmenity,
    deleteCategoryAmenity,
    createCategoryAmenity,
    editCategoryAmenity,
    getCategoryAmenityById,

    // Amenities
    getAmenities,
    createAmenity,
    editAmenity,
    getAmenityById,

    // review
    listReviewBooking,

    // messenger

    addMessenger,
    listMessenger,
    editMessenger,
    deleteMessenger,

    // likes
    getListLikes,
    getListComments,
    getListRanking,

    // rankings
    addPointRanking,
  };
};
const Api = create();

export default Api;
