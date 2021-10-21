export interface IProps {
  label?: any;
  value: any;
  disabled?: boolean;
  addon?: any;
  as?: any;
  className?: string;
  md?: number | string;
  onChange?(e: any): void;
}
