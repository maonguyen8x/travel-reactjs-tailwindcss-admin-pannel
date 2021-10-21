/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
import { SORT } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { IProps, IFilter } from './ListFacility.type';

const BookingTourList = ({
  pages,
  filter,
  getListFacility,
  listFacility,
  deleteFacility,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListFacility = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListFacility(customFilter);
  };

  useEffect(() => {
    onGetListFacility(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListFacility({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListFacility({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDelete = (id: number) => () => {
    SweetAlert.confirm(t('APP.TABLE.DELETE'), t('APP.TABLE.ANWSER'), () =>
      deleteFacility(id)
    );
  };

  return (
    <div>
      <Table
        data={listFacility}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListFacility({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('APP.FACILITY.ENGLISH'),
            accessor: 'name',
            Cell: ({ row }: any) => {
              const name = row.original;
              const nameItem = name.name;
              const nameVi = Object.values(nameItem);
              return nameVi[0];
            },
          },
          {
            Header: t('APP.FACILITY.VIETNAM'),
            accessor: 'name',
            Cell: ({ row }: any) => {
              const name = row.original;
              const nameItem = name.name;
              const nameVi = Object.values(nameItem);
              return nameVi[1];
            },
          },
          {
            Header: t('APP.TABLE.FACILITY_KEYWORD'),
            accessor: 'keyword',
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            sortable: false,
            maxWidth: 150,
            Cell: ({ row }: any) => {
              const data = row?.original;
              return <ButtonGroup onDelete={onDelete(data.id)} />;
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

export default BookingTourList;
