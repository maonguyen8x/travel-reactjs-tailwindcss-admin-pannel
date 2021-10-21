import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import Table from 'app/components/Table';
import { formatTime, isJson, onDeleteData } from 'app/utils';
import TooltipComponent from 'app/components/Tooltip';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { isString } from 'ramda-adjunct';
import { IProps } from './ListMessenger.type';

const ListAmenity = (props: IProps) => {
  const {
    fetching,
    LIST_MESSAGE,
    setData,
    data,
    ON_EDIT,
    ON_ADD_MESSENGER,
  } = props;

  useEffect(() => {
    (async () => {
      const res = await LIST_MESSAGE();
      setData(res);
    })();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <div className="mr-10">
          <input
            className={
              'mt-1 py-3 px-6 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            }
            type="date"
          />
        </div>

        <button
          className={
            'bg-green-500 py-3 px-10 text-white text-xl shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-6 '
          }
          onClick={ON_ADD_MESSENGER}
        >
          Create Message
        </button>
      </div>
      <Table
        name="listMessenger"
        data={data?.messageUniq}
        total={data?.messageUniq?.length}
        onDetail={false}
        isShowSearch={false}
        columns={[
          // {
          //   Header: 'ID',
          //   accessor: 'id',
          //   width: 60,
          //   center: true,
          //   Cell: ({ row }: any) => {
          //     return `${isString(row?.original?.id) ?  row?.original?.id?.slice(0,4) + '...' : row?.original?.id}`;
          //   }
          // },
          {
            Header: t('message.vi'),
            accessor: 'messageVi',
            Cell: ({ row }: any) => {
              const id = row?.original?.id;
              const message = row?.original?.message;
              const isCheck = isJson(message);
              const messageVi = isCheck && JSON.parse(message)?.vi;
              return (
                <TooltipComponent
                  id={`${id}messageVi`}
                  style={{ maxWidth: 400, backgroundColor: '#19445F' }}
                  content={!!messageVi ? messageVi : message}
                  hoverTitle={!!messageVi ? messageVi : message}
                />
              );
            },
          },
          {
            Header: t('message.en'),
            accessor: 'messageEn',
            Cell: ({ row }: any) => {
              const id = row?.original?.id;
              const message = row?.original?.message;
              const isCheck = isJson(message);
              const messageEn = isCheck && JSON.parse(message)?.en;
              return (
                <TooltipComponent
                  id={`${id}messageEn`}
                  style={{ maxWidth: 400, backgroundColor: '#19445F' }}
                  content={!!messageEn ? messageEn : message}
                  hoverTitle={!!messageEn ? messageEn : message}
                />
              );
            },
          },
          {
            Header: t('message.created'),
            accessor: 'createdAt',
            maxWidth: 150,
            Cell: ({ row }: any) => formatTime(row?.original?.createdAt),
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            sortable: false,
            Cell: ({ row }: any) => {
              const message = JSON.parse(row?.original?.message);
              return (
                <ButtonGroup
                  onPublish={() => ({})}
                  isPublish
                  onEdit={ON_EDIT(`${message?.vi}__${message?.en}`)}
                  onDelete={onDeleteData(
                    row?.original?.message,
                    LIST_MESSAGE,
                    setData
                  )}
                />
              );
            },
          },
        ]}
        pageSize={10}
      />
    </div>
  );
};

export default ListAmenity;
