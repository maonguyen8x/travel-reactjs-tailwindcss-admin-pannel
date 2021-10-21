import React, { memo } from 'react';
import { InputGroupAddon } from 'reactstrap';
import { ErrorMessage, Field } from 'formik';
import NumberFormat from 'react-number-format';
import { IProps } from './type';

const CurrencyInput = (props: IProps) => {
  const {
    label,
    name,
    errMessage,
    touched,
    value,
    disabled = false,
    addon,
    onChange,
  } = props;

  return (
    <div className="mb-4">
      <label>
        <span>{label}</span>
      </label>
      <Field as="input">
        {() => (
          <NumberFormat
            thousandSeparator
            id="form-group"
            name={name}
            value={value}
            disabled={disabled}
            className={errMessage && touched ? ' is-invalid' : ''}
            onChange={onChange}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
      {addon && <InputGroupAddon addonType="append">{addon}</InputGroupAddon>}
    </div>
  );
};
export default memo(CurrencyInput);
