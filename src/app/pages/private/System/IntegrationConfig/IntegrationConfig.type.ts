export interface IValues {
  files: any;
  locationId: any;
  name: string;
}

export interface IProps {
  isLoading: boolean;
  setLoading(status: boolean): void;
  history: any;
}
