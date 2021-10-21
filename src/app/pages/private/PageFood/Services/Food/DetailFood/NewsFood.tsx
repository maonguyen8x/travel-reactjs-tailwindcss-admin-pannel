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
// import MediaCarousel from 'app/components/MediaCarousel';
import { withRouter } from 'react-router-dom';
import { IProps, IFilter } from './DetailFoodPage.type';

const FoodNews = ({
  pages,
  fetching,
  getListNewsFood,
  listNewsFood,
  filter,
  id,
  history,
}: IProps) => {
  const { limit, offset } = filter;

  const onGetListNewsFood = (newFilter: IFilter) => {
    const customFilter = {
      ...filter,
      ...newFilter,
      pageId: id,
    };

    getListNewsFood(customFilter);
  };

  useEffect(() => {
    onGetListNewsFood(filter);
  }, [id]);

  const onPageChange = (pageIndex: number) => {
    onGetListNewsFood({
      offset: pageIndex,
    });
  };

  const onPageSizeChange = (pageSize: number, pageIndex: number) => {
    onGetListNewsFood({
      limit: pageSize,
      offset: pageIndex,
    });
  };

  const onDetail = (postId: string) => () => {
    history.push(ROUTERS.POST_DETAIL.replace(':id', postId));
  };

  if (listNewsFood?.length === 0)
    return <Alert color="warning">{t('APP.PAGE.NEWS.NO_DATA')}</Alert>;

  return (
    <div>
      <Table
        data={listNewsFood}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={(column: any, desc = true) => {
          onGetListNewsFood({
            order: desc
              ? `${column?.id} ${SORT.DESC}`
              : `${column?.id} ${SORT.ASC}`,
          });
        }}
        columns={[
          {
            Header: t('app.table.content'),
            accessor: 'content',
          },
          {
            Header: t('app.table.like'),
            accessor: 'totalLike',
          },
          {
            Header: t('app.table.comment'),
            accessor: 'totalComment',
          },
          {
            Header: t('app.table.share'),
            accessor: 'totalShare',
          },
          // {
          //   Header: t('APP.TABLE.MEDIA'),
          //   accessor: 'media',
          //   Cell: ({ row }: any) => {
          //     const media = row?.original?.mediaContents;
          //     return <MediaCarousel data={media} />;
          //   },
          //   maxWidth: 300,
          // },
          {
            Header: t('app.table.createdat'),
            accessor: 'createdAt',
            Cell: ({ row }: any) => {
              const data = row.original;
              return formatTime(data.createdAt);
            },
          },
          {
            Header: (
              <div className="flex w-full items-center justify-center">
                {t('user.action')}
              </div>
            ),
            accessor: 'action',
            width: 70,
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
  listNewsFood: state.page.listFoodPageNews,
  fetching: state.page.fetchingListFoodPage,
  pages: state.page.pages,
  filter: state.page.filterNews,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListNewsFood: (filter: any) =>
    dispatch(PageActions.getListPageFoodNewsRequest(filter)),
});

const enhancer = compose<any, any>(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(FoodNews);
