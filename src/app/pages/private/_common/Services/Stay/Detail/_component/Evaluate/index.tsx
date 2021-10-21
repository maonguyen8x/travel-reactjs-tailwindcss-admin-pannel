/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatTime } from 'app/utils';
import { SORT } from 'app/constants/index';
import StayActions from 'app/store/redux/StayRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';

const Evaluate = ({
  pages,
  fetching,
  getListReviewBooking,
  listReviews,
  filter,
  id,
}: any) => {
  const { limit, offset } = filter;

  const onGetListReviewBooking = (newFilter: any) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListReviewBooking(id, customFilter);
  };

  useEffect(() => {
    onGetListReviewBooking(filter);
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListReviewBooking({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListReviewBooking({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  if (listReviews?.count === 0)
    return <Alert color="warning">{t('APP.PAGE.SERVICES.NO_DATA')}</Alert>;

  return (
    <div>
      <Table
        onSearch={onGetListReviewBooking}
        data={listReviews}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListReviewBooking({
            order: desc
              ? `${column?.id} ${SORT.DESC}`
              : `${column?.id} ${SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.name'),
            accessor: 'name',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'createdBy', 'name'], row),
          },
          {
            Header: t('app.table.content'),
            accessor: 'location',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'content'], row),
          },
          {
            Header: t('app.table.point'),
            accessor: 'point',
          },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row.original;
              return formatTime(data.createdAt);
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

const mapStateToProps = (state: IReduxStates) => ({
  listReviews: state.stay.listReview,
  fetching: state.stay.fetching,
  pages: state.stay.pages,
  filter: state.stay.filterReview,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListReviewBooking: (id: number, filter: any) =>
    dispatch(StayActions.listReviewBookingStayRequest(id, filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(Evaluate);
