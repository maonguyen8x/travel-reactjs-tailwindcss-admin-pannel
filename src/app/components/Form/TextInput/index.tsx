import React, { memo } from 'react';
import { Field } from 'formik';
import { IProps } from './type';

const TextInput = (props: IProps) => {
  const {
    label,
    name,
    type = 'text',
    errMessage,
    touched,
    value,
    disabled = false,
    addon,
    onBlur,
    placeholder,
    onChange,
    required,
    maxLength,
  } = props;

  const renderContent = () => (
    <div className="w-full">
      {label && (
        <label>
          <span>{label}</span>
          {required && <span>*</span>}
        </label>
      )}
      <div
        className={`mb-3 flex flex-row w-full ${
          errMessage && touched
            ? 'border-2 border-red-500 border-solid'
            : 'border'
        }`}
      >
        <Field
          name={name}
          type={type}
          className={`flex flex-1 h-16 px-3 bg-gray-100 ${
            disabled && 'bg-gray-200'
          }`}
          value={value}
          disabled={disabled}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
        />
        {addon && <div className="w-20">{addon}</div>}
      </div>
      {touched && <span className="text-red-500 text-xl">{errMessage}</span>}
    </div>
  );

  return renderContent();
};
export default memo(TextInput);
