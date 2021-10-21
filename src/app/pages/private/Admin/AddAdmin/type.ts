import { InjectedFormikProps } from 'formik';

export type EnhancedProps = InjectedFormikProps<IProps, any>;

export interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
  searchType?: string;
  fromDate?: string;
  toDate?: string;
}

export interface IProps {
  props: EnhancedProps;
}
