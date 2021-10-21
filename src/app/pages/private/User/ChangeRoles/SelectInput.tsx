import { t } from 'app/i18n';
import React, { memo } from 'react';
import { Dropdown, Col } from 'react-bootstrap';
import './select.scss';

const SelectInput = (props: any) => {
  const { value, onChange, data, label } = props;
  const dataSelected = data.find((item: any) => item.name === value);

  return (
    <div className="custom-dropdown">
      <label className="font-medium text-xl">{label}</label>
      <Dropdown className={'custom-dropdown'}>
        <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
          {dataSelected?.name || t('roles.select')}
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu">
          {data?.map((option: any, index: string) => (
            <Dropdown.Item
              onClick={() => {
                onChange(option.name);
              }}
              key={index}
            >
              <ul>
                <li
                  className={`${
                    option?.name === dataSelected?.name && 'active'
                  }`}
                >
                  {option.name}
                </li>
              </ul>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default memo(SelectInput, (oldProps, newProps) => {
  if (
    oldProps.value !== newProps?.value ||
    oldProps?.data !== newProps?.data ||
    oldProps?.label !== newProps?.label
  ) {
    return false;
  }
  return true;
});
