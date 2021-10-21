import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import { ROUTERS, SORT } from 'app/constants';
import Table from 'app/components/Table';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { formatTime } from 'app/utils';
import { IProps, IFilter } from './ListPolicy.type';

const PolicyList = ({
  pages,
  fetching,
  getListPolicy,
  history,
  list,
  filter,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListPolicy = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListPolicy(customFilter);
  };

  useEffect(() => {
    onGetListPolicy(filter);
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.POLICY_DETAIL.replace(':id', id));
  };

  const onEdit = (id: string) => () => {
    history.push(ROUTERS.POLICY_EDIT.replace(':id', id));
  };

  const onPageChange = (pageIndex: number) => {
    onGetListPolicy({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListPolicy({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  return (
    <div>
      <Table
        data={list}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListPolicy({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.alias'),
            accessor: 'alias',
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
            sortable: false,
            maxWidth: 150,
            Cell: ({ row }: any) => {
              const policy = row.original;
              return (
                <ButtonGroup
                  onDetail={() => onDetail(policy.id)}
                  onEdit={onEdit(policy.id)}
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
    </div>
  );
};

export default PolicyList;
