import React, { useState, useEffect, memo } from 'react';
import Modal from 'app/components/Modal';
import { withRouter } from 'react-router-dom';
import { t } from 'app/i18n';
import { onGetListLikes } from '../service';

const ListPostLikes = ({ isShow, onToggle, match }: any) => {
  const [data, setData] = useState([]);
  const id = match?.params?.id;

  useEffect(() => {
    (async () => {
      const res: any = await onGetListLikes(id);
      setData(res?.data);
    })();
  }, []);

  return (
    <div>
      <Modal
        toggle={onToggle}
        isShowModal={isShow}
        header={
          <div className="font-semibold">
            <span className="text-default">{t('post.list_likes')}</span>
            <span className="absolute right-10">{data?.length || 0}</span>
          </div>
        }
        body={
          <div className="min-h-75vh max-h-75vh overflow-y-scroll">
            <div className="grid grid-cols-4">
              {data?.map((items: any, index: number) => (
                <div key={index} className="m-4 flex flex-row items-center">
                  <i className="fas fa-circle text-blue-300" />
                  <div
                    style={{
                      backgroundImage: `url(${items?.profiles?.avatars?.mediaContent?.urlTiny})`,
                    }}
                    className="w-20 h-20 bg-cover rounded-full mx-3"
                  />
                  <span className="text-2xl font-semibold">{items?.name}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(memo(ListPostLikes));
