import React, { useEffect } from 'react';
import EditPolicyForm from './EditFeedback.component';

const FeedbackEdit = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getFeedbackById(id);
  }, []);

  return <EditPolicyForm {...props} />;
};

export default FeedbackEdit;
