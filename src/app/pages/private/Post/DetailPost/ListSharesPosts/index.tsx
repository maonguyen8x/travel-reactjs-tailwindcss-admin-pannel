import React, { memo, useEffect, useState } from 'react';
import Modal from 'app/components/Modal';
import { withRouter } from 'react-router-dom';
import { t } from 'app/i18n';
import { formatFullTime } from 'app/utils';
import { onGetListShares } from '../service';

const ListPostShares = ({ isShow, onToggle, match }: any) => {
  const [data, setData] = useState([]);
  const id = match?.params?.id;

  useEffect(() => {
    (async () => {
      const res: any = await onGetListShares(id);
      setData(res?.data);
    })();
  }, []);

  return (
    <Modal
      className="w-1/3"
      toggle={onToggle}
      isShowModal={isShow}
      header={
        <div className="font-semibold">
          <span className="text-default">{t('post.list_shares')}</span>
          <span className="absolute right-10">{data?.length || 0}</span>
        </div>
      }
      body={
        <div className="min-h-75vh max-h-75vh overflow-y-scroll">
          {data?.map((items: any, index: number) => (
            <div key={index}>
              <div className="flex flex-row items-start my-5 mx-4">
                <div
                  style={{
                    backgroundImage: `url(${items?.creator?.profiles?.avatars?.mediaContent?.urlTiny})`,
                  }}
                  className="w-20 h-20 bg-cover rounded-full mx-3"
                />
                <div className="w-full max-h-full py-3 px-2 flex flex-col relative">
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
      }
    />
  );
};

export default withRouter(memo(ListPostShares));
