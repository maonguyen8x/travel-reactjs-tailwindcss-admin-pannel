import React, { useEffect } from 'react';
import EditLocationForm from './EditLocation.component';

const LocationEdit = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getLocationById(id);
  }, []);

  return <EditLocationForm {...props} />;
};

export default LocationEdit;
