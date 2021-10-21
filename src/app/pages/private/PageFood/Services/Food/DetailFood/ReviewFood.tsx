import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { formatTime } from 'app/utils';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { SORT, ROUTERS } from 'app/constants';
import PageActions from 'app/store/redux/PageRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { pathOr } from 'ramda';
import { Alert } from 'reactstrap';
import { IProps, IFilter } from './DetailFoodPage.type';

const FoodReview = ({
  pages,
  fetching,
  getListReviewFood,
  listReviewFood,
  filter,
  id,
  history,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListReviewFood = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      pageId: id,
    };

    getListReviewFood(customFilter);
  };

  useEffect(() => {
    onGetListReviewFood(filter);
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListReviewFood({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListReviewFood({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (postId: string) => () => {
    history.push(ROUTERS.POST_DETAIL.replace(':id', postId));
  };

  if (listReviewFood?.length === 0)
    return <Alert color="warning">{t('APP.PAGE.REVIEWS.NO_DATA')}</Alert>;

  return (
    <div>
      <Table
        data={listReviewFood}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListReviewFood({
            order: desc
              ? `${column?.id} ${SORT.DESC}`
              : `${column?.id} ${SORT.ASC}`,
          });
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
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            maxWidth: 200,
            Cell: () => <ButtonGroup onDetail={onDetail} />,
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
  listReviewFood: state.page.listPageReview,
  fetching: state.page.fetchingListPageReview,
  pages: state.page.pages,
  filter: state.page.filter,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListReviewFood: (filter: any) =>
    dispatch(PageActions.getListPageReviewRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(FoodReview);
