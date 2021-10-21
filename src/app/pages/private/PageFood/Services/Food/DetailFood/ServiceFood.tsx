import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatMoney } from 'app/utils';
import { SORT, ROUTERS } from 'app/constants';
import FoodActions from 'app/store/redux/FoodRedux';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { IProps, IFilter } from './DetailFoodPage.type';

const FoodServicesPage = ({
  pages,
  fetching,
  getListServicesFood,
  listServiceFood,
  filter,
  id,
  currencies,
  history,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListServicesFood = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      pageId: id,
    };

    getListServicesFood(customFilter);
  };

  useEffect(() => {
    onGetListServicesFood(filter);
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListServicesFood({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListServicesFood({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (serviceId: string) => () => {
    history.push(ROUTERS.SERVICE_FOOD_DETAIL.replace(':id', serviceId));
  };

  if (listServiceFood?.length === 0)
    return <Alert color="warning">{t('APP.PAGE.SERVICES.NO_DATA')}</Alert>;

  return (
    <div>
      <Table
        data={listServiceFood}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListServicesFood({
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
            Cell: ({ row }: any) => {
              const data = row.original;
              return data.type;
            },
          },
          {
            Header: t('APP.TABLE.TOTAL_LIKE'),
            accessor: 'like',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalLike'], row),
          },
          {
            Header: t('APP.TABLE.TOTAL_COMMENT'),
            accessor: 'comment',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalComment'], row),
          },
          {
            Header: t('APP.TABLE.TOTAL_RANKING'),
            accessor: 'ranking',
            Cell: ({ row }: any) =>
              pathOr('', ['original', 'post', 'totalRanking'], row),
          },
          {
            Header: t('APP.TABLE.BOOKMARK'),
            accessor: 'bookmark',
            Cell: ({ row }: any) =>
              pathOr('0', ['original', 'post', 'totalBookmark'], row),
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            maxWidth: 100,
            Cell: ({ row }: any) => {
              const data = row.original;
              return <ButtonGroup onDetail={() => onDetail(data.id)} />;
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
  currencies: state.app.currencies,
  listServiceFood: state.food.listFood,
  fetching: state.food.fetchingFood,
  pages: state.food.pages,
  filter: state.food.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListServicesFood: (filter: any) =>
    dispatch(FoodActions.getListFoodRequest(filter)),
});

const enhancer = compose<any, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(FoodServicesPage);
