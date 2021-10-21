import React, { useEffect } from 'react';
import EditActivities from './EditActivities.component';

const ActivityEdit = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.activitiesById(id);
  }, []);

  return <EditActivities {...props} />;
};

export default ActivityEdit;
