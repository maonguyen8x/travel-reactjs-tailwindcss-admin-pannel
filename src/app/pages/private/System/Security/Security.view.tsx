/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { SORT } from 'app/constants';
import Table from 'app/components/Table';
import { t } from 'app/i18n';
import { formatTime, getFieldFeedback, deleteIPAddressById } from 'app/utils';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Header from 'app/components/View/HeaderTable';
import { IProps, IFilter } from './Security.type';

const BlackListIps = ({
  pages,
  getListFeedback,
  listFeedback,
  filter,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListBlackListIPS = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    getListFeedback(customFilter);
  };

  useEffect(() => {
    onGetListBlackListIPS(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListBlackListIPS({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListBlackListIPS({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDelete = (id: number) => () => {
    deleteIPAddressById(id, onGetListBlackListIPS, filter);
  };

  return (
    <>
      <div>
        <div className="text-gray-700 md:flex md:items-center">
          <div className="text-2xl font-bold">
            {t('admin.security.whitelist.title')}
          </div>
        </div>

        <div className="text-gray-700 md:flex md:items-center mt-3 mr-5">
          <div className="mr-8">
            <label className="tracking-wide text-2xl">
              {t('admin.security.allow.IPs.title')}
            </label>
            <div className="text-1xl">(Separated by commas)</div>
          </div>

          <div className="md:w-2/3 md:flex-grow">
            <textarea
              rows={4}
              placeholder="192.168.54.0/23,172.0.0.1"
              className="flex flex-1 h-16 px-3 py-2 w-full placeholder-gray-600 border rounded-lg focus:shadow-outline"
            />
          </div>

          <div className="ml-3">
            <button className="px-10 py-3 bg-tab-active text-white text-xl">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="grid-cols-2 grid gap-10 ">
        <div>
          <div className="">
            <div className="text-2xl mt-6 font-bold">
              {t('admin.security.blacklist.title')}
            </div>
            <div className="-mb-3 mt-3 bg-white shadow pl-3 flex border">
              <span className="w-auto flex justify-end items-center text-gray-500 p-2">
                <i className="material-icons text-3xl">search</i>
              </span>
              <input
                placeholder={t('admin.security.search.input')}
                className="flex flex-1 h-16 px-3 py-2 w-full placeholder-gray-600 rounded-lg focus:shadow-outline"
              />
            </div>
            <Table
              name="listFeedback"
              isShowSearch={false}
              onSearch={onGetListBlackListIPS}
              data={listFeedback?.data}
              total={listFeedback?.count}
              placeholder={t('search')}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              onSortedChange={(column: any, desc = true) => {
                if (column?.id) {
                  onGetListBlackListIPS({
                    order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
                  });
                }
              }}
              columns={[
                {
                  Header: t('admin.security.ips'),
                  accessor: 'content',
                  width: 450,
                },
                {
                  Header: <Header name={t('admin.security.time')} />,
                  accessor: 'createdAt',
                  Cell: ({ row }: any) => {
                    const data = row?.original;
                    return formatTime(data.createdAt);
                  },
                },
                {
                  Header: (
                    <div className="flex w-full w-40 items-center justify-center">
                      {t('admin.security.action')}
                    </div>
                  ),
                  accessor: 'action',
                  width: 60,
                  sortable: false,
                  Cell: ({ row }: any) => {
                    const data = row?.original;
                    return (
                      <ButtonGroup
                        onBlockIP={() => ({})}
                        onDelete={onDelete(data?.id)}
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
        </div>
      </div>
    </>
  );
};

export default BlackListIps;
