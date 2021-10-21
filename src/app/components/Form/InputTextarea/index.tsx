import React, { memo } from 'react';
import { Field } from 'formik';
import { IProps } from './type';

const InputTextarea = (props: IProps) => {
  const {
    name,
    errMessage,
    touched,
    value,
    disabled,
    onChange,
    label,
    rows = 4,
    icon,
    maxLength,
  } = props;

  return (
    <div className="mt-8">
      <label className="text-xl font-medium text-gray-700 flex items-center">
        {icon && <img className="w-6 h-6 mr-3" src={icon} alt="icon" />}
        <span>{label}</span>
      </label>
      <div
        className={`mb-3 flex flex-row w-full ${
          errMessage && touched
            ? 'border-2 border-red-500 border-solid'
            : 'border'
        }`}
      >
        <Field
          as="textarea"
          type="textarea"
          name={name}
          rows={rows}
          value={value}
          disabled={disabled}
          className={`${
            errMessage && touched ? ' is-invalid' : ''
          } flex flex-1 h-auto p-3 bg-gray-100`}
          onChange={onChange}
          maxLength={maxLength}
        />
      </div>
      {touched && <span className="text-red-500 text-xl">{errMessage}</span>}
    </div>
  );
};
export default memo(InputTextarea);
