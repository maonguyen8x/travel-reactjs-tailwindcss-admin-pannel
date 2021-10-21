import React, { useState, useEffect, memo } from 'react';
import { formatTimeNow } from 'app/utils';
import { onGetListComments } from './service';

const ListPostComments = ({ id }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!!id) {
      (async () => {
        const res: any = await onGetListComments(id);
        setData(res?.data);
      })();
    }
  }, [id]);

  return (
    <div className="min-h-75vh max-h-75vh overflow-y-scroll">
      {data?.map((items: any, index: number) => (
        <div key={index}>
          <div className="flex flex-row items-start mt-4 mr-4 mb-16">
            <div
              style={{
                backgroundImage: `url(${items?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
              }}
              className="flex flex-0 w-16 h-16 bg-cover rounded-full mx-3"
            />
            <div className="flex-1 w-full bg-white rounded-md max-h-full py-3 px-4 flex flex-col relative">
              <span className="text-2xl text-blue-400 font-medium">
                {items?.user?.name}
                {items?.totalLike > 0 && (
                  <span className="absolute right-5">
                    <i className="fas fa-heart mx-2 text-red-500" />
                    {items?.totalLike}
                  </span>
                )}
              </span>
              <span className="mt-4">{items?.content}</span>
              <span className="absolute -bottom-8">
                {formatTimeNow(items?.createdAt)}
              </span>
            </div>
          </div>
          {items?.childComments?.map((child: any, index: number) => (
            <div
              className="flex flex-row items-start mt-5 mr-4 mb-16 ml-20"
              key={index}
            >
              <div
                style={{
                  backgroundImage: `url(${child?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                }}
                className="flex flex-0 w-16 h-16 bg-cover rounded-full mx-3"
              />
              <div className="flex-1 w-full bg-white rounded-md max-h-full py-3 px-4 flex flex-col relative">
                <span className="text-2xl text-blue-400 font-medium">
                  {child?.user?.name}
                  {child?.totalLike > 0 && (
                    <span className="absolute right-5">
                      <i className="fas fa-heart mx-2 text-red-500" />
                      {child?.totalLike}
                    </span>
                  )}
                </span>
                <span className="mt-4">{child?.content}</span>
                <span className="absolute -bottom-8">
                  {formatTimeNow(items?.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(ListPostComments);
