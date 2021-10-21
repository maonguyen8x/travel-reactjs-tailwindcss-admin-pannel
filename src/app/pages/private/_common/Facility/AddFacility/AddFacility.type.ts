import { RouteComponentProps } from 'react-router-dom';
import { InjectedFormikProps } from 'formik';

export interface IValues {
  facilityId: number;
  FacilityVi: string;
  FacilityEn: string;
}

interface IPageProps extends RouteComponentProps<any> {
  token: any;
}

export type EnhancedProps = InjectedFormikProps<IPageProps, any>;
