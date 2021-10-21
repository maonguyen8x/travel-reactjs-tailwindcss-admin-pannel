import React, { useState, useLayoutEffect, memo, useEffect } from 'react';
import { t } from 'app/i18n';
import { IProps } from './type';
import { getResultSearchAutoCompletedTypes } from '../../utils';
import { DASHBOARD_TYPES } from '../../constants';

const Autocomplete = ({
  data = [],
  onChangeSearch,
  label,
  getValueSearch,
  searchType,
  valueSearch,
}: IProps) => {
  const [state, setState] = useState<any>({
    active: null,
    showOptions: false,
    name: '',
  });
  const { showOptions, name, active } = state;

  useLayoutEffect(() => {
    if (!!valueSearch && typeof valueSearch === 'string') {
      setState({
        name: valueSearch,
      });
    }
  }, [valueSearch]);

  useEffect(() => {
    if (data.length > 0) {
      setState({ ...state, showOptions: true });
    } else {
      setState({ ...state, showOptions: false });
    }
  }, [data?.length]);

  const onChangeKeyword = (e: any) => {
    const { value } = e.currentTarget;
    setState({
      ...state,
      active: null,
      showOptions: true,
      name: value,
    });
    if (e?.target?.value?.length <= 1) return;
    onChangeSearch(e?.target?.value);
  };

  const onSelect = (e: any) => () => {
    setState({
      ...state,
      active: 0,
      showOptions: false,
      name: getResultSearchAutoCompletedTypes(searchType, e),
    });
    getValueSearch(e);
  };

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const values = data?.[active];
      setState({
        ...state,
        active: 0,
        showOptions: false,
        name: getResultSearchAutoCompletedTypes(searchType, values),
      });
      getValueSearch(values);
    } else if (e.keyCode === 38) {
      const values = data?.[active - 1];
      if (active === 0) {
        return;
      }
      setState({
        ...state,
        active: active - 1,
        name: getResultSearchAutoCompletedTypes(searchType, values),
      });
    } else if (e.keyCode === 40) {
      const values = data?.[active + 1];
      const index = data?.length - 1;
      const newValue = values
        ? getResultSearchAutoCompletedTypes(searchType, values)
        : getResultSearchAutoCompletedTypes(searchType, data?.[index]);
      if (active - 1 === data?.length) {
        return;
      }
      setState({
        ...state,
        name: newValue,
        active: active + 1 > index ? index : active + 1,
      });
    }
  };

  return (
    <div className="z-10 w-full">
      <label
        htmlFor="search-location"
        className={`text-xl font-medium text-gray-700 ${
          !label ? 'd-none' : ''
        }`}
      >
        {label}
      </label>
      <div className=" relative">
        {data && (
          <input
            autoComplete="off"
            className="w-full h-16 pl-16 pr-2 border bg-gray-100"
            type="search"
            id="search-location"
            name="search-location"
            onChange={onChangeKeyword}
            value={name || ''}
            onKeyDown={onKeyDown}
            placeholder={t('search.input.placeholder')}
          />
        )}
        <div className="absolute left-5 top-4">
          <i className="fas fa-search fa-flip-horizontal text-gray-500 text-2xl" />
        </div>
        <div
          className={`${
            !showOptions || name?.length <= 1 ? 'hidden' : 'flex'
          } flex-col shadow  absolute bg-white z-10 inset-x-0 overflow-y-scroll overflow-x-hidden max-h-50vh`}
        >
          {data?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={onSelect(item)}
                className={`text-xl p-3 cursor-pointer ${
                  index === active ? 'bg-default text-white' : ''
                } hover:bg-default hover:text-white `}
              >
                {searchType === DASHBOARD_TYPES.LOCATION ? (
                  <div>
                    <h4 className="text-bold">{item?.name}</h4>
                    <p>{item?.formatedAddress}</p>
                  </div>
                ) : (
                  <p>
                    {item.name}, {item?.email?.email}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Autocomplete, (oldProps, newProps) => {
  if (
    oldProps?.data !== newProps?.data ||
    oldProps?.label !== newProps?.label ||
    oldProps?.searchType !== newProps?.searchType ||
    oldProps?.valueSearch !== newProps?.valueSearch
  ) {
    return false;
  }
  return true;
});
