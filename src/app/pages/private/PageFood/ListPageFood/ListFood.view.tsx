import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import { EVENTS, ROUTERS, SORT } from 'app/constants';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { t } from 'app/i18n';
import {
  formatTime,
  checkRoles,
  showConfirmDeletePageFoodPopup,
} from 'app/utils';
import Header from 'app/components/View/HeaderTable';
import { IConCheck } from 'app/components/layout/styled';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListFood.type';
import Images from '../../../../assets/images';

const ListFoodView = ({
  pages,
  getListFoodPage,
  listFoodPage,
  history,
  filter,
  roles,
  LOCK_PAGE,
  UN_LOCK_PAGE,
  lockPage,
  delPage,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListFoodPage = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    getListFoodPage(customFilter);
  };

  useEffect(() => {
    onGetListFoodPage(filter);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockPage(data.id, { reason: data.reason });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListFoodPage({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListFoodPage({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.FOOD_DETAIL.replace(':id', id));
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onDelete = (id: number) => () => {
    showConfirmDeletePageFoodPopup(id, delPage);
  };

  const onLockPage = (e: any, blocked: string, id: number) => {
    if (!!blocked) {
      UN_LOCK_PAGE(id);
    } else {
      LOCK_PAGE(id);
    }
  };

  return (
    <div className="">
      <Table
        name="listFood"
        keySearchDefault={filter?.search}
        onSearch={onGetListFoodPage}
        placeholder={t('food.placeholder.search')}
        data={listFoodPage?.data}
        total={listFoodPage?.count}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListFoodPage({
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
            Header: <Header name={t('food.name')} />,
            accessor: 'name.keyword',
            sortable: true,
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '-',
                ['original', 'avatarMedia', 'urlTiny'],
                row
              );
              const owner = pathOr('', ['original', 'name'], row);
              const address = pathOr(
                '-',
                ['original', 'location', 'formatedAddress'],
                row
              );
              return (
                <button
                  className="flex items-center"
                  onClick={() => onDetail(row?.original?.id)}
                >
                  <div className="flex-shrink-0 h-10">
                    <img
                      className="h-10 rounded-full shadow"
                      src={avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex flex-col items-start text-left ">
                    <span className="text-xl font-medium text-default pb-2  break-all limit-rows">
                      {owner}
                    </span>
                    <span className="text-xl text-gray-600 limit-rows break-all">
                      {address}
                    </span>
                  </div>
                </button>
              );
            },
          },
          {
            Header: t('food.creator'),
            width: 200,
            accessor: 'creator',
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
              const owner: any = pathOr(null, ['original', 'user'], row);
              const email: any = pathOr(
                '-',
                ['original', 'user', 'email', 'email'],
                row
              );

              return (
                <button
                  className="flex flex-row items-center"
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
            Header: <Header name={t('food.createdAt')} />,
            sortable: true,
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
          },
          {
            Header: t('food.total_posts'),
            accessor: 'totalPosts',
            center: true,
          },
          {
            Header: t('food.total_service'),
            accessor: 'totalService',
            center: true,
          },
          {
            Header: t('food.total_review'),
            accessor: 'totalReview',
            center: true,
          },
          {
            Header: t('food.total_follow'),
            accessor: 'totalFollow',
            center: true,
          },
          {
            Header: t('food.count_like'),
            accessor: 'like',
            center: true,
          },
          {
            Header: t('food.count_comment'),
            accessor: 'comment',
            center: true,
          },
          {
            Header: t('food.count_share'),
            accessor: 'share',
            center: true,
          },
          {
            Header: t('food.verify'),
            accessor: 'isActive',
            center: true,
            Cell: ({ row }: any) => row?.original?.isActive && <IConCheck />,
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
              const data = row.original;
              return (
                <ButtonGroup
                  onDelete={onDelete(data?.id)}
                  isDelete={checkRoles(roles)}
                  item={row}
                  roles={roles}
                  onBlock={onLockPage}
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
export default ListFoodView;
