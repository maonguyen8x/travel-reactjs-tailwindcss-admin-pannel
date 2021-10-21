import React, { useEffect } from 'react';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table/index';
import { EVENTS, ROUTERS, SORT, TRAVEL_TYPES } from 'app/constants';
import {
  formatTime,
  checkRoles,
  showConfirmDeleteLocationPopup,
  getFieldsLocation,
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
        lockLocation(data.id, { reason: data.reason, system: true });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.LOCATION_SYSTEM_DETAIL.replace(':id', id));
  };

  const onEdit = (id: string) => {
    history.push(ROUTERS.LOCATION_SYSTEM_EDIT.replace(':id', id));
  };

  const onDelete = (id: number) => () => {
    showConfirmDeleteLocationPopup(id, delLocation, true);
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
        name="location"
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
            Header: 'Location Type',
            accessor: 'locationType',
            sortable: false,
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
            Header: t('location.edit_date'),
            accessor: 'dateEdit',
            width: 80,
            sortable: false,
            center: true,
          },

          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            width: 200,
            sortable: false,
            accessor: 'action',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return (
                <ButtonGroup
                  onEdit={() => onEdit(data?.id)}
                  isDelete={checkRoles(roles)}
                  onDelete={onDelete(data?.id)}
                  isLock={data?.locationType === TRAVEL_TYPES.WHERE}
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
