import React, { useEffect } from 'react';
import DetailPlanForm from './DetailPlan.component';

const PolicyDetail = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props?.getPlanById(id);
  }, []);

  return <DetailPlanForm {...props} />;
};

export default PolicyDetail;
