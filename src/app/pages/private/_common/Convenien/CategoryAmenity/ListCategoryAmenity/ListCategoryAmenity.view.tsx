/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
import { SORT } from 'app/constants';
import { formatTime } from 'app/utils';
import { IProps, IFilter } from './ListCategoryAmenity.type';

const BookingTourList = ({
  pages,
  fetching,
  filter,
  getListCategoryAmenity,
  listCategoryAmenity,
  ON_DETAIL,
  ON_EDIT,
  ON_DELETE,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListCategoryAmenity = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListCategoryAmenity(customFilter);
  };

  useEffect(() => {
    onGetListCategoryAmenity(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListCategoryAmenity({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListCategoryAmenity({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  return (
    <Table
      onSearch={onGetListCategoryAmenity}
      data={listCategoryAmenity}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onSortedChange={(column: any, desc = true) => {
        if (column?.id) {
          onGetListCategoryAmenity({
            order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
          });
        }
      }}
      columns={[
        {
          Header: t('APP.AMENITY_CATEGORY.ENGLISH'),
          accessor: 'nameEn',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[0];
          },
        },
        {
          Header: t('APP.AMENITY_CATEGORY.VIETNAM'),
          accessor: 'nameVi',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[1];
          },
        },
        {
          Header: t('APP.TABLE.AMENITY_CATEGORY_KEYWORD'),
          accessor: 'keyword',
        },
        {
          Header: t('app.table.createdat'),
          accessor: 'createdAt',
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
          maxWidth: 150,
          Cell: ({ row }: any) => {
            const data = row?.original;
            return (
              <ButtonGroup
                onDetail={() => ON_DETAIL(data.id)}
                onDelete={() => ON_DELETE(data.id)}
                onEdit={() => ON_EDIT(data.id)}
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
  );
};

export default BookingTourList;
