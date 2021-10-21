/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { t } from 'app/i18n';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import Table from 'app/components/Table';
import Search from 'app/components/Form/SearchInput';
import { SORT } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { IProps, IFilter } from './ListCategoryFacility.type';

const CategoryFacilityList = ({
  pages,
  fetching,
  filter,
  history,
  getListCategoryFacility,
  listCategoryFacility,
  deleteCategoryFacility,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListCategoryFacility = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListCategoryFacility(customFilter);
  };

  useEffect(() => {
    onGetListCategoryFacility(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListCategoryFacility({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListCategoryFacility({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDelete = (id: number) => () => {
    SweetAlert.confirm(t('APP.TABLE.DELETE'), t('APP.TABLE.ANWSER'), () =>
      deleteCategoryFacility(id)
    );
  };

  return (
    <Table
      onSearch={onGetListCategoryFacility}
      data={listCategoryFacility}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onSortedChange={(column: any, desc = true) => {
        onGetListCategoryFacility({
          order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
        });
      }}
      columns={[
        {
          Header: t('APP.FACILITY_CATEGORY.ENGLISH'),
          accessor: 'name',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[0];
          },
        },
        {
          Header: t('APP.FACILITY_CATEGORY.VIETNAM'),
          accessor: 'name',
          Cell: ({ row }: any) => {
            const name = row.original;
            const nameItem = name.name;
            const nameVi = Object.values(nameItem);
            return nameVi[1];
          },
        },
        {
          Header: t('APP.TABLE.FACILITY_CATEGORY_KEYWORD'),
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
  );
};

export default CategoryFacilityList;
