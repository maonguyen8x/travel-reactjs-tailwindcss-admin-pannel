import { call, put, all, select, delay } from 'redux-saga/effects';
import PageActions, { PageSelectors } from 'app/store/redux/PageRedux';
import { pathOr } from 'ramda';
import { t } from 'app/i18n';
import { ROUTERS, SEARCH_TYPES, TRAVEL_TYPES } from '../../constants';
import { history } from '../../services/History';
import SweetAlert from '../../components/SweetAlert';

export function* getListFoodPage(api: any, { filter }: any) {
  try {
    const currentFilter = yield select(
      PageSelectors.getCurrentFilterGetListPageFood
    );

    const newFilter = filter || currentFilter;

    let pageFilterSearch = {
      offset: newFilter.offset * newFilter.limit,
      limit: newFilter.limit,
      order: newFilter.order,
      include: [
        { relation: 'user' },
        { relation: 'avatar' },
        { relation: 'location' },
      ],
      ...(newFilter.search && { q: newFilter.search }),
      where: {
        type: TRAVEL_TYPES.FOOD,
      },
    };

    if (newFilter.searchType === SEARCH_TYPES.MINE) {
      pageFilterSearch = {
        ...pageFilterSearch,
        ...{
          where: {
            userId: newFilter.mine,
            type: TRAVEL_TYPES.FOOD,
          },
        },
      };
    }

    const response = yield call(api.getListPage, { pageFilterSearch });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / newFilter.limit);

      yield put(PageActions.getListPageFoodSuccess(data, pages));
    } else {
      yield put(PageActions.getListPageFoodFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getListPageFoodFailure());
    SweetAlert.error(e.message);
  }
}

