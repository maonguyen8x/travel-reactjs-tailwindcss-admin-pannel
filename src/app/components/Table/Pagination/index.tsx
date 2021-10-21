import { useState, useEffect, memo } from 'react';
import { t } from 'app/i18n';

const filterPages = (visiblePages2: any, totalPages: any) => {
  return visiblePages2.filter((page: any) => page <= totalPages);
};

const getVisiblePages = (page: any, total: any) => {
  if (total < 7) {
    return filterPages([1, 2, 3, 4, 5, 6], total);
  }
  if (page % 3 >= 0 && page > 2 && page + 2 < total) {
    return [1, page - 1, page, page + 1, total];
  }
  if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
    return [1, total - 3, total - 2, total - 1, total];
  }
  return [1, 2, 3, total - 1, total];
};

const Pagination = ({
  page,
  pages,
  limit,
  offset,
  total,
  onPageSizeChange,
  pageSizeOptions,
  onPageChange,
}: any) => {
  const [state, setState] = useState({
    visiblePages: getVisiblePages(null, pages),
  });
  const { visiblePages } = state;
  const activePage = page + 1;
  const pageSize = offset * limit + limit;
  const start = offset * limit + 1;
  const end = pageSize > total ? total : pageSize;

  const changePage = (newPage: any) => {
    if (newPage > pages || newPage < 1) {
      return;
    }

    const visiblePages = getVisiblePages(newPage, pages);

    setState({
      visiblePages: filterPages(visiblePages, pages),
    });

    onPageChange(newPage - 1);
  };

  useEffect(() => {
    setState({
      visiblePages: getVisiblePages(null, pages),
    });
  }, [pages]);

  if (total < 9) return null;

  return (
    <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-xl text-gray-700">
            Showing
            <span className="font-medium px-2">{start}</span>
            to
            <span className="font-medium px-2">{end}</span>
            of
            <span className="font-medium px-2">{total}</span>
            results
          </p>
        </div>

        <div className="flex flex-row">
          <div className="mr-10">
            <select
              id="col-showing"
              name="col-showing"
              onChange={(e) => onPageSizeChange(Number(e.target.value), page)}
              value={limit}
              className="block w-full p-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {pageSizeOptions.map((option: any, i: any) => (
                <option key={i} value={option}>
                  {option} {t('table.row')}
                </option>
              ))}
            </select>
          </div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => {
                changePage(activePage - 1);
              }}
              disabled={activePage === 1}
              className="relative inline-flex items-center px-3 py-3 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {visiblePages.map((iPage: any, index: any, array: any) => {
              return (
                <button
                  key={iPage}
                  className={`z-10 relative inline-flex items-center px-4 py-3 border text-sm font-medium ${
                    activePage === iPage
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                  onClick={() => changePage(iPage)}
                >
                  {array[index - 1] + 2 < iPage ? `...${iPage}` : iPage}
                </button>
              );
            })}
            <button
              onClick={() => {
                changePage(activePage + 1);
              }}
              disabled={activePage === pages}
              className="relative inline-flex items-center px-3 py-3 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination);
