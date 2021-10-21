import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../sagas';
import { AppReducer } from './AppRedux';
import { StayReducer } from './StayRedux';
import { AuthReducer } from './AuthRedux';
import { LocationReducer } from './LocationRedux';
import { SettingReducer } from './SettingRedux';
import { UserReducer } from './UserRedux';
import { PostReducer } from './PostRedux';
import { TourReducer } from './TourRedux';
import { ReportReducer } from './ReportRedux';
import { MediaContentReducer } from './MediaContentRedux';
import { PolicyReducer } from './PolicyRedux';
import { PlanReducer } from './PlanRedux';
import { StatisticReducer } from './StatisticRedux';
import { FeedbackReducer } from './FeedbackRedux';
import { FoodReducer } from './FoodRedux';
import { PageReducer } from './PageRedux';
import { NotificationReducer } from './NoticationRedux';
import { ActivitiesReducer } from './ActivitiesRedux';
import { FacilityReducer } from './FacilityRedux';
import { BookingReducer } from './BookingRedux';
import { AmenitiesReducer } from './AmenitiesRedux';
import { CategoryFacilityReducer } from './CategoryFacilityRedux';
import { CategoryAmenityReducer } from './CategoryAmenityRedux';
import { SecurityReducer } from './SecurityRedux';
import { IntegrationConfigurationReducer } from './IntegrationConfigRedux';
import immutablePersistenceTransform from '../ImmutablePersistenceTransform';
import { MessengerReducer } from './MessengerRedux';
import { TableReducer } from './TableRedux';
// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const ReduxPersist = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage,
    // Reducer keys that you do NOT want stored to persistence here.
    // blacklist: ['login', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    whitelist: ['app', 'table'],
    transforms: [immutablePersistenceTransform],
  },
};

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers<any, any>({
  // app store
  app: AppReducer,
  table: TableReducer,
  // auth store
  auth: AuthReducer,
  // logic store
  location: LocationReducer,
  post: PostReducer,
  user: UserReducer,
  plan: PlanReducer,
  statistic: StatisticReducer,
  feedback: FeedbackReducer,
  setting: SettingReducer,
  report: ReportReducer,
  tour: TourReducer,
  mediaContent: MediaContentReducer,
  policy: PolicyReducer,
  food: FoodReducer,
  page: PageReducer,
  notification: NotificationReducer,
  stay: StayReducer,
  activities: ActivitiesReducer,
  booking: BookingReducer,
  facility: FacilityReducer,
  categoryFacility: CategoryFacilityReducer,
  categoryAmenity: CategoryAmenityReducer,
  amenities: AmenitiesReducer,
  messenger: MessengerReducer,
  security: SecurityReducer,
  integrationConfiguration: IntegrationConfigurationReducer,
});

const middleware: any = [
  sagaMiddleware,
  //  DEBUG && logger
].filter(Boolean);

export function configureStore() {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig;
    finalReducers = persistReducer(persistConfig, reducers);
  }

  const store = createStore(finalReducers, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);

  return store;
}
