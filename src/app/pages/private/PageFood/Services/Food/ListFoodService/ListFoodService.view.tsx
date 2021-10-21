import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatMoney } from 'app/utils';
import { SORT } from 'app/constants';
import { t } from 'app/i18n';
import { IProps } from './ListFoodService.type';

interface IFilter {
  offset?: number;
  limit?: number;
  order?: string | string[];
}

const FoodServices = ({
  pages,
  fetching,
  getListServicesFood,
  listServiceFood,
  filter,
  currencies,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListServicesFood = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListServicesFood(customFilter);
  };

  useEffect(() => {
    onGetListServicesFood(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListServicesFood({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListServicesFood({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  return (
    <div>
      <Table
        data={listServiceFood}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListServicesFood({
            order: desc
              ? `${column?.id} ${SORT.DESC}`
              : `${column?.id} ${SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.name'),
            accessor: 'name',
          },
          {
            Header: t('app.table.price'),
            accessor: 'price',
            Cell: ({ row }: any) => {
              const data = row?.original;
              const codeCurrency =
                currencies[data.currencyId - 1]?.code || 'VND';
              return formatMoney(codeCurrency, data?.price);
            },
          },
          {
            Header: t('app.table.page'),
            accessor: 'name',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'page', 'name'], row),
          },
          {
            Header: t('app.table.type'),
            accessor: 'type',
          },
          {
            Header: t('APP.TABLE.TOTAL_LIKE'),
            accessor: 'like',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalLike'], row),
          },
          {
            Header: t('APP.TABLE.TOTAL_COMMENT'),
            accessor: 'comment',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalComment'], row),
          },
          {
            Header: t('APP.TABLE.TOTAL_RANKING'),
            accessor: 'ranking',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalRanking'], row),
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

export default FoodServices;
