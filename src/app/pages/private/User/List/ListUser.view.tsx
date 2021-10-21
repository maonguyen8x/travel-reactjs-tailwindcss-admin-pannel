import React, { memo, useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import {
  DASHBOARD_TYPES,
  EVENTS,
  ROUTERS,
  SORT,
  USER_ROLES,
} from 'app/constants';
import {
  formatTime,
  formatDay,
  showConfirmUnLockPopup,
  showConfirmLockPopup,
  getRolesByIdTypes,
  getSelectOption,
} from 'app/utils';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListUser.type';

const ListUserView = ({
  pages,
  getUserList,
  history,
  listUser,
  filter,
  roles,
  lockUser,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListUser = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getUserList(customFilter);
  };
  useEffect(() => {
    onGetListUser(filter);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockUser(data.id, { reason: data.reason });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListUser({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListUser({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onLockUser = (e: any, blocked: string, id: number) => {
    e?.stopPropagation();
    !!blocked
      ? showConfirmUnLockPopup(lockUser, id, DASHBOARD_TYPES.USER)
      : showConfirmLockPopup(id, DASHBOARD_TYPES.USER, getSelectOption());
  };

  return (
    <div className="relative">
      <Table
        name="listUser"
        keySearchDefault={filter?.search}
        onSearch={onGetListUser}
        placeholder={t('user.placeholder')}
        total={listUser?.count}
        data={listUser?.data}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListUser({
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
            Header: t('user.list.name'),
            accessor: 'name.keyword',
            sortable: true,
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                ['original', 'profiles', 'avatars', 'mediaContent', 'url'],
                row
              );
              const owner = pathOr('', ['original', 'name'], row);
              const email = pathOr('', ['original', 'email', 'email'], row);

              return (
                <button
                  className="flex items-center"
                  onClick={() => {
                    onDetail(row?.original?.id);
                  }}
                >
                  <div className="flex-shrink-0 h-10">
                    <img
                      className="h-10 rounded-full shadow"
                      src={avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex flex-col items-start">
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
            Header: t('user.phone'),
            center: true,
            sortable: true,
            accessor: 'profiles.phone.phone.keyword',
            Cell: ({ row }: any) =>
              pathOr('-', ['original', 'profiles', 'phone', 'phone'], row),
          },
          {
            Header: t('user.address'),
            center: true,
            sortable: false,
            accessor: 'address',
            Cell: ({ row }: any) =>
              pathOr('-', ['original', 'profiles', 'address', 'address'], row),
          },
          {
            Header: t('user.birthday'),
            center: true,
            sortable: false,
            accessor: 'birthday',
            Cell: ({ row }: any) => {
              const birthday = pathOr(
                false,
                ['original', 'profiles', 'birthday', 'birthday'],
                row
              );
              return !!birthday ? formatDay(birthday) : '-';
            },
          },
          {
            Header: t('user.created'),
            center: true,
            accessor: 'createdAt',
            sortable: true,
            Cell: ({ row }: any) => {
              return formatTime(row?.original?.createdAt);
            },
          },
          {
            Header: t('user.gender'),
            center: true,
            sortable: false,
            accessor: 'gender',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'profiles', 'gender', 'gender'], row),
          },
          {
            Header: t('user.job'),
            center: true,
            sortable: false,
            accessor: 'job',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'profiles', 'work', 'work'], row),
          },
          {
            Header: t('user.count_posts'),
            center: true,
            sortable: false,
            accessor: 'totalPost',
            show: false,
          },
          {
            Header: t('user.count_locations'),
            center: true,
            sortable: false,
            accessor: 'totalLocation',
            show: false,
          },
          {
            Header: t('user.count_plans'),
            center: true,
            sortable: false,
            accessor: 'totalPlan',
            show: false,
          },
          {
            Header: t('user.count_booking'),
            center: true,
            sortable: false,
            accessor: 'totalBooking',
            show: false,
          },
          {
            Header: t('user.count_followers'),
            center: true,
            sortable: false,
            accessor: 'totalFollower',
            show: false,
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'totalFollower'], row),
          },
          {
            Header: t('user.count_followings'),
            center: true,
            sortable: false,
            accessor: 'totalFollowing',
            show: false,
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'totalFollowing'], row),
          },
          {
            Header: t('user.count_report'),
            sortable: false,
            accessor: 'totalReport',
            show: false,
          },
          {
            Header: t('user.permission'),
            sortable: false,
            accessor: 'permission',
            Cell: ({ row }: any) => getRolesByIdTypes(row?.original?.roles),
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            sortable: false,
            width: 200,
            accessor: 'action',
            Cell: ({ row }: any) => {
              return (
                <ButtonGroup
                  isChangeRole
                  item={row}
                  roles={roles}
                  onBlock={onLockUser}
                  isLock={row?.original?.roles !== USER_ROLES.SUPER_ADMIN}
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
export default memo(ListUserView);
