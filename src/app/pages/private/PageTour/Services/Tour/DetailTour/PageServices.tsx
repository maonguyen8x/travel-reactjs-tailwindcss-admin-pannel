import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatMoney } from 'app/utils';
import { SORT } from 'app/constants';
import TourActions from 'app/store/redux/TourRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';
import { IProps, IFilter } from './Page.type';

const PageServices = ({
  pages,
  fetching,
  getListServicesPage,
  list,
  filter,
  id,
  currencies,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListServices = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      pageId: id,
    };

    getListServicesPage(customFilter);
  };

  useEffect(() => {
    onGetListServices(filter);
  }, [id]);

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
    return <Alert color="warning">{t('APP.PAGE.SERVICES.NO_DATA')}</Alert>;
  return (
    <div>
      <Table
        isShowSearch={false}
        data={list}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListServices({
            order: `${column?.id} ${desc ? SORT.DESC : SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.name'),
            accessor: 'name',
          },
          {
            Header: t('app.table.price'),
            accessor: 'price',
            Cell: ({ row }: any) => {
              const data = row?.original;
              const codeCurrency =
                currencies[data.currencyId - 1]?.code || 'VND';
              return formatMoney(codeCurrency, data?.price);
            },
          },
          {
            Header: t('app.table.type'),
            accessor: 'type',
          },
          {
            Header: t('app.table.like'),
            accessor: 'postId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'totalLike'], row),
          },
          {
            Header: t('app.table.comment'),
            accessor: 'postId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'totalComment'], row),
          },
          {
            Header: t('app.table.ranking'),
            accessor: 'postId',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'totalRanking'], row),
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
  currencies: state.app.currencies,
  list: state.tour.listServices,
  fetching: state.tour.fetching,
  pages: state.tour.pages,
  filter: state.tour.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListServicesPage: (filter: any) =>
    dispatch(TourActions.getListServicesRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(PageServices);
