import { InjectedFormikProps } from 'formik';

export type EnhancedProps = InjectedFormikProps<any, any>;

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
  email: string;
  phone: number;
}

export interface IProps {
  props: EnhancedProps;
  token: string;
  currencies: any;
  setFieldValue: any;
  data: any;
  truth: boolean;
}
