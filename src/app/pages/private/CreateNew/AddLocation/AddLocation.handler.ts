import { toNumber } from 'app/utils';
import { TRAVEL_TYPES } from 'app/constants';
import { IValues } from './AddLocation.type';

export default {
  CREATE_LOCATION: (props: any) => (values: IValues) => {
    const { createLocation } = props;
    createLocation({
      latitude: toNumber(values?.lat),
      longitude: toNumber(values?.lng),
      name: values.name,
      country: values.country,
      areaLevel1: values.city,
      areaLevel2: values.district,
      areaLevel3: values?.ward,
      areaLevel4: values?.street,
      areaLevel5: values?.number,
      rankingPoint: values?.averagePoint,
      locationType: TRAVEL_TYPES.WHERE,
      post: {
        content: values?.content,
        accessType: values?.accessType,
        mediaContents: values?.files,
      },
    });
  },
};
