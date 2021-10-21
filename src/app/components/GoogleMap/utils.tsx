import { SEARCH_MAP_TYPES } from 'app/constants';
import { getMapResultList } from 'app/utils';
import Geocode from 'react-geocode';

export const getGeocodeCoordinates = async (coordinates: any) => {
  const response = await Geocode.fromLatLng(coordinates?.lat, coordinates?.lng);

  if (response?.results) {
    const addressComponents = response?.results?.[0]?.address_components;

    const number = getMapResultList(addressComponents, SEARCH_MAP_TYPES.STREET);
    const street = getMapResultList(
      addressComponents,
      SEARCH_MAP_TYPES.ADDRESS
    );
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

    return {
      country,
      city,
      district,
      ward,
      street,
      number,
      formatedAddress,
      coordinates: `${coordinates?.lat}, ${coordinates?.lng}`,
      ...coordinates,
    };
  }

  return {
    ...coordinates,
  };
};
