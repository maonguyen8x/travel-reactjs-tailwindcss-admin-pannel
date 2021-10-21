import React, { useEffect } from 'react';
import Table from 'app/components/Table/index';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { EVENTS, ROUTERS, SORT } from 'app/constants';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import {
  formatMoney,
  formatTime,
  showConfirmDeleteActivityPopup,
  checkRoles,
  getStyleActivityStatus,
  formatUtcDefaultDateTime,
} from 'app/utils';
import Header from 'app/components/View/HeaderTable';
import Images from 'app/assets/images';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListActivities.type';

const ListActivitiesView = ({
  pages,
  history,
  currencies,
  filter,
  listActivities,
  list,
  roles,
  delActivity,
  LOCK_ACTIVITY,
  UN_LOCK_ACTIVITY,
  lockActivity,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListActivities = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    listActivities(customFilter);
  };

  useEffect(() => {
    onGetListActivities(filter);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockActivity(data.id, { reason: data.reason });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.ACTIVITY_DETAIL.replace(':id', id));
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onPageChange = (pageIndex: number) => {
    onGetListActivities({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListActivities({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onEdit = (id: string) => {
    history.push(ROUTERS.EDIT_ACTIVITY.replace(':id', id));
  };

  const onDelete = (id: number) => () => {
    showConfirmDeleteActivityPopup(id, delActivity);
  };

  const onLockActivity = (e: any, blocked: string, id: number) => {
    if (!!blocked) {
      UN_LOCK_ACTIVITY(id);
    } else {
      LOCK_ACTIVITY(id);
    }
  };

  return (
    <div className="">
      <Table
        name="listActivity"
        keySearchDefault={filter?.search}
        placeholder={t('activity.placeholder')}
        onSearch={onGetListActivities}
        total={list?.count}
        data={list?.data}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListActivities({
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
            Header: <Header name={t('activity.name')} />,
            accessor: 'name.keyword',
            sortable: true,
            width: 240,
            Cell: ({ row }: any) => (
              <button
                className="flex flex-col text-xl text-left items-start"
                onClick={() => onDetail(row.original.id)}
              >
                <span className="text-default pb-2 font-medium break-all limit-rows">
                  {row?.original?.name}
                </span>
                <span className="text-gray-500 break-all limit-rows">
                  {row?.original?.location?.address}
                </span>
              </button>
            ),
          },
          {
            Header: t('activity.creator'),
            accessor: 'creator',
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                [
                  'original',
                  'createdBy',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'url',
                ],
                row
              );
              const owner: any = pathOr('', ['original', 'createdBy'], row);
              const email: any = pathOr(
                '-',
                ['original', 'createdBy', 'email', 'email'],
                row
              );

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
                  <div className="ml-4 flex flex-col items-start text-left truncate">
                    <span className="text-xl font-medium text-default pb-2">
                      {owner?.name || '-'}
                    </span>
                    <span className="text-xl text-gray-600">{email}</span>
                  </div>
                </button>
              );
            },
          },
          {
            Header: t('activity.time'),
            accessor: 'time',
            Cell: ({ row }: any) => {
              const time = row?.original;
              const startDate = formatUtcDefaultDateTime(time?.from);
              const endDate = formatUtcDefaultDateTime(time?.to);

              return (
                <div className="flex flex-col">
                  <span className="font-medium">{startDate}</span>
                  <span className="time">{endDate}</span>
                </div>
              );
            },
          },
          {
            Header: t('verify.status'),
            accessor: 'status',
            Cell: ({ row }: any) => {
              const status = row?.original?.status;
              return getStyleActivityStatus(status);
            },
          },
          {
            Header: t('activity.price'),
            accessor: 'price',
            center: true,
            Cell: ({ row }: any) => {
              const data = row?.original;
              const codeCurrency =
                currencies[data.currencyId - 1]?.code || 'VNĐ';
              return formatMoney(codeCurrency, data?.price);
            },
          },
          {
            Header: <Header name={t('activity.join')} />,
            accessor: 'participantNumber',
            sortable: true,
            center: true,
            width: 60,
          },

          {
            Header: t('activity.createdAt'),
            accessor: 'createdAt',
            sortable: true,
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
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
                  onBlock={onLockActivity}
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

export default ListActivitiesView;
