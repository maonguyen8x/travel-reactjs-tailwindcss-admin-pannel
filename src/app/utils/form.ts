import { getIn } from 'formik';

interface IProps {
  values: any;
  touched: any;
  errors: any;
  handleChange: (name: string) => void;
  setFieldTouched: any;
  setFieldValue?: any;
}

export const getFieldProps = (name: string, props: IProps) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
    setFieldValue
  } = props;

  return {
    onChangeText: handleChange(name),
    value: getIn(values, name) || '',
    touched: getIn(touched, name),
    errMessage: getIn(errors, name),
    onBlur: () => setFieldTouched(name),
    onChange: (e: any) => setFieldValue(name, e.target.value),
    name
  };
};

export const getFieldAddressProps = (name: string, props: IProps) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    setFieldTouched,
  } = props;

  return {
    onChangeText: handleChange(name),
    value: getIn(values, name) || '',
    touched: getIn(touched, name),
    errMessage: getIn(errors, name),
    onBlur: () => setFieldTouched(name),
    name,
  };
};

export const getFieldEditorProps = (name: string, props: IProps) => {
  const { values, setFieldValue } = props;

  return {
    value: getIn(values, name) || '',
    onChange: (value: any) => setFieldValue(name, value)
  };
};

export const getFieldAutocompleteProps = (name: string, props: IProps) => {
  const { values, touched, errors, setFieldTouched } = props;

  return {
    value: getIn(values, name) || '',
    touched: getIn(touched, name),
    errMessage: getIn(errors, name),
    onBlur: () => setFieldTouched(name),
    name
  };
};
