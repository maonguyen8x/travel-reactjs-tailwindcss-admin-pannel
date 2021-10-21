export default {
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListPlan(customFilter);
  },
};
