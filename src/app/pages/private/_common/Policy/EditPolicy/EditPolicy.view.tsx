import React, { useEffect } from 'react';
import EditPolicyForm from './EditPolicy.component';

const PolicyEdit = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getPolicyById(id);
  }, []);

  return <EditPolicyForm {...props} />;
};

export default PolicyEdit;
