import React, { memo, useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import { DASHBOARD_TYPES, EVENTS, ROUTERS, SORT } from 'app/constants';
import {
  formatTime,
  formatDay,
  showConfirmUnLockPopup,
  showConfirmLockPopup,
  getRolesByIdTypes,
  getSelectOption,
  getFiledUsers,
} from 'app/utils';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Header from 'app/components/View/HeaderTable';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListUserBlocked.type';

const ListUserView = ({
  pages,
  getUserListBlocked,
  history,
  listUserBlocked,
  filter,
  roles,
  total,
  lockUser,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListUserBlock = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getUserListBlocked(customFilter);
  };

  useEffect(() => {
    onGetListUserBlock(filter);
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
    onGetListUserBlock({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListUserBlock({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onLockUser = (e: any, blocked: string, id: number) => {
    !!blocked
      ? showConfirmUnLockPopup(lockUser, id, DASHBOARD_TYPES.USER)
      : showConfirmLockPopup(id, DASHBOARD_TYPES.USER, getSelectOption());
  };

  return (
    <div>
      <Table
        name="listUserBlock"
        keySearchDefault={filter?.search}
        onSearch={onGetListUserBlock}
        filter={filter}
        placeholder={t('user.placeholder')}
        total={total}
        data={listUserBlocked}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListUserBlock({
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
            Header: <Header name={t('user.name')} />,
            accessor: 'name.keyword',
            width: 270,
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                ['original', 'profiles', 'avatars', 'mediaContent', 'url'],
                row
              );
              const owner = pathOr('', ['original', 'name'], row);
              return (
                <button
                  className="flex flex-row items-center"
                  onClick={() => onDetail(row?.original?.id)}
                >
                  <img
                    className="w-16 h-16 rounded-full"
                    src={avatar}
                    alt={''}
                  />
                  <span className="truncate py-2 px-2">{owner}</span>
                </button>
              );
            },
          },
          {
            Header: <Header name={t('user.email')} />,
            width: 270,
            accessor: 'email.email.keyword',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'email', 'email'], row),
          },
          {
            Header: <Header name={t('user.phone')} />,
            center: true,
            accessor: 'profiles.phone.phone.keyword',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'profiles', 'phone', 'phone'], row),
          },
          {
            Header: t('user.address'),
            center: true,
            sortable: false,
            accessor: 'address',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'profiles', 'address', 'address'], row),
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
              return !!birthday ? formatDay(birthday) : '';
            },
          },
          {
            Header: <Header name={t('user.created')} />,
            center: true,
            accessor: 'createdAt',
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
          },
          {
            Header: t('user.count_locations'),
            center: true,
            sortable: false,
            accessor: 'totalLocation',
          },
          {
            Header: t('user.count_plans'),
            center: true,
            sortable: false,
            accessor: 'totalPlan',
          },
          {
            Header: t('user.count_booking'),
            center: true,
            sortable: false,
            accessor: 'totalBooking',
          },
          {
            Header: t('user.count_followers'),
            center: true,
            sortable: false,
            accessor: 'totalFollower',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'totalFollower'], row),
          },
          {
            Header: t('user.count_followings'),
            center: true,
            sortable: false,
            accessor: 'totalFollowing',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'totalFollowing'], row),
          },
          {
            Header: t('user.count_report'),
            sortable: false,
            accessor: 'totalReport',
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
            accessor: 'action',
            Cell: ({ row }: any) => {
              return (
                <ButtonGroup item={row} roles={roles} onBlock={onLockUser} />
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
export default memo(ListUserView);
