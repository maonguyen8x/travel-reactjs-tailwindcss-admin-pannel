import React, { useState, useEffect, memo } from 'react';
import Modal from 'app/components/Modal';
import { withRouter } from 'react-router-dom';
import { t } from 'app/i18n';
import { formatTimeNow } from 'app/utils';
import { onGetListComments } from '../service';

const ListPostComments = ({ isShow, onToggle, match }: any) => {
  const [data, setData] = useState([]);
  const id = match?.params?.id;

  useEffect(() => {
    (async () => {
      const res: any = await onGetListComments(id);
      setData(res?.data);
    })();
  }, []);
  const countChildComment = data?.filter(
    (items: any) => items?.childComments?.length
  )?.length;

  return (
    <Modal
      toggle={onToggle}
      isShowModal={isShow}
      className="w-1/3"
      header={
        <div className="font-semibold">
          <span className="text-default">{t('post.list_comments')}</span>
          <span className="absolute right-10">
            {data?.length + countChildComment || 0}
          </span>
        </div>
      }
      body={
        <div className="min-h-75vh max-h-75vh overflow-y-scroll">
          {data?.map((items: any, index: number) => (
            <div key={index}>
              <div className="flex flex-row items-start mt-4 mx-4 mb-16">
                <div
                  style={{
                    backgroundImage: `url(${items?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                  }}
                  className="w-20 h-20 bg-cover rounded-full mx-3"
                />
                <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                  <span className="text-2xl text-blue-400 font-medium">
                    {items?.user?.name}
                    {items?.totalLike > 0 && (
                      <span className="absolute right-5">
                        <i className="fas fa-heart mx-2 text-red-500" />
                        {items?.totalLike}
                      </span>
                    )}
                  </span>
                  <span className="mt-5">{items?.content}</span>
                  <span className="absolute -bottom-8">
                    {formatTimeNow(items?.createdAt)}
                  </span>
                </div>
              </div>
              {items?.childComments?.map((child: any, index: number) => (
                <div
                  className="flex flex-row items-start mt-5 mr-4 mb-16 ml-28"
                  key={index}
                >
                  <div
                    style={{
                      backgroundImage: `url(${child?.user?.profiles?.avatars?.mediaContent?.urlTiny})`,
                    }}
                    className="w-20 h-20 bg-cover rounded-full mx-3"
                  />
                  <div className="w-full bg-gray-100 rounded-md max-h-full py-3 px-4 flex flex-col relative">
                    <span className="text-2xl text-blue-400 font-medium">
                      {child?.user?.name}
                      {child?.totalLike > 0 && (
                        <span className="absolute right-5">
                          <i className="fas fa-heart mx-2 text-red-500" />
                          {child?.totalLike}
                        </span>
                      )}
                    </span>
                    <span className="mt-5">{child?.content}</span>
                    <span className="absolute -bottom-8">
                      {formatTimeNow(items?.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    />
  );
};

export default withRouter(memo(ListPostComments));
