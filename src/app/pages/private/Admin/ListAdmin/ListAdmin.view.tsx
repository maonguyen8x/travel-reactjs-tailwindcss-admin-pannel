import React, { useState } from 'react';
import { t } from 'app/i18n';
import Table from 'app/components/Table';
import { formatTime } from 'app/utils';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Modal from 'app/components/Modal';
import { LIST } from '../Admin.data';
import AdminDecentralization from '../AdminDecentralization';

const ListAdmin = () => {
  const [isShowDecen, setShowDecen] = useState(false);

  const onToggleDecen = () => setShowDecen(!isShowDecen);

  return (
    <>
      <Modal
        header={t('admin.detail.power')}
        isShowModal={isShowDecen}
        toggle={onToggleDecen}
        body={<AdminDecentralization />}
      />
      <Table
        data={LIST}
        isShowSearch={false}
        columns={[
          {
            Header: 'ID',
            accessor: 'id',
            width: 60,
            sortable: true,
            Cell: ({ row }: any) => {
              return (
                <div className="flex items-center justify-center">
                  <span>{row?.original?.id}</span>
                </div>
              );
            },
          },
          {
            Header: t('admin.list'),
            accessor: 'name',
          },
          {
            Header: t('admin.count'),
            accessor: 'count',
            maxWidth: 100,
            center: true,
          },
          {
            Header: t('admin.createdAt'),
            accessor: 'createdAt',
            maxWidth: 150,
            center: true,
            Cell: ({ row }: any) => formatTime(row?.original?.createdAt),
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            sortable: false,
            Cell: () => {
              return (
                <ButtonGroup
                  onDetail={onToggleDecen}
                  onEdit={() => ({})}
                  onDelete={() => ({})}
                />
              );
            },
            maxWidth: 250,
          },
        ]}
        pageSize={10}
      />
    </>
  );
};

export default ListAdmin;