export function* getFoodPageById(api: any, action: any) {
  const { id } = action;
  try {
    const filter = {
      filter: {
        include: [
          { relation: 'user' },
          { relation: 'background' },
          { relation: 'avatar' },
          { relation: 'location' },
        ],
      },
    };

    const response = yield call(api.getPageById, id, filter);
    if (response.ok) {
      const { data } = response;
      yield put(PageActions.getPageFoodByIdSuccess(data));
    } else {
      yield put(PageActions.getPageFoodByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getPageFoodByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* getPageServiceById(
  api: any,
  action: any,
  { filter: { offset, limit, order } }: any
) {
  const { id } = action;
  try {
    const filter = {
      filter: {
        offset: offset * limit,
        limit,
        order: order,
        include: [
          {
            relation: 'post',
            scope: {
              include: [
                {
                  relation: 'creator',
                  scope: {
                    include: [
                      {
                        relation: 'profiles',
                        scope: {
                          include: [
                            {
                              relation: 'avatars',
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  relation: 'mediaContents',
                },
              ],
            },
          },
        ],
      },
    };

    const response = yield call(api.getPageServiceById, id, filter);

    if (response.ok) {
      const { data } = response?.data;
      const { count } = response?.data;

      const pages = Math.ceil(count / limit);

      yield put(PageActions.getPageServiceByIdSuccess(data, pages));
    } else {
      yield put(PageActions.getPageServiceByIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getPageServiceByIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListPageReview(
  api: any,
  { filter: { offset, limit, order, pageId } }: any
) {
  try {
    const filter: any = {
      filter: {
        offset: offset * limit,
        limit,
        order: order,
        include: [
          {
            relation: 'page',
            scope: {
              include: [{ relation: 'user' }],
            },
          },
          { relation: 'post' },
        ],
        where: {
          type: TRAVEL_TYPES.FOOD,
          pageId,
        },
      },
    };

    const [response, resCount]: any = yield all([
      call(api.getListPageReview, filter),
      call(api.pageReviewCount),
    ]);

    if (response.ok && resCount.ok) {
      const { data } = response;
      const { count } = resCount.data;
      const pages = Math.ceil(count / limit);

      yield put(PageActions.getListPageReviewSuccess(data, pages));
    } else {
      yield put(PageActions.getListPageReviewFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getListPageReviewFailure());
    SweetAlert.error(e.message);
  }
}

export function* getListFoodPageNews(
  api: any,
  { filterNews: { offset, limit, order, pageId } }: any
) {
  try {
    const filterPosts = {
      offset: offset * limit,
      limit,
      order: order,
      include: [{ relation: 'mediaContents' }],
      where: {
        postType: TRAVEL_TYPES.PAGE_NEW,
        pageId,
      },
    };

    const response = yield call(api.listPost, {
      filterPosts,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response.data;
      const pages = Math.ceil(count / limit);
      yield put(PageActions.getListPageFoodNewsSuccess(data, pages));
    } else {
      yield put(PageActions.getListPageFoodNewsFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getListPageFoodNewsFailure());
    SweetAlert.error(e.message);
  }
}

export function* createPage(api: any, action: any) {
  try {
    const { page } = action;
    const response = yield call(api.createPage, page);
    if (response.ok) {
      SweetAlert.toastSuccess(t('page.create.success'));
      history.goBack();
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}

export function* getListVerifyPage(
  api: any,
  { filter: { offset, limit, order, searchType, fromDate, toDate } }: any
) {
  try {
    let filterPageVerification = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.TIME) {
      filterPageVerification = {
        ...filterPageVerification,
        ...{
          where: {
            and: [
              { createdAt: { gt: fromDate } },
              { createdAt: { lt: toDate } },
            ],
          },
        },
      };
    }

    const response = yield call(api.listVerifyPage, {
      filterPageVerification,
    });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(PageActions.getListVerifyPageSuccess(data, pages));
    } else {
      yield put(PageActions.getListVerifyPageFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getListVerifyPageFailure());
    SweetAlert.error(e.message);
  }
}

export function* verifyPageDetail(api: any, action: any) {
  try {
    const { id } = action;
    const response = yield call(api.verifyPageId, id);

    const { data } = response;
    if (response.ok) {
      yield put(PageActions.getListVerifyPageIdSuccess(data));
    } else {
      yield put(PageActions.getListVerifyPageIdFailure());
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    yield put(PageActions.getListVerifyPageIdFailure());
    SweetAlert.error(e.message);
  }
}

export function* lockPage(api: any, action: any) {
  try {
    const { id, data } = action;

    const { reason, detail } = data;

    if (!!reason) {
      const resLock = yield call(api.lockPage, id, {
        blockMessage: reason,
      });
      if (resLock.ok) {
        if (detail) {
          yield put(PageActions.getPageFoodByIdRequest(id));
        } else {
          yield put(PageActions.getListPageFoodRequest());
        }
        SweetAlert.toastSuccess(t('page.message.block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resLock);
        SweetAlert.error(message);
      }
    } else {
      const resUnLock = yield call(api.unLockPage, id);
      if (resUnLock.ok) {
        if (detail) {
          yield put(PageActions.getPageFoodByIdRequest(id));
        } else {
          yield put(PageActions.getListPageFoodRequest());
        }
        SweetAlert.toastSuccess(t('page.message.un_block_success'));
      } else {
        const message = pathOr('', ['data', 'error', 'message'], resUnLock);
        SweetAlert.error(message);
      }
    }
  } catch (error) {
    SweetAlert.error(error.message);
  }
}

export function* deletePage(api: any, action: any) {
  const { id, data } = action;

  const { reason, detail } = data;

  try {
    const response = yield call(api.deletePage, id, {
      deletedMessage: reason,
    });
    if (response.ok) {
      yield delay(1000);
      if (detail) {
        history.push(ROUTERS.LIST_FOOD);
      } else {
        yield put(PageActions.getListPageFoodRequest());
      }
      SweetAlert.toastSuccess(t('page.delete_success'));
    } else {
      const message = pathOr('', ['data', 'error', 'message'], response);
      SweetAlert.error(message);
    }
  } catch (e) {
    SweetAlert.error(e.message);
  }
}
