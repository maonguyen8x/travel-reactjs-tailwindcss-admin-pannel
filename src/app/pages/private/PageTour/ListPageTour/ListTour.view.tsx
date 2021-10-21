import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { SORT, ROUTERS } from 'app/constants';
import { checkRoles, formatTime, getFieldTour, onDeteleTour } from 'app/utils';
import { t } from 'app/i18n';
import Header from 'app/components/View/HeaderTable';
import { IProps, IFilter } from './ListTour.type';
import Images from '../../../../assets/images';

const ListTourView = ({
  pages,
  getListTour,
  listTour,
  filter,
  ON_NAVIGATE,
  roles,
  history,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListTour = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListTour(customFilter);
  };

  useEffect(() => {
    onGetListTour(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListTour({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListTour({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDelete = (e: any, id: number, page: any) => {
    onDeteleTour(id, onGetListTour, page);
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.TOUR_DETAIL.replace(':id', id));
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  return (
    <div className="">
      <Table
        name="listTour"
        keySearchDefault={filter?.search}
        onSearch={onGetListTour}
        data={listTour?.data}
        total={listTour?.count}
        placeholder={t('tour.placeholder')}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListTour({
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
            Header: <Header name={t('tour.name')} />,
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
                  className="flex items-center cursor-pointer"
                  onClick={() => onDetail(row?.original?.id)}
                >
                  <div className="flex-shrink-0 h-10">
                    <img
                      className="h-10 rounded-full shadow"
                      src={avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex flex-col items-start text-left">
                    <span className="text-xl font-medium text-default pb-2 break-all limit-rows">
                      {owner}
                    </span>
                    <span className="text-xl text-gray-600 break-all limit-rows">
                      {address}
                    </span>
                  </div>
                </button>
              );
            },
          },
          {
            Header: <Header name={t('tour.creator')} />,
            accessor: 'userId',
            Cell: ({ row }: any) => {
              const owner: any = pathOr(null, ['original', 'user'], row);
              const email: any = pathOr(
                '-',
                ['original', 'user', 'email', 'email'],
                row
              );
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
                  <div className="ml-4 flex flex-col items-start text-left">
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
            Header: <Header name={t('tour.createdAt')} />,
            sortable: true,
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
          },
          {
            Header: <Header name={t('tour.total_posts')} />,
            width: 100,
            sortable: false,
            accessor: 'totalPosts',
            center: true,
          },
          {
            Header: t('tour.total_ranking'),
            width: 100,
            sortable: false,
            accessor: 'totalReview',
            center: true,
          },
          {
            Header: t('tour.total_followers'),
            width: 100,
            sortable: false,
            accessor: 'totalFollowers',
            center: true,
          },
          {
            Header: t('tour.verify'),
            sortable: false,
            accessor: 'isActive',
            center: true,
            Cell: ({ row }: any) =>
              row?.original?.isActive && (
                <i className="fas fa-check text-2xl text-green-500" />
              ),
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
                  onEdit={() => {
                    ON_NAVIGATE(ROUTERS.TOUR_EDIT.replace(':id', data.id));
                  }}
                  onBlock={(e) => {
                    // No Handle
                  }}
                  isDelete={checkRoles(roles)}
                  onDelete={(e: any) =>
                    onDelete(e, data?.id, {
                      offset: row?.page,
                      limit: row?.pageSize,
                    })
                  }
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
export default ListTourView;
