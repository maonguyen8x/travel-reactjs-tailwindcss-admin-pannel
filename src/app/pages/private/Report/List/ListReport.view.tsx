import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import {
  getTypeReport,
  ReportStatusTypes,
  getFieldReport,
  formatUtcDateTime,
} from 'app/utils';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import { ROUTERS, SORT, SEARCH_TYPES } from 'app/constants';
import Header from 'app/components/View/HeaderTable';
import { IProps, IFilter } from './ListReport.type';

const ReportList = ({
  pages,
  history,
  getListReport,
  listReport,
  filter,
  match,
}: IProps) => {
  const { limit, offset } = filter;

  const id = history?.location?.pathname?.split('/')?.[4];

  const onGetListReport = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      ...(!!id && {
        searchType: SEARCH_TYPES.POST,
        postId: id,
      }),
    };

    getListReport(customFilter);
  };

  useEffect(() => {
    onGetListReport(filter);
    return () => {
      getListReport(filter);
    };
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListReport({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListReport({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => () => {
    history.push(ROUTERS.REPORT_DETAIL.replace(':id', id));
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  return (
    <div className="">
      <Table
        name="listReport"
        keySearchDefault={filter?.search}
        onSearch={onGetListReport}
        data={listReport?.data}
        placeholder={t('report.placeholder')}
        total={listReport?.count}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListReport({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
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
            Header: t('report.content'),
            accessor: 'content',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return (
                <button onClick={onDetail(data?.id)}>
                  <span className="text-blue-400 font-medium">
                    {data?.content}
                  </span>
                </button>
              );
            },
          },
          {
            Header: t('report.name'),
            accessor: 'name',
            sortable: true,
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
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
                <button
                  className="flex flex-row w-full items-center"
                  onClick={() => onMoveUserDetail(row?.original?.user?.id)}
                >
                  <img
                    className="h-10 rounded-full shadow mr-3"
                    src={avatar}
                    alt={avatar}
                  />
                  <span className="text-xl text-default font-medium">
                    {name}
                  </span>
                </button>
              );
            },
          },
          {
            Header: <Header name={t('report.created')} />,
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return formatUtcDateTime(data.createdAt);
            },
          },
          {
            Header: t('report.type'),
            accessor: 'type',
            Cell: ({ row }: any) => {
              const reportType = pathOr('', ['original', 'reportType'], row);
              return `${t('menu.report')} ${getTypeReport(reportType)}`;
            },
          },
          {
            Header: t('report.status'),
            accessor: 'status',
            sortable: true,
            Cell: ({ row }: any) => {
              const reportStatusType = row?.original?.reportStatus;
              return ReportStatusTypes(reportStatusType);
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
export default ReportList;
