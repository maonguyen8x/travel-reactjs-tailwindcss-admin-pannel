import React, { memo, useState } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupButtonDropdown,
} from 'reactstrap';
import { t } from 'app/i18n';
import { IProps } from './type';

const Currencies = (props: IProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const { currencies, value, name, setFieldValue, disabled } = props;
  const handleOnClick = (currencyId: any) => {
    setFieldValue(name, currencyId);
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <InputGroupButtonDropdown
      addonType="append"
      isOpen={dropdownOpen}
      toggle={toggleDropDown}
      disabled={disabled}
    >
      <DropdownToggle caret>
        {value && value > 0 ? currencies[value - 1]?.code : currencies[0]?.code}
      </DropdownToggle>
      <DropdownMenu className="absolute overflow-y-scroll h-50vh">
        <DropdownItem header>{t('APP.CURRENCIES')}</DropdownItem>
        {currencies &&
          currencies.map((item: any) => (
            <DropdownItem
              disabled={disabled}
              key={item.id}
              onClick={() => handleOnClick(item.id)}
            >
              {item.code}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </InputGroupButtonDropdown>
  );
};
export default memo(Currencies);
