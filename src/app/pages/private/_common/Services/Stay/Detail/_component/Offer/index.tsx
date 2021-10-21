/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatMoney, formatTime } from 'app/utils';
import { SORT } from 'app/constants/index';
import PageActions from 'app/store/redux/PageRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
// import MediaCarousel from 'app/components/MediaCarousel';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const Offer = ({
  pages,
  fetching,
  getListServicesStay,
  listStay,
  filter,
  id,
}: any) => {
  const { limit, offset } = filter;

  const onGetListServicesStay = (newFilter: any) => {
    const customFilter = {
      ...filter,
      ...newFilter,
    };

    getListServicesStay(id, customFilter);
  };

  useEffect(() => {
    onGetListServicesStay(filter);
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListServicesStay({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListServicesStay({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  if (listStay?.length === 0)
    return <Alert color="warning">{t('APP.PAGE.SERVICES.NO_DATA')}</Alert>;

  return (
    <div>
      <Table
        onSearch={onGetListServicesStay}
        data={listStay}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListServicesStay({
            order: desc
              ? `${column?.id} ${SORT.DESC}`
              : `${column?.id} ${SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.name'),
            accessor: 'name',
          },
          {
            Header: t('APP.TABLE.LOCATION'),
            accessor: 'location',
            Cell: ({ row }: any) =>
              pathOr(
                '0',
                ['original', 'page', 'location', 'formatedAddress'],
                row
              ),
          },
          {
            Header: t('APP.TABLE.ROOM'),
            accessor: 'room',
            Cell: ({ row }: any) =>
              pathOr(
                '',
                ['original', 'page', 'stayPropertytype', 'name', 'en'],
                row
              ),
          },
          {
            Header: t('app.table.ranking'),
            accessor: 'rangking',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'totalRanking'], row),
          },
          {
            Header: t('app.table.price'),
            accessor: 'price',
            Cell: ({ row }: any) => {
              const data = row?.original;
              return formatMoney(data?.currency?.code, data?.price);
            },
          },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row.original;
              return formatTime(data.createdAt);
            },
          },
          // {
          //   Header: t('APP.TABLE.MEDIA'),
          //   accessor: 'media',
          //   Cell: ({ row }: any) => {
          //     const { mediaContents } = row?.original;
          //     return <MediaCarousel data={mediaContents} />;
          //   },
          // },
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
  listStay: state.page.services,
  fetching: state.page.fetchingFood,
  pages: state.page.pages,
  filter: state.page.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  // getListServicesStay: (id: number, filter: any) =>
  //   dispatch(PageActions.getPageServiceByIdRequest(id, filter)),
});

const enhancer = compose<any, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(Offer);
