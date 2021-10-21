import React, { useEffect, useState } from 'react';
import { getDetailStay } from './DetailStay.service';
import DetailStay from './DetailStay.component';

const PageAddView = (props: any) => {
  const [data, setData] = useState([]);
  const id = props?.match?.params?.id;

  useEffect(() => {
    (async () => {
      const stayDetail = await getDetailStay(id);
      setData(stayDetail);
    })();
  }, []);

  return <DetailStay {...props} data={data} />;
};

export default PageAddView;
