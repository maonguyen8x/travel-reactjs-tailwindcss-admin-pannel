import { FILTER, ROUTERS } from 'app/constants';
import Api from 'app/services/Api';
import { checkStatusApi } from 'app/utils';

export default {
  ON_ADD_MESSENGER: ({ history }: any) => () => {
    history.push(ROUTERS.MESSENGER_ADD);
  },

  LIST_MESSAGE: () => async () => {
    const res = await Api.listMessenger({
      filterMessage: {
        where: {
          createdAt: FILTER.NEWEST,
        },
      },
    });
    if (checkStatusApi(res)) {
      return res.data;
    }
    return [];
  },

  ON_EDIT: ({ history }: any) => (slug: string) => () => {
    history.push(ROUTERS.MESSENGER_EDIT.replace(':slug', slug));
  },
};
