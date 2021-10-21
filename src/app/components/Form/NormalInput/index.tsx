import React, { memo } from 'react';
import { InputGroupAddon } from 'reactstrap';
import { IProps } from './type';

const NormalInput = (props: IProps) => {
  const { label, value, addon, disabled = false, className, onChange } = props;

  return (
    <div className="mb-4">
      <label>
        <span>{label}</span>
      </label>
      <div>
        <input
          className={`w-full h-16 px-3 border bg-gray-100 ${
            className && 'text-red-500 !important'
          }`}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
        {addon && <InputGroupAddon addonType="append">{addon}</InputGroupAddon>}
      </div>
    </div>
  );
};
export default memo(NormalInput);
