import { IValues } from './AddFacility.type';

export default {
  CREATE_FACILITY: (props: any) => (values: IValues) => {
    const { createFacility } = props;
    createFacility({
      facilityCategoryId: values.facilityId,
      name: {
        vi: values.FacilityVi,
        en: values.FacilityEn,
      },
    });
  },
};
