import { TRAVEL_TYPES } from 'app/constants';
import { toNumber } from 'app/utils';
import { IValues } from './AddFood.type';

export default {
  CREATE_FOOD: (props: any) => (values: IValues) => {
    const { createFood } = props;

    createFood({
      type: TRAVEL_TYPES.FOOD,
      name: values.name,
      email: values?.email,
      phone: values?.phone,
      location: {
        coordinates: values?.coordinates,
        latitude: toNumber(values?.lat),
        longitude: toNumber(values?.lng),
        formatedAddress: values?.formatedAddress,
        address: values?.formatedAddress,
        country: values.country,
        areaLevel1: values.city,
        areaLevel2: values.district,
        areaLevel3: values?.ward,
        areaLevel4: values?.street,
        areaLevel5: values?.number,
      },
    });
  },
};
