import React, { useState, useEffect, memo } from 'react';
import AutoCompleted from 'app/components/AutoCompleted';
import { t } from 'app/i18n';
import { STATISTIC_TYPE } from 'app/constants';
import { getListLocationCreated } from '../service';
import { IProps } from './type';

const SelectLocationInput = ({
  onSelectLocation,
  errMessage,
  touched,
  value,
}: IProps) => {
  const [state, setState]: any = useState({
    result: [],
    searchTxt: '',
    coordinates: '',
  });

  const { searchTxt, result } = state;

  let timeoutId: any = 0;

  useEffect(() => {
    if (!!searchTxt) {
      (async () => {
        const result: any = await getListLocationCreated(searchTxt);
        setState({
          ...state,
          result: result?.data,
        });
      })();
    }
  }, [searchTxt]);

  const onSearchAdvance = (location: any) => {
    onSelectLocation(location.id);
    setState({
      ...state,
      coordinates: location?.coordinates,
    });
  };

  const onChangeSearchTxt = (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setState({
        ...state,
        searchTxt: value,
      });
    }, 300);
  };

  return (
    <div>
      <label className="text-xl font-medium text-gray-700 flex items-center">
        <span>{t('location.search')}</span>
      </label>
      <div
        style={{ height: 'fit-content' }}
        className={` ${
          errMessage && touched ? 'border-2 border-red-500 border-solid' : ''
        }`}
      >
        <AutoCompleted
          data={result}
          searchType={STATISTIC_TYPE.LOCATION}
          onChangeSearch={onChangeSearchTxt}
          getValueSearch={onSearchAdvance}
          valueSearch={value}
        />
      </div>
      {touched && <span className="text-red-500 text-xl">{errMessage}</span>}
    </div>
  );
};

export default memo(SelectLocationInput);
