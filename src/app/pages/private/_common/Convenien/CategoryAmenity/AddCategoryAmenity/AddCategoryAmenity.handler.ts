import { IValues } from './AddCategoryAmenity.type';

export default {
  CREATE_AMENITY_CATEGORY: (props: any) => (values: IValues) => {
    const { createCategoryAmenity } = props;
    createCategoryAmenity({
      name: {
        en: values.AmenityEn,
        vi: values.AmenityVi,
      },
    });
  },
};
