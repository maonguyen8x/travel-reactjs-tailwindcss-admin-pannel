import { call, put, select } from 'redux-saga/effects';
import SecurityActions from 'app/store/redux/SecurityRedux';
import { t } from 'app/i18n';
import { pathOr } from 'ramda';
import SweetAlert from '../../components/SweetAlert';
import { SEARCH_TYPES } from '../../constants';

export function* getBlackListIPS(
  api: any,
  {
    filter: {
      offset,
      limit,
      order,
      searchType,
      search,
      status,
      fromDate,
      toDate,
    },
  }: any
) {
  try {
    let filter = {
      offset: offset * limit,
      limit,
      order: order,
    };

    if (searchType === SEARCH_TYPES.DEFAULT) {
      filter = {
        ...filter,
        ...(search && {
          where: {
            id: { like: `%${search}%` },
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.STATUS) {
      filter = {
        ...filter,
        ...(status && {
          where: {
            status: status,
          },
        }),
      };
    }

    if (searchType === SEARCH_TYPES.TIME) {
      filter = {
        ...filter,
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

    const response = yield call(api.getBlackListIPS, { filter });

    if (response.ok) {
      const { data } = response;
      const { count } = response?.data;
      const pages = Math.ceil(count / limit);

      yield put(SecurityActions.getBlackListIPSSuccess(data, pages));
    } else {
      yield put(SecurityActions.getBlackListIPSFailure());
    }
  } catch (e) {
    yield put(SecurityActions.getBlackListIPSFailure());
    SweetAlert.error(e.message);
  }
}
