import {
  ACCESS_TYPES,
  COLORS,
  INTERACTIVE,
  PLAN_TYPES,
  POST_TYPES,
  ROUTERS,
  SOCIAL_INTERACTIVE,
} from 'app/constants';
import { t } from 'app/i18n';
import ListLikesPost from 'app/pages/private/Post/DetailPost/ListLikesPosts';
import ListSharesPost from 'app/pages/private/Post/DetailPost/ListSharesPosts';
import ListCommentsPost from 'app/pages/private/Post/DetailPost/ListCommentsPosts';
import ListRankingsPost from 'app/pages/private/Post/DetailPost/ListRankingsPosts';
import ListLocationCompleted from 'app/pages/private/Post/DetailPost/PlaningPost/LocationCompleted';
import { history } from 'app/services/History';
import Swal from 'sweetalert2';
import { formatTime } from '.';

export const getFieldPost = () => [
  {
    id: 'content.keyword',
    name: t('post.content'),
    show: true,
  },
  {
    id: 'creator.name.keyword',
    name: t('post.owner'),
    show: true,
  },
  {
    id: 'formatedAddress',
    name: t('post.location'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('post.createdAt'),
    show: true,
  },
  {
    id: 'source',
    name: t('post.source'),
    show: true,
  },
  {
    id: 'type',
    name: t('post.type'),
    show: false,
  },
  {
    id: 'totalComment',
    name: t('post.totalComment'),
    show: false,
  },
  {
    id: 'totalShare',
    name: t('post.totalShare'),
    show: false,
  },
  {
    id: 'averagePoint',
    name: t('post.averagePoint'),
    show: false,
  },
  {
    id: 'totalBookmark',
    name: t('post.totalPlace'),
    show: false,
  },
  {
    id: 'totalReport',
    name: t('post.totalReport'),
    show: false,
  },
  {
    id: 'action',
    name: t('post.action'),
    show: true,
  },
];

export const renderInformationPostDetail = (postDetail: any) => {
  const DATA_INFOR = [
    {
      key: t('post.postType'),
      value: getTypeInteractive(postDetail?.postType),
    },
    {
      key: t('post.accessType'),
      value: getTypeRegime(postDetail?.accessType),
    },
    {
      key: t('post.backgroundPost'),
      value:
        !!postDetail?.backgroundPost || !!postDetail?.sourcePost?.backgroundPost
          ? t('posts.un_background')
          : t('posts.background'),
    },
    {
      key: t('post.created'),
      value: formatTime(postDetail?.createdAt),
    },
    postDetail?.locationId && {
      key: t('post.address'),
      value: postDetail?.location?.formatedAddress,
    },
    postDetail?.locationId && {
      key: t('post.status'),
      value: getTypeRegime(postDetail?.locationStatus),
    },
    {
      key: t('post.total_like'),
      value: postDetail?.totalLike,
      color: COLORS.T_BLUE,
      interactive: SOCIAL_INTERACTIVE.LIKE,
    },
    {
      key: t('post.total_comment'),
      value: postDetail?.totalComment,
      color: COLORS.T_BLUE,
      interactive: SOCIAL_INTERACTIVE.COMMENT,
    },
    {
      key: t('post.total_share'),
      value: postDetail?.totalShare,
      color: COLORS.T_BLUE,
      interactive: SOCIAL_INTERACTIVE.SHARE,
    },
    {
      key: t('post.total_saved'),
      value: postDetail?.bookmarks?.length || 0,
    },
    {
      key: t('post.average'),
      value: postDetail?.averagePoint,
      color: COLORS.T_BLUE,
      interactive: SOCIAL_INTERACTIVE.RANKING,
    },
    {
      key: t('post.total_reports'),
      value: postDetail?.totalReports?.count,
      color: COLORS.T_BLUE,
      interactive: postDetail?.totalReports?.count && SOCIAL_INTERACTIVE.REPORT,
    },
  ];
  return DATA_INFOR;
};

export const getListInteractive = (
  id: string,
  type: string,
  isShow: boolean,
  onToggle: any,
  locationCompleted?: any
) => {
  switch (type) {
    case SOCIAL_INTERACTIVE.LIKE:
      return <ListLikesPost isShow={isShow} onToggle={onToggle} />;
    case SOCIAL_INTERACTIVE.SHARE:
      return <ListSharesPost isShow={isShow} onToggle={onToggle} />;
    case SOCIAL_INTERACTIVE.COMMENT:
      return <ListCommentsPost isShow={isShow} onToggle={onToggle} />;
    case SOCIAL_INTERACTIVE.SAVE:
      return true;
    case SOCIAL_INTERACTIVE.RANKING:
      return <ListRankingsPost isShow={isShow} onToggle={onToggle} />;
    case SOCIAL_INTERACTIVE.REPORT:
      return history.push(ROUTERS.LIST_REPORT_ID.replace(':id', id), { id });
    case PLAN_TYPES.COMPLETED:
      return (
        <ListLocationCompleted
          isShow={isShow}
          onToggle={onToggle}
          data={locationCompleted}
        />
      );
    default:
      return false;
  }
};

export const getPostSelectOption = () => ({
  '': `${t('sweet.user.reason_select')}`,
  'Bài viết có nội dung, bài viết vi phạm quy tắc cộng đồng': `${t(
    'sweet.posts.community_rules'
  )}`,
  'Bài viết vi phạm quyền bản quyền và được báo cáo từ Cộng đồng': `${t(
    'sweet.posts.license'
  )}`,
});

export const checkSharePlan = (data: any) =>
  data?.postType === POST_TYPES.SHARE_PLAN;

export const getPostTypes = () => [
  {
    name: t('app.post.all'),
    value: '',
  },
  {
    name: t('app.post.share'),
    value: INTERACTIVE.SHARED,
  },
  {
    name: t('app.post.created'),
    value: INTERACTIVE.CREATED,
  },
  {
    name: t('app.table_post.service'),
    value: INTERACTIVE.SERVICE,
  },
  {
    name: t('app.table_post.page'),
    value: INTERACTIVE.PAGE_NEW,
  },
];

export const getTypeRegime = (name: string) => {
  switch (name) {
    case ACCESS_TYPES.PUBLIC:
      return t('access.public');
    case ACCESS_TYPES.PRIVATE:
      return t('access.private');
    case ACCESS_TYPES.FOLLOW:
      return t('access.follow');
    default:
      return '';
  }
};

export const getTypeInteractive = (name: string) => {
  switch (name) {
    case POST_TYPES.CREATED:
      return t('post_type.created');
    case POST_TYPES.SHARED:
      return t('post_type.shared');
    case POST_TYPES.SERVICE:
      return t('post_type.service');
    case POST_TYPES.PAGE_NEW:
      return t('post_type.page_new');
    case POST_TYPES.PAGE_REVIEW:
      return t('post_type.page_review');
    case POST_TYPES.MY_MAP:
      return t('post_type.my_map');
    case POST_TYPES.SHARE_PLAN:
      return t('post_type.share_plan');
    case POST_TYPES.SERVICE_REVIEW:
      return t('post_type.service_review');
    case POST_TYPES.ACTIVITY:
      return t('post_type.activity');
    default:
      return '';
  }
};

export const getTypePost = (backgroundPost: boolean) =>
  !!backgroundPost ? t('posts.un_background') : t('posts.background');

export const showConfirmDeletePostPopup = (id: number, delPost: any) => {
  Swal.fire({
    title: t('message.edit.post_title'),
    icon: 'question',
    text: t('message.edit.post_sub_title'),
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: t('sweet.button.yes'),
    cancelButtonText: 'Thoát',
    inputValidator: (value) => (value === '' ? t('error_text') : ''),
  }).then((result) => {
    if (result.isConfirmed) {
      delPost(id);
    }
  });
};
