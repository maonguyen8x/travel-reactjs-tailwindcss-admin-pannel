import PopoverItem from 'app/components/Popover';
import Table from 'app/components/Table';
import { t } from 'app/i18n';
import { useEffect } from 'react';
import React from 'react';
import { SORT } from 'app/constants';
import { getFieldDuplicateLocation } from 'app/utils';
import { IProps, IFilter } from './DupLocation.type';

const DuplicateLocation = ({
  pages,
  listLocationDuplicated,
  getListLocationDuplicated,
  filter,
  fetching,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListLocationDuplicated = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListLocationDuplicated(customFilter);
  };

  useEffect(() => {
    onGetListLocationDuplicated(filter);
  }, []);

  const onPageChange = (pageIndex?: number) => {
    onGetListLocationDuplicated({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListLocationDuplicated({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const LocationDuplicateItem = ({ data }: any) => {
    return (
      <>
        {data?.map((items: any, index: number) => (
          <div className="flex flex-col text-xl px-3 py-2" key={index}>
            <input className="absolute right-2" type="checkbox" />
            <span className="font-medium">{items?.name}</span>
            <span>
              <span className="name">{items?.creator?.name}</span>
              {items?.creator?.profiles?.phone?.phone && (
                <span>{` | ${items?.creator?.profiles?.phone?.phone}`}</span>
              )}
              {items?.creator?.email?.email && (
                <span>{` | ${items?.creator?.email?.email}`}</span>
              )}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <Table
        name="duplicateLocation"
        keySearchDefault={filter?.search}
        onSearch={onGetListLocationDuplicated}
        placeholder={t('location.search_info')}
        filter={filter}
        data={listLocationDuplicated?.data}
        total={listLocationDuplicated?.count}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListLocationDuplicated({
            order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
          });
        }}
        columns={[
          {
            Header: t('location.address'),
            accessor: 'address',
            sortable: false,
            width: 500,
            Cell: ({ row }: any) => {
              return row?.original?.address;
            },
          },
          {
            Header: t('location.total_duplicate'),
            accessor: 'duplicateNumber',
            sortable: false,
            center: true,
            Cell: ({ row }: any) => {
              return (
                <PopoverItem
                  placement="bottom"
                  name={row?.original?.duplicateNumber || 0}
                  popoverKey={`${row?.original?.index}`}
                  body={
                    <LocationDuplicateItem data={row?.original?.location} />
                  }
                />
              );
            },
          },
          {
            Header: t('location.type'),
            accessor: 'locationType',
            sortable: false,
            center: true,
            Cell: ({ row }: any) => (
              <span className="text-1xl lowercase text-blue-500 truncate">
                {row?.original?.locationType}
              </span>
            ),
          },
          {
            Header: t('location.verified'),
            accessor: 'verified',
            sortable: false,
            center: true,
            Cell: ({ row }: any) => {
              return row?.original?.verified ? (
                <i className="fas fa-check text-green-500" />
              ) : (
                ''
              );
            },
          },
          {
            Header: t('location.note'),
            accessor: 'note',
            sortable: false,
            center: true,
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

export default DuplicateLocation;
