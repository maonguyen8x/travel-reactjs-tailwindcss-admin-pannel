import React, { useState } from 'react';
import { SEARCH_TYPES } from 'app/constants';
import CustomField from 'app/components/CustomField';
import { RootStateOrAny, useSelector } from 'react-redux';
import { t } from 'app/i18n';
import { isNumber, isString, notEqual } from 'ramda-adjunct';
import { IProps } from './type';

let timeoutId: any = 0;

const FormSearch = (props: IProps) => {
  const {
    // searching props
    onSearch,
    placeholder,
    keySearchDefault,
    filterMine,
    // custom field props
    allColumns,
    name,
  } = props;

  const userId = useSelector(
    (state: RootStateOrAny) => state?.auth?.profile?.id
  );

  const [state, setState] = useState({
    txtSearch: keySearchDefault,
  });

  const { txtSearch } = state;

  const onFilterDataCreated = (filter: boolean) => () => {
    if (notEqual(isNumber(filterMine), filter)) {
      onSearch({
        offset: 0,
        limit: 10,
        mine: filter ? userId : 'mine',
        searchType: filter && SEARCH_TYPES.MINE,
      });
    }
  };

  const onSubmit = (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onSearch({
        offset: 0,
        limit: 10,
        search: value?.trim(),
        searchType: SEARCH_TYPES.DEFAULT,
      });
    }, 300);
  };

  const onClear = () => {
    setTimeout(() => {
      setState({
        ...state,
        txtSearch: '',
      });
      onSearch({
        search: '',
        searchType: SEARCH_TYPES.DEFAULT,
      });
    }, 300);
  };

  const handleChangeSearch = (e: any) => {
    if (e?.target?.value === '') {
      onClear();
    }
    setState({
      ...state,
      txtSearch: e?.target?.value,
    });
    if (e?.target?.value?.length > 1) {
      onSubmit(e?.target?.value);
    }
  };

  return (
    <div className="flex flex-wrap mb-10 space-x-2">
      <div className={'relative flex flex-1 items-center'}>
        <input
          className="w-full py-3 pl-16 text-xl shadow-sm border border-gray-100"
          value={txtSearch || ''}
          type="search"
          placeholder={placeholder}
          onChange={(e) => handleChangeSearch(e)}
        />
        <i className="fas fa-search fa-flip-horizontal absolute ml-4 text-gray-400 text-xl" />
      </div>
      <CustomField allColumns={allColumns} name={name} />
      {filterMine && (
        <div className="flex flex-row items-center pl-4">
          <span className="text-2xl text-default font-medium">
            {t('search.mine')}
          </span>
          <div className="bg-white border-2 border-tab-active h-full flex p-1 rounded-2xl ml-2 cursor-pointer ">
            <div
              onClick={onFilterDataCreated(false)}
              className={`flex items-center px-3 rounded-xl ${
                isString(filterMine) && 'bg-tab-active '
              }`}
            >
              <span
                className={`text-2xl text-default  font-medium ${
                  isString(filterMine) && 'text-white'
                }`}
              >
                {t('search.off')}
              </span>
            </div>
            <div
              onClick={onFilterDataCreated(true)}
              className={`flex items-center px-3 rounded-xl ${
                isNumber(filterMine) && 'bg-tab-active '
              }`}
            >
              <span
                className={`text-2xl text-default  font-medium ${
                  isNumber(filterMine) && 'text-white'
                }`}
              >
                {t('search.on')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSearch;
