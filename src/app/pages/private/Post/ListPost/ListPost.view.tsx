/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { ROUTERS, SORT, INTERACTIVE, EVENTS } from 'app/constants';
import {
  formatTime,
  getTypeInteractive,
  getTypePost,
  checkRoles,
  getFieldPost,
  getPhotoPostByUser,
  showConfirmDeletePostPopup,
} from 'app/utils';
import { t } from 'app/i18n';

import Header from 'app/components/View/HeaderTable';
import Images from 'app/assets/images';
import { EventRegister } from 'app/services/EventRegister';
import { IProps, IFilter } from './ListPost.type';

const ListPostView = ({
  pages,
  getListPost,
  history,
  listPost,
  filter,
  roles,
  LOCK_POST,
  UN_LOCK_POST,
  lockPost,
  delPost,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListPost = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListPost(customFilter);
  };

  useEffect(() => {
    onGetListPost(filter);
    const listener: any = EventRegister.addEventListener(
      EVENTS.LOCK_REQUEST,
      (data) => {
        lockPost(data.id, { reason: data.reason });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  const onDetail = (id: string) => {
    history.push(ROUTERS.POST_DETAIL.replace(':id', id));
  };

  const onEdit = (id: string) => () => {
    history.push(ROUTERS.POST_EDIT.replace(':id', id));
  };

  const onDelete = (id: number) => () => {
    showConfirmDeletePostPopup(id, delPost);
  };

  const onPageChange = (pageIndex: number) => {
    onGetListPost({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListPost({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onMoveUserDetail = (id: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onLockPost = (e: any, blocked: string, id: number) => {
    if (!!blocked) {
      UN_LOCK_POST(id);
    } else {
      LOCK_POST(id);
    }
  };

  return (
    <div className="">
      <Table
        name="listPost"
        keySearchDefault={filter?.search}
        placeholder={t('posts.placeholder')}
        onSearch={onGetListPost}
        total={listPost?.count}
        data={listPost?.data}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListPost({
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
            Header: <Header name={t('post.content')} />,
            accessor: 'content.keyword',
            width: 250,
            Cell: ({ row }: any) => {
              const content = row?.original?.content;
              const mediaContents = getPhotoPostByUser(row?.original);
              return (
                <button
                  className="flex flex-row items-center"
                  onClick={() => onDetail(row?.original?.id)}
                >
                  <img
                    className="h-20 w-20 shadow bg-poster bg-center mr-3"
                    src={
                      mediaContents?.[0]?.urlTiny ||
                      row?.original?.backgroundPost?.url ||
                      row?.original?.sourcePost?.backgroundPost?.url ||
                      Images.image_default.default
                    }
                    alt="post-Images"
                  />
                  <span className="limit-rows break-all">{content}</span>
                </button>
              );
            },
          },
          {
            Header: <Header name={t('post.owner')} />,
            accessor: 'creator.name.keyword',
            Cell: ({ row }: any) => {
              const avatar = pathOr(
                '',
                [
                  'original',
                  'creator',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'url',
                ],
                row
              );
              const owner: any = pathOr('-', ['original', 'creator'], row);
              const email: any = pathOr(
                '-',
                ['original', 'creator', 'email', 'email'],
                row
              );
              const id = pathOr('', ['original', 'creator', 'id'], row);
              return (
                <button
                  className="flex flex-row w-full items-center"
                  onClick={(e: any) => onMoveUserDetail(id)}
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
                    <span className="text-xl font-medium text-default pb-2 ">
                      {owner?.name || '-'}
                    </span>
                    <span className="text-xl text-gray-600 truncate">
                      {email}
                    </span>
                  </div>
                </button>
              );
            },
          },
          {
            Header: t('post.location'),
            sortable: false,
            width: 270,
            accessor: 'formatedAddress',
            Cell: ({ row }: any) => {
              const postType = row?.original?.postType;
              const address =
                postType && postType === INTERACTIVE.SHARED
                  ? pathOr(
                      '-',
                      ['original', 'sourcePost', 'location', 'formatedAddress'],
                      row
                    )
                  : pathOr(
                      '-',
                      ['original', 'location', 'formatedAddress'],
                      row
                    );
              return <span className="limit-rows">{address}</span>;
            },
          },
          {
            Header: t('post.createdAt'),
            accessor: 'createdAt',
            sortable: true,
            center: true,
            Cell: ({ row }: any) => {
              const createdAt = row?.original?.createdAt;
              return formatTime(createdAt);
            },
          },
          {
            Header: t('post.source'),
            width: 110,
            sortable: false,
            center: true,
            accessor: 'source',
            Cell: ({ row }: any) => {
              const postType = row?.original?.postType;
              return getTypeInteractive(postType);
            },
          },
          {
            Header: t('post.type'),
            sortable: false,
            center: true,
            accessor: 'type',
            Cell: ({ row }: any) => {
              const backgroundPost = row?.original?.backgroundPost;
              return getTypePost(!!backgroundPost);
            },
          },
          {
            Header: t('post.totalComment'),
            accessor: 'totalComment',
            sortable: false,
            width: 80,
            center: true,
            Cell: ({ row }: any) => {
              return row?.original?.totalComment;
            },
          },
          {
            Header: t('post.totalShare'),
            accessor: 'totalShare',
            sortable: false,
            center: true,
          },
          {
            Header: t('post.averagePoint'),
            accessor: 'averagePoint',
            sortable: false,
            center: true,
          },
          {
            Header: t('post.totalPlace'),
            accessor: 'totalBookmark',
            sortable: false,
            center: true,
          },
          {
            Header: t('post.totalReport'),
            accessor: 'totalReport',
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
              const data = row.original;
              return (
                <ButtonGroup
                  onEdit={onEdit(data?.id)}
                  isDelete={checkRoles(roles)}
                  onDelete={onDelete(data?.id)}
                  item={row}
                  roles={roles}
                  onBlock={onLockPost}
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
export default ListPostView;
