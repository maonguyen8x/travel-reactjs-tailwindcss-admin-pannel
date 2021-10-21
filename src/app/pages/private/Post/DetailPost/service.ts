import { FILTER, POST_TYPES } from 'app/constants';
import API from 'app/services/Api';
import { checkDataApi } from 'app/utils';

const onGetListLikes = async (id: number) => {
  const listLikes = await API.getListLikes(id, 'post', {
    filterLikes: {
      order: FILTER.NEWEST,
    },
  });
  return checkDataApi(listLikes);
};

const onGetListComments = async (id: number) => {
  const listComments = await API.getListComments({
    filterComments: {
      order: FILTER.NEWEST,
      where: { postId: id },
    },
  });
  return checkDataApi(listComments);
};

const onGetListRankings = async (id: number) => {
  const listRankings = await API.getListRanking({
    filterRankings: {
      order: FILTER.NEWEST,
      where: { postId: id },
    },
  });
  return checkDataApi(listRankings);
};

const onGetListShares = async (id: number) => {
  const listShares = await API.listPost({
    postFilterSearch: {
      order: FILTER.NEWEST,
      where: { sourcePostId: id, postType: POST_TYPES.SHARED },
    },
  });
  return checkDataApi(listShares);
};

export {
  onGetListLikes,
  onGetListComments,
  onGetListRankings,
  onGetListShares,
};
