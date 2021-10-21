import { RouteComponentProps } from 'react-router-dom';
import { InjectedFormikProps } from 'formik';

export interface IValues {
  amenityVi: string;
  amenityEn: string;
  files: any;
  amenityCategoryId: number;
}

interface IPageProps extends RouteComponentProps<any> {
  token: any;
}

export type EnhancedProps = InjectedFormikProps<IPageProps, any>;
