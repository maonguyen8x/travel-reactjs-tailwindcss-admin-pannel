import React, { useEffect, memo } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table/index';
import { ROUTERS, SORT } from 'app/constants/index';
import { formatTime, changeStatus, getFieldChangeLocation } from 'app/utils';
import { t } from 'app/i18n';
import Images from 'app/assets/images';
import { IProps, IFilter } from './RequestChangeLocation.type';
import Header from '../../../../../components/View/HeaderTable';

const RequestChangeLocationList = ({
  pages,
  listRequestChangeLocation,
  getListRequestChangeLocation,
  history,
  filter,
}: IProps) => {
  const { offset, limit } = filter;

  const onGetListRequestChangeLocations = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListRequestChangeLocation(customFilter);
  };

  useEffect(() => {
    onGetListRequestChangeLocations(filter);
  }, []);

  const onPageChange = (pageIndex?: number) => {
    onGetListRequestChangeLocations({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListRequestChangeLocations({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.DETAIL_REQUEST_CHANGE_LOCATION.replace(':id', id));
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  return (
    <div>
      <Table
        name="changeLocation"
        keySearchDefault={filter?.search}
        onSearch={onGetListRequestChangeLocations}
        placeholder={t('change_location.placeholder')}
        total={listRequestChangeLocation?.count}
        data={listRequestChangeLocation?.data}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListRequestChangeLocations({
            order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
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
            Header: <Header name={t('location.name')} />,
            width: 240,
            sortable: true,
            accessor: 'name.keyword',
            Cell: ({ row }: any) => (
              <button
                className="flex flex-col text-xl text-left items-start"
                onClick={() => onDetail(row.original.id)}
              >
                <span className="text-blue-400 pb-2 font-medium">
                  {row?.original?.name}
                </span>
                <span className="text-gray-500">
                  {row?.original?.formatedAddress}
                </span>
              </button>
            ),
          },
          {
            Header: t('location.creator'),
            accessor: 'creator',
            sortable: false,
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                [
                  'original',
                  'creator',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'urlTiny',
                ],
                row
              );
              const owner: any = pathOr('-', ['original', 'creator'], row);
              return (
                <button
                  className="flex flex-row w-full items-center"
                  onClick={() => onMoveUserDetail(owner?.id)}
                >
                  <img
                    className="h-10 rounded-full shadow mr-3"
                    src={
                      avatar && avatar !== 0
                        ? avatar
                        : Images.avatar_defautl.default
                    }
                    alt={avatar}
                  />
                  <span className="text-xl text-default font-medium">
                    {owner?.name}
                  </span>
                </button>
              );
            },
          },
          {
            Header: t('change_location.created'),
            accessor: 'createdAt',
            sortable: true,
            center: true,
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
          },
          {
            Header: t('change_location.status'),
            accessor: 'status.keyword',
            sortable: true,
            center: true,
            Cell: ({ row }: any) => {
              const status = row?.original?.status;
              return (
                <button onClick={() => onDetail(row.original.id)}>
                  {changeStatus(status)}
                </button>
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

export default React.memo(RequestChangeLocationList);
