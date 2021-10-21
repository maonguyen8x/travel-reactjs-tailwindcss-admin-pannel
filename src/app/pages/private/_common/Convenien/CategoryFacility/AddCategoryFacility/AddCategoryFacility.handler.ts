import { IValues } from './AddCategoryFacility.type';

export default {
  CREATE_FACILITY_CATEGORY: (props: any) => (values: IValues) => {
    const { createCategoryFacility } = props;
    createCategoryFacility({
      name: {
        en: values.FacilityEn,
        vi: values.FacilityVi,
      },
    });
  },
};
