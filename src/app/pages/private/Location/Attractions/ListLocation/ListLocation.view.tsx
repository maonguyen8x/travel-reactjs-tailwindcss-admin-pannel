import React, { useEffect } from 'react';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table/index';
import { EVENTS, ROUTERS, SORT } from 'app/constants';
import {
  formatTime,
  checkRoles,
  showConfirmDeleteLocationPopup,
} from 'app/utils';
import { t } from 'app/i18n';
import Header from 'app/components/View/HeaderTable';
import { pathOr } from 'ramda';
import Images from 'app/assets/images';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListLocation.type';

const ListLocationView = ({
  pages,
  history,
  getListLocation,
  listLocation,
  filter,
  roles,
  delLocation,
  LOCK_LOCATION,
  UN_LOCK_LOCATION,
  lockLocation,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListLocation = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListLocation(customFilter);
  };

  useEffect(() => {
    onGetListLocation(filter);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockLocation(data.id, { reason: data.reason });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.LOCATION_DETAIL.replace(':id', id));
  };

  const onEdit = (id: string) => {
    history.push(ROUTERS.LOCATION_EDIT.replace(':id', id));
  };

  const onDelete = (id: number) => () => {
    showConfirmDeleteLocationPopup(id, delLocation);
  };

  const onPageChange = (pageIndex: number) => {
    onGetListLocation({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListLocation({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onLockLocation = (e: any, blocked: string, id: number) => {
    if (!!blocked) {
      UN_LOCK_LOCATION(id);
    } else {
      LOCK_LOCATION(id);
    }
  };

  return (
    <div>
      <Table
        name="attractions"
        filter={filter}
        keySearchDefault={filter?.search}
        onSearch={onGetListLocation}
        placeholder={t('location.search_info')}
        data={listLocation?.data}
        total={listLocation?.count}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListLocation({
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
            Header: <Header name={t('location.name')} />,
            width: 240,
            sortable: true,
            accessor: 'name.keyword',
            Cell: ({ row }: any) => (
              <button
                className="flex flex-col text-xl text-left items-start"
                onClick={() => onDetail(row.original.id)}
              >
                <span className="text-default pb-2 font-medium break-all limit-rows">
                  {row?.original?.name}
                </span>
                <span className="text-gray-500 break-all limit-rows">
                  {row?.original?.formatedAddress}
                </span>
              </button>
            ),
          },
          {
            Header: t('location.creator'),
            accessor: 'creator',
            width: 200,
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
              const owner: any = pathOr(
                '-',
                ['original', 'creator', 'name'],
                row
              );
              const email: any = pathOr(
                '-',
                ['original', 'creator', 'email', 'email'],
                row
              );

              return (
                <button
                  className="flex flex-row w-full items-center"
                  onClick={() => onMoveUserDetail(row?.original?.creator?.id)}
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
                  <div className="ml-4 flex flex-col items-start truncate">
                    <span className="text-xl font-medium text-default pb-2">
                      {owner}
                    </span>
                    <span className="text-xl text-gray-600">{email}</span>
                  </div>
                </button>
              );
            },
          },
          {
            Header: <Header name={t('location.created')} />,
            accessor: 'createdAt',
            sortable: true,
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
            center: true,
          },
          {
            Header: t('location.table.total_checkin'),
            accessor: 'totalReview',
            width: 80,
            sortable: false,
            center: true,
          },
          {
            Header: t('location.averagePoint'),
            accessor: 'averagePoint',
            width: 80,
            sortable: false,
            center: true,
          },
          {
            Header: t('location.trend_point'),
            accessor: 'score',
            width: 80,
            sortable: false,
            center: true,
          },
          {
            Header: t('location.total_posts'),
            accessor: 'totalPost',
            sortable: false,
            width: 80,
            center: true,
          },
          {
            Header: t('location.total_plan'),
            accessor: 'totalPlan',
            width: 80,
            sortable: false,
            center: true,
          },
          {
            Header: t('location.total_activity'),
            accessor: 'totalActivity',
            width: 80,
            sortable: false,
            center: true,
          },
          {
            Header: t('location.total_report'),
            accessor: 'totalReport',
            sortable: false,
            width: 80,
            center: true,
          },
          {
            Header: t('location.edit_date'),
            accessor: 'dateEdit',
            sortable: false,
            width: 80,
            center: true,
          },

          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            width: 200,
            accessor: 'action',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return (
                <ButtonGroup
                  onEdit={() => onEdit(data?.id)}
                  isDelete={checkRoles(roles)}
                  onDelete={onDelete(data?.id)}
                  item={row}
                  roles={roles}
                  onBlock={onLockLocation}
                />
              );
            },
          },
        ]}
        offset={offset}
        limit={limit}
        pages={pages}
        page={offset}
        pageSize={limit}
      />
    </div>
  );
};

export default ListLocationView;
