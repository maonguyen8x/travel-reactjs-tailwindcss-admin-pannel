import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { IProps } from './type';

const Dropdowns = (props: IProps) => {
  const { label, dataDefault, size, value } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown size={size} isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle color="primary" caret>
        {label}
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data: any) => ({
              ...data,
              styles: {
                ...data.styles,
                overflow: 'auto',
                maxHeight: '170px',
              },
            }),
          },
        }}
      >
        {dataDefault &&
          dataDefault.map((option: any, index: string) => (
            <DropdownItem value={value} key={index}>
              {option.name}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default Dropdowns;
