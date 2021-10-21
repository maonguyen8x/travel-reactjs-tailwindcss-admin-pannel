import { InjectedFormikProps } from 'formik';

export type EnhancedProps = InjectedFormikProps<any, any>;

export interface IValues {
  alias: string;
  content: string;
}
