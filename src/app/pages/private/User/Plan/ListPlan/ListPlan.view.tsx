import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { formatDay, getTypesPlan } from 'app/utils';
import { t } from 'app/i18n';
import { ROUTERS, SORT } from 'app/constants';
import { IProps, IFilter } from './ListPlan.type';

const ListPlanForm = ({
  fetching,
  pages,
  listPlan,
  getListPlan,
  history,
  filter,
  match,
}: IProps) => {
  const { limit, offset } = filter;
  const id = match?.params?.id;

  const onGetListPlan = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListPlan(id, customFilter);
  };

  useEffect(() => {
    onGetListPlan(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListPlan({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListPlan({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.PLAN_DETAIL.replace(':id', id));
  };

  return (
    <div>
      <Table
        isShowSearch={false}
        onDetail={onDetail}
        data={listPlan?.data}
        total={listPlan?.count}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListPlan({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
        }}
        columns={[
          {
            Header: t('plan.name'),
            accessor: 'planName',
            Cell: ({ row }: any) => {
              return (
                <span className="text-blue-400 font-medium">
                  {row?.original?.planName}
                </span>
              );
            },
          },
          {
            Header: t('plan.startDate'),
            accessor: 'startDate',
            Cell: ({ row }: any) => {
              return formatDay(row?.original?.startDate);
            },
            center: true,
          },
          {
            Header: t('plan.endDate'),
            accessor: 'endDate',
            Cell: ({ row }: any) => {
              return formatDay(row?.original?.endDate);
            },
            center: true,
          },
          {
            Header: t('plan.totalLocation'),
            accessor: 'totalLocation',
            center: true,
          },
          {
            Header: t('plan.note'),
            accessor: 'note',
          },
          {
            Header: t('plan.status'),
            accessor: 'status',
            Cell: ({ row }: any) => {
              return getTypesPlan(row?.original?.status);
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
export default ListPlanForm;
