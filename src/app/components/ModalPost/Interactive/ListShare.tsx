import { formatFullTime } from 'app/utils';
import React, { useState, useEffect } from 'react';
import { onGetListShares } from './service';

const ListPostShares = ({ id }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res: any = await onGetListShares(id);
      setData(res?.data);
    })();
  }, [id]);

  return (
    <div className="min-h-75vh max-h-75vh overflow-y-scroll">
      {data?.map((items: any, index: number) => (
        <div key={index}>
          <div className="flex flex-row items-start my-5 mx-4">
            <div
              style={{
                backgroundImage: `url(${items?.creator?.profiles?.avatars?.mediaContent?.urlTiny})`,
              }}
              className="flex flex-0 w-20 h-20 bg-cover rounded-full mx-3"
            />
            <div className="flex-1 w-full max-h-full py-3 px-2 flex flex-col relative">
              <span className="text-2xl text-blue-400 font-medium">
                {items?.creator?.name}
              </span>
              <span className="mt-2 text-gray-400">
                {formatFullTime(items?.createdAt)}
              </span>
              <span className="mt-2">{items?.content}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPostShares;
