import React, { useEffect } from 'react';
import { pathOr } from 'ramda';
import Table from 'app/components/Table';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import Header from 'app/components/View/HeaderTable';
import { getFieldForum } from 'app/utils';
import { AvatarStyled, UsernameStyled } from 'app/components/layout/styled';
import Images from 'app/assets/images';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { BoxICon, BoxIconSos, BoxImage } from './Forum.styled';
import { DATA } from './Forum.constant';

const ListSosView = ({ fetching = false, history }: any) => {
  const onGetListSos = (newFilter: any) => {};

  useEffect(() => {
    //
  }, []);

  const onPageChange = (pageIndex: number) => {
    //
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    //
  };

  const onDetail = (id: string) => {
    history.push(ROUTERS.SOS_DETAIL.replace(':id', id));
  };

  return (
    <div>
      <Table
        keySearchDefault={''}
        onSearch={onGetListSos}
        onDetail={onDetail}
        placeholder={t('sos.placeholder')}
        total={DATA?.length}
        data={DATA}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any) => ({})}
        columns={[
          {
            Header: t('sos.users'),
            accessor: 'users',
            Cell: ({ row }: any) => {
              const avatar = row?.original?.avatar;
              const owner = row?.original?.users;
              return (
                <BoxImage>
                  <AvatarStyled src={avatar} alt={''} />
                  <UsernameStyled>{owner}</UsernameStyled>
                </BoxImage>
              );
            },
          },
          {
            Header: t('sos.phone'),
            accessor: 'phone',
          },
          {
            Header: t('sos.join'),
            accessor: 'join',
          },
          {
            Header: t('sos.status'),
            sortable: false,
            accessor: 'status',
            Cell: ({ row }: any) => {
              return (
                <BoxICon>
                  <BoxIconSos src={Images.sos.default} alt="sos" />
                </BoxICon>
              );
            },
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
              return <ButtonGroup onDelete={() => ({})} />;
            },
          },
        ]}
        pageSize={10}
      />
    </div>
  );
};
export default ListSosView;
