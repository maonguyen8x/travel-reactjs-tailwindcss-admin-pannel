export interface ItemActivities {
  name: string;
  country: string;
  timeZone: string;
  district: string;
  ward: string;
  street: string;
  number: number;
  startDay: string;
  endDay: string;
  price: number;
  currencyId: number;
  private: any;
  mediaContents: any;
  introduction: string;
  activityDetail: any;
  formatedAddress: string;
  areaLevel2: string;
  areaLevel1: string;
  areaLevel3: string;
  areaLevel4: string;
  areaLevel5: string;
  latitude: number;
  longitude: number;
  location: any;
  from: any;
  to: any;
  address: any;
  setCoordinate: any;
  coordinate: any;
}

export interface IProps {
  isLoading: boolean;
  activityDetail: any;
  setLoading(status: boolean): void;
  history: any;
  setCoordinate: any;
  coordinate: any;
}

export interface IValues {
  name: string;
  country: string;
  files: [];
  mediaContents: any;
  locationId: any;
  address: string;
  lat: number;
  lng: number;
  timeZone: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  houseNumber: number;
  startDay: string;
  endDay: string;
  price: number;
  currencyId: number;
  private: any;
  introduction: string;
  location: any;
  coordinates: string;
  center: any;
  formatedAddress: string;
  from: any;
  to: any;
  number: string;
  startDate: string;
  fromHour: string;
  endDate: string;
  toHour: string;
}
