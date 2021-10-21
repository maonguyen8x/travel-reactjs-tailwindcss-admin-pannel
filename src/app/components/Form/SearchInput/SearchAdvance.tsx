import React, { useState, useEffect, memo } from 'react';
import { DASHBOARD_TYPES, SEARCH_TYPES } from 'app/constants';
import { t } from 'app/i18n';
import { Input, Col, InputGroupAddon, InputGroupText } from 'reactstrap';
import AutoCompleted from 'app/components/AutoCompleted';
import Api from 'app/services/Api';
import { checkStatusApi } from 'app/utils';

let timeoutId: any = 0;

const SearchAutoComplete = ({
  label,
  setAdvanceAutocompleted,
  valueAdvanceAutocompleted,
  searchType,
  onSearch,
  txtSearch,
}: any) => {
  const [searchTxt, setSearchTxt] = useState('');
  const [resultSearching, setResultSearching] = useState([]);

  const onChangeSearchTxt = (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setSearchTxt(value);
    }, 300);
  };

  const onSearchAdvance = (value: any) => {
    setAdvanceAutocompleted(value);
    onSearch({
      offset: 0,
      limit: 10,
      search: txtSearch.trim(),
      advance: value,
      searchType: SEARCH_TYPES.DEFAULT,
    });
  };

  useEffect(() => {
    if (!!searchTxt && searchType === DASHBOARD_TYPES.USER) {
      (async () => {
        const result: any = await Api.listUser({
          userFilterSearch: { q: searchTxt },
        });
        if (checkStatusApi(result)) {
          setResultSearching(result?.data?.data);
        }
      })();
    }
    if (!!searchTxt && searchType === DASHBOARD_TYPES.LOCATION) {
      (async () => {
        const result: any = await Api.getLocationsAdmin({
          locationSearch: { q: searchTxt },
        });
        if (checkStatusApi(result)) {
          setResultSearching(result?.data?.data);
        }
      })();
    }
  }, [searchTxt]);

  return (
    <Col md={4} className="mt-3">
      <AutoCompleted
        label={label}
        data={resultSearching}
        searchType={searchType}
        onChangeSearch={onChangeSearchTxt}
        valueSearch={valueAdvanceAutocompleted}
        getValueSearch={onSearchAdvance}
      />
    </Col>
  );
};

const AdvanceField = ({
  data = [],
  onSearch,
  onToggleSearchAdvance,
  txtSearch,
  onClear,
}: any) => {
  const [advance, setAdvance]: any = useState({});

  const onSearchAdvance = (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onSearch({
        offset: 0,
        limit: 10,
        search: txtSearch.trim(),
        advance: value,
        searchType: SEARCH_TYPES.DEFAULT,
      });
    }, 300);
  };

  const onChangeSearch = (e: any, key: any) => {
    if (e?.target?.value === '') {
      onReset();
    }
    setAdvance({
      ...advance,
      [key?.name]: e?.target?.value,
    });
    onSearchAdvance({ ...advance, [key?.name]: e?.target?.value });
  };

  const onReset = () => {
    setAdvance('');
    onSearch({
      offset: 0,
      limit: 10,
      search: '',
      advance: {},
      searchType: SEARCH_TYPES.DEFAULT,
    });
    onClear();
  };

  return (
    <div className="grid grid-cols-4 gap-10">
      <div className="p-2">
        <div className="flex justify-between items-center">
          <span>{t('search.advance')}</span>
        </div>
        <div>
          {data?.map((field: any, index: number) => {
            if (!field?.autocompleted) return null;
            return (
              <SearchAutoComplete
                key={index}
                searchType={field?.type}
                label={field?.label}
                valueAdvanceAutocompleted={advance}
                setAdvanceAutocompleted={setAdvance}
                onSearch={onSearch}
                txtSearch={txtSearch}
              />
            );
          })}
          {data?.map((field: any, index: number) => {
            if (field?.autocompleted) return null;
            return (
              <div key={index}>
                <label>{field?.label}</label>
                <div>
                  {field?.addon && (
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{field?.addon}</InputGroupText>
                    </InputGroupAddon>
                  )}
                  <Input
                    type={field?.type || 'text'}
                    onChange={(e: any) => onChangeSearch(e, field)}
                    value={advance[field?.name] || ''}
                  >
                    <option value="" selected disabled hidden>
                      {t('date.select')}
                    </option>
                    {field?.option?.map((option: any, index: number) => (
                      <option
                        key={index}
                        value={option?.value}
                        onChange={(e: any) =>
                          setAdvance({
                            ...advance,
                            [field?.name]: e?.target?.value,
                          })
                        }
                      >
                        {option?.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </div>
            );
          })}
        </div>
        <div className="action">
          <button
            onClick={onToggleSearchAdvance}
            className="py-3 px-32 ml-5 rounded-md hover:opacity-80 bg-gray-300 text-black"
          >
            {t('button.cancel')}
          </button>
          <button
            onClick={onReset}
            className="py-3 px-32 ml-5 rounded-md hover:opacity-80 bg-gray-300 text-black"
          >
            {t('button.reset')}
          </button>
          <button
            className="py-3 px-32 ml-5 rounded-md hover:opacity-80 bg-button-default text-white"
            // onClick={onSearchAdvance}
          >
            {t('button.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AdvanceField, (oldProps, newProps) => {
  if (
    oldProps?.data !== newProps?.data ||
    oldProps?.isShowSearchAdvance !== newProps?.isShowSearchAdvance ||
    oldProps?.advance !== newProps?.advance ||
    oldProps?.advanceAutocompleted !== newProps?.advanceAutocompleted ||
    oldProps?.txtSearch !== newProps?.txtSearch
  ) {
    return false;
  }
  return true;
});
