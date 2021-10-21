import { InjectedFormikProps } from 'formik';
import { RouteComponentProps } from 'react-router-dom';

interface IPageProps extends RouteComponentProps<any> {
  profile: any;
}

export type EnhancedProps = InjectedFormikProps<IPageProps, any>;

export interface IPropfileItem {
  profiles: any;
  introduce: string;
  gender: string;
  birthday: string;
  address: string;
  phone: number;
  website: string;
  work: string;
  education: string;
  email: any;
  name: string;
}

export interface IProps {
  submitForm: any;
  isSubmitting: boolean;
  setFieldValue: any;
  errors: any;
  touched: any;
  values: any;
}

export interface IValues {
  introduce: string;
  gender: string;
  birthday: any;
  address: string;
  website: string;
  education: string;
  work: string;
  phone: string;
  email: string;
}
