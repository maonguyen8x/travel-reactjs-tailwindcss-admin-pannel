import React from 'react';
import { Dropdown, Col } from 'react-bootstrap';
import { BoxDropdown } from './styled';
import { IProps } from './type';

const SelectInput = (props: IProps) => {
  const { value, onChange, data, label, as, md, className } = props;
  const dataSelected = data.find((item: any) => item.value === value);

  return (
    <BoxDropdown>
      {label && <span>{label}</span>}
      <Dropdown className={`custom-dropdown ${className}`}>
        <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
          {dataSelected?.name}
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu">
          {data?.map((option: any, index: string) => (
            <Dropdown.Item
              onClick={() => {
                onChange(option.value);
              }}
              key={index}
            >
              <ul className="ul">
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
    </BoxDropdown>
  );
};

export default SelectInput;
