/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
import { ROUTERS, SORT } from 'app/constants';
import { formatTime, getStatusOrderTour } from 'app/utils';
import { pathOr } from 'ramda';
import { IProps, IFilter } from './ListBookingTour.type';

const BookingTourList = ({
  pages,
  fetching,
  filter,
  history,
  getListOrderTour,
  list,
  match,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListOrderTour = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListOrderTour(customFilter);
  };

  useEffect(() => {
    onGetListOrderTour(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListOrderTour({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListOrderTour({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.ORDER_TOUR_DETAIL.replace(':id', id));
  };

  const listBooking = list?.filter(
    (item: any) => item?.pageId === Number(match?.params?.id)
  );

  return (
    <div>
      <Table
        onSearch={onGetListOrderTour}
        data={listBooking}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListOrderTour({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
        }}
        columns={[
          {
            Header: t('app.table.page'),
            accessor: 'pageId',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'service', 'page', 'name'], row),
          },
          {
            Header: t('app.table.name_service'),
            accessor: 'serviceId',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'service', 'name'], row),
          },
          {
            Header: t('app.table.status'),
            accessor: 'status',
            Cell: ({ row }: any) => {
              const item = row.original;
              return getStatusOrderTour(item.status);
            },
          },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const item = row.original;
              return formatTime(item.createdAt);
            },
            maxWidth: 150,
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            maxWidth: 150,
            Cell: ({ row }: any) => {
              const data = row?.original;
              return <ButtonGroup onDetail={() => onDetail(data.id)} />;
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

export default BookingTourList;
