/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import { SORT, ROUTERS, NOTIFICATION_TYPES } from 'app/constants';
import Table from 'app/components/Table';
import { formatTime } from 'app/utils';
import Image from 'app/assets/images';
import SweetAlert from 'app/components/SweetAlert';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { IProps, IFilter } from './ListNotification.type';
import {
  UsernameStyled,
  AvatarStyled,
  UserAvatar,
  TextOwnerDetail,
} from './ListNotification.styled';

const ListNotification = ({
  pages,
  fetching,
  getListNotification,
  list,
  history,
  filter,
  deleteNotification,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListNotification = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    getListNotification(customFilter);
  };

  useEffect(() => {
    onGetListNotification(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListNotification({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListNotification({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (type: string, id: string) => () => {
    if (type === NOTIFICATION_TYPES.SYSTEM_NEW_FEEDBACK) {
      history.push(ROUTERS.FEEDBACK_DETAIL.replace(':id', id));
      return;
    }
    if (type === NOTIFICATION_TYPES.SYSTEM_NEW_REPORT) {
      history.push(ROUTERS.REPORT_DETAIL.replace(':id', id));
      return;
    }
    history.push(ROUTERS.DETAIL_REQUEST_CHANGE_LOCATION.replace(':id', id));
  };

  const onOwnerDetail = (id: string) => () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', id));
  };

  const onDelete = (id: string) => () => {
    SweetAlert.confirm(
      'Do you want delete this notification',
      'Yes, delete it!',
      () => deleteNotification(id)
    );
  };

  return (
    <div>
      <Table
        data={list}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListNotification({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('APP.TABLE.OWNER'),
            accessor: 'eventCreator',
            Cell: ({ row }: any) => {
              const owner = pathOr(
                '',
                ['original', 'eventCreator', 'name'],
                row
              );
              const avatar = pathOr(
                '',
                [
                  'original',
                  'eventCreator',
                  'profiles',
                  'avatars',
                  'mediaContent',
                  'urlTiny',
                ],
                row
              );
              return (
                <UserAvatar>
                  <AvatarStyled
                    src={avatar && avatar !== 0 ? avatar : Image.image_default}
                    alt="avatar"
                  />
                  <UsernameStyled>{owner}</UsernameStyled>
                </UserAvatar>
              );
            },
            maxWidth: 200,
          },
          {
            Header: t('app.table.content'),
            accessor: 'notificationType',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return (
                <div>
                  {''}
                  &nbsp;
                  {t('TRANSLATOR.FROM')}
                  &nbsp;
                  <TextOwnerDetail
                    onClick={onOwnerDetail(data?.eventCreator?.id)}
                  >
                    {data?.eventCreator?.name}
                  </TextOwnerDetail>
                </div>
              );
            },
          },
          {
            Header: t('app.table.type'),
            accessor: 'notificationType',
            Cell: ({ row }: any) => {
              const notifications = row?.original?.notificationType;
              return '';
            },
            maxWidth: 150,
          },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return formatTime(data.createdAt);
            },
            maxWidth: 150,
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            maxWidth: 150,
            Cell: ({ row }: any) => {
              const data = row?.original;
              const id =
                data?.feedbackId || data?.locationRequestId || data?.reportId;
              return (
                <ButtonGroup
                  onDetail={() => onDetail(data?.notificationType, id)}
                  onDelete={onDelete(data.id)}
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

export default ListNotification;
