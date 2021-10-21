import React, { useEffect, useState, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { AutoCompleted } from 'app/components';
import { t } from 'app/i18n';
import { STATISTIC_TYPE } from 'app/constants';
import Api from 'app/services/Api';
import { IProps } from '../_components/type';

let timeoutId: any = 0;

const SearchLocationInput = ({
  onSelectLocation,
  errMessage,
  touched,
}: IProps) => {
  const [state, setState] = useState({
    searchTxt: '',
    resultSearching: [],
  });
  const { searchTxt, resultSearching } = state;

  const onSelect = (location: any) => {
    const newAddress = {
      country: location?.country,
      city: location?.areaLevel1,
      district: location?.areaLevel2,
      ward: location?.areaLevel3,
      street: location?.areaLevel4,
      number: location?.areaLevel5,
      address: location?.address,
      lng: location?.longitude,
      lat: location?.latitude,
      locationId: location.id,
    };

    onSelectLocation(newAddress);
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

  useEffect(() => {
    if (!!searchTxt) {
      (async () => {
        const result: any = await Api.getLocationsAdmin({
          locationSearch: { q: searchTxt, withExternal: true },
        });
        setState({
          ...state,
          resultSearching: result?.data?.data,
        });
      })();
    }
  }, [searchTxt?.length]);

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
          data={resultSearching}
          searchType={STATISTIC_TYPE.LOCATION}
          onChangeSearch={onChangeSearchTxt}
          getValueSearch={onSelect}
        />
      </div>
      {touched && <span className="text-red-500 text-xl">{errMessage}</span>}
    </div>
  );
};

export default memo(SearchLocationInput);
