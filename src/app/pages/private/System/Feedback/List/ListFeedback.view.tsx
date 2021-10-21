import React, { useEffect, useState } from 'react';
import { ROUTERS, SORT } from 'app/constants';
import Table from 'app/components/Table';
import { t } from 'app/i18n';
import { formatTime, ReportStatusTypes, getFieldFeedback } from 'app/utils';
import { pathOr } from 'ramda';
import Header from 'app/components/View/HeaderTable';
import { IProps, IFilter } from './ListFeedback.type';
import ChatRoom from '../ChatRoom/ChatRoom.view';

const FeedbackList = ({
  pages,
  getListFeedback,
  history,
  listFeedback,
  filter,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListFeedback = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListFeedback(customFilter);
  };

  useEffect(() => {
    onGetListFeedback(filter);
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.FEEDBACK_DETAIL.replace(':id', id));
  };

  const onPageChange = (pageIndex: number) => {
    onGetListFeedback({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListFeedback({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  return (
    <div>
      <div className="pb-4 space-x-6 cursor-pointer">
        <span
          onClick={() => history.push(ROUTERS.LIST_FEEDBACK)}
          className={'text-xl font-semibold capitalize text-yellow-500'}
        >
          {t('feedback.title_list')}
        </span>
        <span>{'|'}</span>
        <span
          onClick={() => history.push(ROUTERS.FEEDBACK_CHAT_ROOM)}
          className={'text-xl font-semibold capitalize'}
        >
          {t('feedback.chat_room')}
        </span>
      </div>
      <Table
        name="listFeedback"
        keySearchDefault={filter?.search}
        onSearch={onGetListFeedback}
        onDetail={onDetail}
        data={listFeedback?.data}
        total={listFeedback?.count}
        placeholder={t('search')}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListFeedback({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
        }}
        columns={[
          {
            Header: t('feedback.content'),
            accessor: 'content',
            width: 450,
          },
          {
            Header: <Header name={t('feedback.name')} />,
            sortable: false,
            accessor: 'name',
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '-',
                [
                  'original',
                  'user',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'urlTiny',
                ],
                row
              );
              const name = row?.original?.user?.name;
              return (
                <div className="flex flex-row items-center">
                  <img className="w-16 h-16 rounded-full" src={avatar} alt="" />
                  <span className="truncate py-2 px-2">{name}</span>
                </div>
              );
            },
          },
          {
            Header: <Header name={t('feedback.created')} />,
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return formatTime(data.createdAt);
            },
          },

          {
            Header: <Header name={t('feedback.status')} />,
            accessor: 'status',
            Cell: ({ row }: any) => {
              const status = row?.original?.status;
              return ReportStatusTypes(status);
            },
          },
        ]}
        filter={filter}
        offset={offset}
        limit={limit}
        pages={pages}
        page={offset}
        pageSize={limit}
      />
    </div>
  );
};

export default FeedbackList;
