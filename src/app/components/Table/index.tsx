import React from 'react';
import { useTable } from 'react-table';
import { t } from 'app/i18n';
import { SORT } from 'app/constants';
import { RootStateOrAny, useSelector } from 'react-redux';
import Pagination from './Pagination';
import Search from '../Form/SearchInput';
import { IProps } from './type';

const checkStatus = (columns: any, newSelected: any) =>
  columns.map((item: any) => ({
    ...item,
    show: newSelected?.find((field: any) => field.id === item.accessor)?.show,
  }));

const Table = (props: IProps) => {
  const {
    name = '',
    page = 0,
    pageSize,
    data = [],
    onSearch,
    isShowSearch = true,
    columns,
    total = 0,
    placeholder = t('search'),
    keySearchDefault,
    filter,
    offset,
    limit,
    pages,
    onPageChange,
    onPageSizeChange,
    onSortedChange,
    onDetail,
  } = props;

  const dataCustomField: any = useSelector(
    (state: RootStateOrAny) => state?.table?.fieldsOfTable[name]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: checkStatus(columns, dataCustomField)
        .filter((col: any) => col.show === false)
        .map((col: any) => col.accessor),
    },
  });

  return (
    <>
      {isShowSearch && (
        <Search
          onSearch={onSearch}
          keySearchDefault={keySearchDefault}
          placeholder={placeholder}
          allColumns={allColumns}
          name={name}
          filterMine={filter?.mine}
        />
      )}

      <div className="flex flex-col w-full">
        <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-tab-active">
                {headerGroups.map((headerGroup: any) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => {
                      const sortColumn = filter?.order?.[0]?.split(' ')?.[0];
                      const sortStatus = filter?.order?.[0]?.split(' ')?.[1];

                      return (
                        <th
                          className={`px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ${
                            sortColumn === column.id && 'bg-default'
                          }`}
                          style={{
                            ...(column?.width && {
                              maxWidth: column.width,
                            }),
                          }}
                          {...column.getHeaderProps()}
                        >
                          <div
                            className={'cursor-pointer w-full '}
                            onClick={() => {
                              if (column.sortable)
                                onSortedChange(
                                  column,
                                  sortStatus &&
                                    sortColumn === column.id &&
                                    sortStatus !== SORT.DESC
                                );
                            }}
                          >
                            <span
                              className={`flex flex-row text-xl text-white w-full ${
                                column.center &&
                                'items-center justify-center text-center'
                              }`}
                            >
                              {column.render('Header')}
                              {column.sortable && (
                                <span className="ml-3 flex items-center pr-2 pointer-events-none">
                                  {sortStatus && sortColumn === column.id ? (
                                    sortStatus === SORT.DESC ? (
                                      <i
                                        className="fa fa-angle-down text-white text-base"
                                        aria-hidden="true"
                                      >
                                      </i>
                                    ) : (
                                      <i
                                        className="fa fa-angle-up text-white text-base "
                                        aria-hidden="true"
                                      >
                                      </i>
                                    )
                                  ) : (
                                    <svg
                                      className="h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </span>
                              )}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody
                className="divide-y divide-gray-200"
                {...getTableBodyProps()}
              >
                {rows.map((row: any, i: number) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={`transition-all duration-150 ease-in-out hover:bg-gray-200 relative ${
                        onDetail && 'cursor-pointer '
                      }`}
                      onClick={() => {
                        if (onDetail) onDetail(row.original.id);
                      }}
                    >
                      {row.cells.map((cell: any) => {
                        return (
                          <td
                            className={`px-6 py-4 whitespace-no-wrap text-xl text-gray-700 z-30 ${
                              cell?.column?.center && 'text-center'
                            }`}
                            style={{
                              ...(cell?.column?.width && {
                                maxWidth: cell.column.width,
                              }),
                            }}
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              total={total}
              offset={offset}
              limit={limit}
              pages={pages}
              page={page}
              pageSize={pageSize}
              defaultPageSize={10}
              pageSizeOptions={[5, 10, 20, 25, 50, 100, 150, 200, 300]}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
