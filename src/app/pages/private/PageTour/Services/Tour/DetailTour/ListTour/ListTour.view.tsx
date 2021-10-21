import React from 'react';
import Table from 'app/components/Table';
import { formatMoney } from 'app/utils';
import { t } from 'app/i18n';
import { DATA_SERVICES } from '../Tour.data';

const ListTourView = () => {
  return (
    <>
      <Table
        data={DATA_SERVICES}
        onPageChange={() => ({})}
        onPageSizeChange={() => ({})}
        onSortedChange={(column: any, desc = true) => {}}
        columns={[
          {
            Header: t('tour.service.name'),
            accessor: 'name',
          },
          {
            Header: t('tour.service.location'),
            accessor: 'location',
          },
          {
            Header: t('tour.service.type'),
            accessor: 'type',
          },
          {
            Header: t('tour.service.price_adults'),
            accessor: 'priceAdults',
            Cell: ({ row }: any) => {
              return formatMoney('VND', row?.original?.priceAdults);
            },
          },
          {
            Header: t('tour.service.price.child'),
            accessor: 'priceChild',
            Cell: ({ row }: any) => {
              return formatMoney('VND', row?.original?.priceAdults);
            },
          },
        ]}
        pageSize={20}
      />
    </>
  );
};
export default ListTourView;
