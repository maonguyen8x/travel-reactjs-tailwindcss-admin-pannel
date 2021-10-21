/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatTime } from 'app/utils';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { SORT } from 'app/constants';
import TourActions from 'app/store/redux/TourRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';
import { IProps, IFilter } from './Page.type';

const PageNews = ({
  pages,
  fetching,
  getListPageReviews,
  list,
  filter,
  id,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListServices = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      pageId: id,
    };

    getListPageReviews(customFilter);
  };

  useEffect(() => {
    onGetListServices(filter);
  }, []);

  const onPageChange = (pageIndex: number) => {
    onGetListServices({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListServices({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  if (list?.length === 0)
    return <Alert color="warning">{t('APP.PAGE.REVIEWS.NO_DATA')}</Alert>;
  return (
    <div>
      <Table
        isShowSearch={false}
        data={list}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          if (column?.id) {
            onGetListServices({
              order: [`${column?.id} ${desc ? SORT.DESC : SORT.ASC}`],
            });
          }
        }}
        columns={[
          {
            Header: t('APP.TABLE.OWNER'),
            accessor: 'pageId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'page', 'user', 'name'], row),
          },
          {
            Header: t('APP.TABLE.TOTAL_RANKING'),
            accessor: 'postId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'averagePoint'], row),
          },
          {
            Header: t('app.table.content'),
            accessor: 'postId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'content'], row),
          },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row.original;
              return formatTime(data.createdAt);
            },
            maxWidth: 150,
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

const mapStateToProps = (state: IReduxStates) => ({
  list: state.tour.listPageReviews,
  fetching: state.tour.fetchingTour,
  pages: state.tour.pages,
  filter: state.tour.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListPageReviews: (filter: any) =>
    dispatch(TourActions.getListPageReviewsRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(PageNews);
