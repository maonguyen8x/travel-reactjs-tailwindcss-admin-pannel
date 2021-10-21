/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import { ROUTERS, SORT } from 'app/constants';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { formatTime, getFieldStay } from 'app/utils';
import { t } from 'app/i18n';
import TooltipComponent from 'app/components/Tooltip';
import { IProps, IFilter } from './ListStay.type';

const ListStayView = ({
  pages,
  fetching,
  ON_NAVIGATE,
  getListStay,
  filter,
  list,
}: IProps) => {
  const { offset, limit } = filter;

  const onGetListStay = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListStay(customFilter);
  };

  useEffect(() => {
    onGetListStay(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListStay({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListStay({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  return (
    <>
      <Table
        data={list}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListStay({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('stay.name'),
            accessor: 'name',
            Cell: ({ row }: any) => pathOr('', ['original', 'name'], row),
          },
          {
            Header: t('stay.address'),
            accessor: 'locationId',
            Cell: ({ row }: any) => {
              const location = row?.original?.location?.formatedAddress;
              const id = row?.original?.id;
              return (
                <TooltipComponent
                  id={`${id}locationId`}
                  content={location}
                  hoverTitle={t('filter.table.location')}
                  handlerFilter={() => ({})}
                />
              );
            },
          },
          {
            Header: t('stay.creator'),
            accessor: 'name',
            width: 200,
            center: true,
            Cell: ({ row }: any) => {
              const name = row?.original?.user?.name;
              const id = row?.original?.id;
              return (
                <TooltipComponent
                  id={`${id}name`}
                  content={name}
                  hoverTitle={t('filter.table.creator')}
                  handlerFilter={() => ({})}
                />
              );
            },
          },
          {
            Header: t('stay.like'),
            accessor: 'like',
          },
          {
            Header: t('stay.comment'),
            accessor: 'comment',
          },
          {
            Header: t('stay.share'),
            accessor: 'share',
          },
          {
            Header: t('stay.average'),
            accessor: 'pointer',
          },
          {
            Header: t('stay.booknmark'),
            accessor: 'bookmark',
          },
          {
            Header: t('stay.image'),
            accessor: 'image',
          },
          {
            Header: t('stay.createdAt'),
            accessor: 'createdAt',
            center: true,
            width: 150,
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              const id = row?.original?.id;
              return (
                <TooltipComponent
                  id={`${id}createdAt`}
                  content={formatTime(createdAt)}
                  hoverTitle={t('filter.table.time')}
                  handlerFilter={() => ({})}
                />
              );
            },
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            maxWidth: 200,
            Cell: ({ row }: any) => {
              const data = row.original;
              return (
                <ButtonGroup
                  onDetail={() =>
                    ON_NAVIGATE(ROUTERS.STAY_DETAIL.replace(':id', data.id))
                  }
                  // onDelete={() => ON_DELETE(data.id)}
                />
              );
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
    </>
  );
};
export default ListStayView;
