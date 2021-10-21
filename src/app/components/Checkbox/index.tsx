import React, { memo } from 'react';
import { IProps } from './type';

const CheckBox = (props: IProps) => {
  const { label, onChange, checked, value, disabled } = props;

  const renderContent = () => (
    <div className="mt-2 flex items-baseline">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="scale-50"
        value={value}
        disabled={disabled}
      />
      <label className="px-2">
        <span>{label}</span>
      </label>
    </div>
  );

  return renderContent();
};
export default memo(CheckBox);
