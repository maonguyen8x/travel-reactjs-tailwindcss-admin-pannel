import React, { useState, useEffect } from 'react';
import { onGetListLikes } from './service';

const ListPostLikes = ({ id }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res: any = await onGetListLikes(id);
      setData(res?.data);
    })();
  }, [id]);

  return (
    <div className="min-h-75vh max-h-75vh overflow-y-scroll">
      {data?.map((items: any, index: number) => (
        <div className="m-4 flex flex-row items-center" key={index}>
          <div
            style={{
              backgroundImage: `url(${items?.profiles?.avatars?.mediaContent?.urlTiny})`,
            }}
            className="w-16 h-16 bg-cover rounded-full mx-3"
          />
          <span className="text-2xl font-semibold text-blue-400">
            {items?.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListPostLikes;
