export interface IProps {
  value?: any;
  onChange?: any;
  label?: string;
  name?: any;
  as?: any;
  md?: any;
  errMessage?: any;
  touched?: any;
  onBlur?: any;
  required?: any;
  defaultValue?: any;
  onChangeCoordinates?: any;
  isButton?: boolean;
}

export interface IMap {
  center?: any;
  onDragMarker?: any;
  draggable?: boolean;
  zoom?: any;
  height?: string;
  style?: { width: string };
  onChangePlace?: any;
  onChangePlaceTour?: (p: any) => void;
  options?: any;
  setDataMarker?: any;
  onChangeCoordinates?: any;
  infoWindow?: string;
  defaultValues?: any;
  onMarkerDragEnd?: any;
  isGetAddressFromCoordinates?: boolean;
}

export interface ISearch {
  onChangePlace: any;
  defaultValue?: string;
}
