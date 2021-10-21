import React, { useEffect } from 'react';
import Table from 'app/components/Table';
import { pathOr } from 'ramda';
import { formatTime } from 'app/utils';
import { SORT } from 'app/constants';
import TourActions from 'app/store/redux/TourRedux';
import { t } from 'app/i18n';
import { compose } from 'recompose';
import ButtonGroup from 'app/components/Form/ButtonGroup';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { Alert } from 'reactstrap';
// import MediaCarousel from 'app/components/MediaCarousel';
import { IProps, IFilter } from './Page.type';

const PageNews = ({
  pages,
  fetching,
  getListNewsPage,
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

    getListNewsPage(customFilter);
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
    return <Alert color="warning">{t('APP.PAGE.NEWS.NO_DATA')}</Alert>;
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
            Header: t('app.table.content'),
            accessor: 'content',
          },
          {
            Header: t('app.table.type'),
            accessor: 'postType',
            Cell: ({ row }: any) => {
              const type = row?.origial?.postType;
              return type;
            },
            width: 100,
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
          {
            Header: t('app.table.ranking'),
            accessor: 'totalRanking',
          },
          // {
          //   Header: t('APP.TABLE.MEDIA'),
          //   accessor: 'media',
          //   Cell: ({ row }: any) => {
          //     const media = row?.original?.mediaContents;
          //     return <MediaCarousel data={media} />;
          //   },
          //   maxWidth: 250,
          // },
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
  list: state.tour.listPageNews,
  fetching: state.tour.fetchingTour,
  pages: state.tour.pages,
  filter: state.tour.filterNews,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListNewsPage: (filter: any) =>
    dispatch(TourActions.getListPageNewsRequest(filter)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(PageNews);
