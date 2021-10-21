import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Spinner } from 'reactstrap';
import { SEARCH_MAP_TYPES } from 'app/constants';
import { getMapResultList } from 'app/utils';
import { t } from 'app/i18n';
import { ISearch } from './type';

export default function SearchMap({
  onChangePlace,
  defaultValue = '',
}: ISearch) {
  const [address, setAddress] = useState(defaultValue);

  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng: any = await getLatLng(results[0]);
    const addressComponents = results[0].address_components;

    const street = getMapResultList(addressComponents, SEARCH_MAP_TYPES.STREET);
    const route = getMapResultList(addressComponents, SEARCH_MAP_TYPES.ADDRESS);
    const locality = getMapResultList(
      addressComponents,
      SEARCH_MAP_TYPES.LOCAL
    );
    const neighborhood = getMapResultList(
      addressComponents,
      SEARCH_MAP_TYPES.WARD
    );
    const district = getMapResultList(
      addressComponents,
      SEARCH_MAP_TYPES.DISTRIC
    );
    const city = getMapResultList(addressComponents, SEARCH_MAP_TYPES.CITY);
    const country = getMapResultList(
      addressComponents,
      SEARCH_MAP_TYPES.COUNTRY
    );
    const ward = locality || neighborhood;
    const formatedAddress = addressComponents
      ?.map((items: any) => items?.long_name)
      ?.join(', ');

    setAddress(value);
    const data = {
      country,
      formatedAddress,
      city,
      district,
      ward,
      street,
      route,
      ...latLng,
    };
    onChangePlace(data);
  };

  const handleChangeAddress = (v: any) => {
    if (v.length === 0) {
      onChangePlace(null);
    }

    setAddress(v);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChangeAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <div className="relative">
            <input
              className="w-full h-16 pl-12 border bg-gray-100"
              {...getInputProps({ placeholder: t('search') })}
              type="search"
            />
            <span className="absolute top-1/4 left-0 px-3 py-1 text-lg">
              <i className="fas fa-search fa-flip-horizontal text-muted" />
            </span>
          </div>
          {loading && (
            <>
              Please wait...
              <Spinner className="py-3" color="light" />
            </>
          )}
          <div className="absolute shadow-lg bg-white z-10 left-0 right-0">
            {suggestions.map((suggestion: any, index: number) => (
              <div key={index}>
                <div
                  className="px-10 py-3 cursor-pointer hover:bg-gray-100"
                  {...getSuggestionItemProps(suggestion)}
                >
                  {suggestion?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
