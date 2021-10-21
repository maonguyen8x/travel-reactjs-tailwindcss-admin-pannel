export interface IValues {
  files: any;
  locationId: number;
  content: string;
  location: any;
  lat: number;
  lng: number;
  coordinates: string;
  address: string;
  formatedAddress: string;
  street: string;
  houseNumber: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  price: number;
  introduce: string;
  startDate: string;
  fromHour: string;
  endDate: string;
  toHour: string;
  name: string;
  accessType: string;
  media: any;
}

export interface IProps {
  fetching: boolean;
  history: any;
}
