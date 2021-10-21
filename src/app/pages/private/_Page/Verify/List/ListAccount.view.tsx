import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import Table from 'app/components/Table';
import { ROUTERS, SORT } from 'app/constants';
import {
  formatTime,
  getTypesStatusVerifyPage,
  getFieldVerify,
} from 'app/utils';
import { pathOr } from 'ramda';
import Images from 'app/assets/images';
import { IProps, IFilter } from './ListAccount.type';

const ListAccount = ({
  pages,
  fetching,
  listVerifyPage,
  getListVerifyPage,
  filter,
  history,
}: IProps) => {
  const { offset, limit } = filter;

  const onGetListVerifyPage = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListVerifyPage(customFilter);
  };

  useEffect(() => {
    onGetListVerifyPage(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListVerifyPage({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListVerifyPage({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.VERIFY_ACCOUNT_DETAIL.replace(':id', id));
  };

  return (
    <>
      <Table
        data={listVerifyPage?.data}
        total={listVerifyPage?.count}
        onPageChange={onPageChange}
        onDetail={onDetail}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListVerifyPage({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: 'ID',
            accessor: 'id',
            width: 60,
            sortable: true,
            center: true,
          },
          {
            Header: t('verify.name'),
            accessor: 'fullName',
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                [
                  'original',
                  'page',
                  'user',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'url',
                ],
                row
              );
              const owner = pathOr('-', ['original', 'fullName'], row);
              const email = pathOr('-', ['original', 'page', 'email'], row);

              return (
                <div className="flex items-center cursor-pointer">
                  <div className="flex-shrink-0 h-10">
                    <img
                      className="h-12 rounded-full shadow"
                      src={avatar || Images.avatar_defautl.default}
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex flex-col">
                    <span className="text-xl font-medium text-blue-400 pb-2">
                      {owner}
                    </span>
                    <span className="text-xl text-gray-600">{email}</span>
                  </div>
                </div>
              );
            },
          },
          {
            Header: t('verify.type'),
            accessor: 'identityType',
            Cell: ({ row }: any) => {
              const type = pathOr('-', ['original', 'page', 'type'], row);
              return type;
            },
          },
          {
            Header: t('verify.code'),
            accessor: 'identityCode',
          },
          {
            Header: t('verify.created'),
            accessor: 'createdAt',
            sortable: true,
            Cell: ({ row }: any) => {
              const data = row?.original;
              return formatTime(data.createdAt);
            },
          },
          {
            Header: t('verify.status'),
            accessor: 'status',
            Cell: ({ row }: any) => {
              const status = row?.original?.status;
              return getTypesStatusVerifyPage(status);
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

export default ListAccount;
