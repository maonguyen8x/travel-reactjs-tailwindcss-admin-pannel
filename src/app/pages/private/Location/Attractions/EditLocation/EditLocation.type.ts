export interface IProps {
  values: any;
  setValues: any;
}

export interface ILocationItem {
  name: string;
  formatedAddress: string;
  areaLevel2: string;
  country: string;
  areaLevel1: string;
  areaLevel3: string;
  areaLevel4: string;
  areaLevel5: string;
  latitude: number;
  longitude: number;
  averagePoint: any;
}

export interface IValues {
  coordinates: number;
  name: string;
  locationType: string;
  formatedAddress: string;
  country: string;
  district: string;
  center: any;
  address: string;
  location: any;
  ward: string;
  street: any;
  averagePoint: number;
  lng: number;
  lat: number;
  city: string;
  route: string;
  number: string;
}
