export interface IProps {
  onSubmit(p: any): void;
  onCancel?(p: any): void;
  submitLabel: any;
  cancelLabel: any;
  isLoading?: boolean;
  isShow?: boolean;
}
