import React, { memo } from 'react';
import Modal from 'app/components/Modal';
import { t } from 'app/i18n';
import { formatTime } from 'app/utils';

const ListLocationCompleted = ({ isShow, onToggle, data }: any) => {
  return (
    <div>
      <Modal
        className="w-1/3"
        toggle={onToggle}
        isShowModal={isShow}
        header={
          <div className="font-semibold">
            <span className="text-default">{t('user.location.completed')}</span>
            <span className="absolute right-10">{data?.length || 0}</span>
          </div>
        }
        body={
          <div className="min-h-75vh max-h-75vh overflow-y-scroll">
            {data?.map((items: any, index: number) => (
              <div
                key={index}
                className="py-3 px-4 flex flex-row items-baseline"
              >
                <span className="text-2xl font-medium mr-3">
                  {`${index + 1}/`}
                </span>
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-blue-400 leading-relaxed">
                    {items?.name}
                  </span>
                  <span className="italic text-gray-500 leading-relaxed">
                    {items?.address}
                  </span>
                  <span className="text-gray-400 text-lg">
                    {formatTime(items?.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default memo(ListLocationCompleted);
