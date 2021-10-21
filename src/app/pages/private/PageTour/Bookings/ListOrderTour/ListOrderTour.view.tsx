/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
import { ROUTERS, SORT, VND } from 'app/constants';
import { formatTime, formatMoney, getStatusOrderTour } from 'app/utils';
import { pathOr } from 'ramda';
import { handleBookingWithStatus } from 'app/pages/private/_common/OrderStay/ListOrderStay/utils';
import { IProps, IFilter } from './ListOrderTour.type';

const OrderTourList = ({
  pages,
  fetching,
  filter,
  history,
  getListBookingTour,
  listBooking,
  ON_FILTER_BY_STATUS,
  filterStatus,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListBookingTour = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListBookingTour(customFilter);
  };

  useEffect(() => {
    onGetListBookingTour(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListBookingTour({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListBookingTour({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.ORDER_TOUR_DETAIL.replace(':id', id));
  };

  const newDataBooking = handleBookingWithStatus(listBooking, filterStatus);

  return (
    <div>
      <Table
        onSearch={onGetListBookingTour}
        data={newDataBooking}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListBookingTour({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
        }}
        columns={[
          {
            Header: t('app.table.booking_code'),
            accessor: 'bookingCode',
          },
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
            Header: t('app.table.price'),
            accessor: 'totalPrice',
            Cell: ({ row }: any) => {
              const price = row?.original?.totalPrice;
              return formatMoney(VND, Number(price));
            },
          },
          {
            Header: t('app.table.status'),
            accessor: 'status',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return getStatusOrderTour(data.bookingStatus);
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
            accessor: 'action',
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

export default OrderTourList;
