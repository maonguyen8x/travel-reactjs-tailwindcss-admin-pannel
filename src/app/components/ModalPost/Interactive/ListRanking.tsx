import { formatTimeNow } from 'app/utils';
import React, { useState, useEffect } from 'react';
import { onGetListRankings } from './service';

const ListPostRanking = ({ id }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res: any = await onGetListRankings(id);
      setData(res?.data);
    })();
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
              className="flex flex-0 w-20 h-20 bg-cover rounded-full mx-3"
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
              <div className="mt-2">
                <i className="fas fa-poll text-gray-400 text-xl mr-2" />
                {items?.point}
                <span className="mt-3">{items?.review}</span>
              </div>
              <span className="absolute -bottom-8">
                {formatTimeNow(items?.createdAt)}
              </span>
            </div>
          </div>
          {items?.replyRankings?.map((child: any, index: number) => (
            <div
              className="flex flex-row items-start mt-5 mr-4 mb-16 ml-20"
              key={index}
            >
              <div
                style={{
                  backgroundImage: `url(${child?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                }}
                className="flex flex-0 w-20 h-20 bg-cover rounded-full mx-3"
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
                <span className="mt-3">{child?.content}</span>
                <span className="absolute -bottom-8">
                  {formatTimeNow(child?.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListPostRanking;
