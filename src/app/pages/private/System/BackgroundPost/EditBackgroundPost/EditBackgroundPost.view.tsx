import React, { useState, useEffect } from 'react';
import EditBackgroundPostForm from './EditBackgroundPost.component';
import { getBackgroundPostById } from './service';

const LocationEdit = (props: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const id = props?.id;
      const result: any = await getBackgroundPostById(id);
      setData(result);
    })();
  }, []);

  return <EditBackgroundPostForm {...props} backgroundPostDetail={data} />;
};

export default LocationEdit;
