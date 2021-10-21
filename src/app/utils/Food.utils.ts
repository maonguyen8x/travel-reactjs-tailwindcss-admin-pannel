import Images from 'app/assets/images';
import SweetAlert from 'app/components/SweetAlert';
import { COLORS, FOOD_DETAIL_TYPE, ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { onDeletePage } from 'app/pages/private/PageFood/ListPageFood/service';
import Swal from 'sweetalert2';
import { formatTime } from '.';
import { deleteDetailFoodPage } from '../store/sagas/FoodSaga';

export const getFieldFood = () => [
  {
    id: 'name',
    name: t('food.name'),
    show: true,
  },
  {
    id: 'locationId',
    name: t('food.address'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('food.createdAt'),
    show: true,
  },
  {
    id: 'creator',
    name: t('food.creator'),
    show: true,
  },
  {
    id: 'totalPosts',
    name: t('food.total_posts'),
    show: true,
  },
  {
    id: 'totalService',
    name: t('food.total_service'),
    show: false,
  },
  {
    id: 'totalReview',
    name: t('food.total_review'),
    show: false,
  },
  {
    id: 'totalFollow',
    name: t('food.total_follow'),
    show: false,
  },
  {
    id: 'like',
    name: t('food.count_like'),
    show: false,
  },
  {
    id: 'comment',
    name: t('food.count_comment'),
    show: false,
  },
  {
    id: 'share',
    name: t('food.count_share'),
    show: false,
  },
  {
    id: 'isActive',
    name: t('food.verify'),
    show: false,
  },
  {
    id: 'action',
    name: t('food.action'),
    show: true,
  },
];

export const getDataFoodDetail = (food: any) => {
  const DATA = [
    {
      key: t('food.address'),
      value: food?.location?.address,
    },
    {
      key: t('food.owner'),
      value: food?.user?.name,
      active: true,
    },
    {
      key: t('food.created'),
      value: formatTime(food?.createdAt),
    },
    {
      key: t('food.total_posts'),
      value: food?.totalPosts || 0,
    },
    {
      key: t('food.total_services'),
      value: food?.totalServices || 0,
    },
    {
      key: t('food.total_ranking'),
      value: food?.totalRanking || 0,
    },
    {
      key: t('food.total_followings'),
      value: food?.totalFollowing || 0,
    },
    {
      key: t('food.total_like'),
      value: food?.totalLike || 0,
    },
    {
      key: t('food.total_comment'),
      value: food?.totalComment || 0,
    },
    {
      key: t('food.total_share'),
      value: food?.totalShare || 0,
    },
  ];

  return DATA;
};

export const showConfirmDeletePageFoodPopup = async (
  id: number,
  delPage: any,
  detail = false
) => {
  Swal.fire({
    title: t('sweet.title.food'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t('sweet.button.submit'),
    cancelButtonText: t('sweet.button.cancel'),
    reverseButtons: true,
    showCloseButton: true,
    html:
      `<label class="uto-label">${t('sweet.label.noti')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value,
      ];
    },
  }).then(async (result: any) => {
    if (result?.isConfirmed && !!result?.value?.[0]) {
      delPage(id, { reason: result?.value?.[0], detail });
    }
  });
};

export const showConfirmDeletePagePopup = async (id: number) => {
  await Swal.fire({
    title: t('sweet.title.food'),
    icon: 'question',
    showCancelButton: true,
    inputValidator: (value) => (!value ? t('error_text') : ''),
    inputPlaceholder: 'Please enter a food',
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t('sweet.button.submit'),
    cancelButtonText: t('sweet.button.cancel'),
    reverseButtons: true,
    showCloseButton: true,
    html:
      `<label class="uto-label">${t('sweet.label.noti')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value,
      ];
    },
  }).then((result) => {
    if (result?.isConfirmed && !!result.value?.[0]) {
      Swal.fire('Deleted!', '', 'success');
    }
  });
};

export const showConfirmLockPagePopup = async (id: number) => {
  await Swal.fire({
    title: t('sweet.block.title.food.page'),
    icon: 'question',
    showCancelButton: true,
    inputValidator: (value) => (!value ? t('error_text') : ''),
    inputPlaceholder: 'Please enter a food',
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t('sweet.button.submit'),
    cancelButtonText: t('sweet.button.cancel'),
    reverseButtons: true,
    showCloseButton: true,
    html:
      `<label class="uto-label">${t('sweet.label.noti')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value,
      ];
    },
  }).then((result) => {
    if (result?.isConfirmed && !!result.value?.[0]) {
      Swal.fire('Deleted!', '', 'success');
    }
  });
};

export const getDataServiceFoodDetail = () => {
  const DATA = [
    {
      url: Images.background.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 20 || 0,
      ranking: 5 || 0,
      price: '200000',
    },
    {
      url: Images.image_default.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 4 || 0,
      ranking: 10 || 0,
      price: '100000',
    },
    {
      url: Images.background.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 2 || 0,
      ranking: 1 || 0,
      price: '500000',
    },
    {
      url: Images.noDisplay.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 6 || 0,
      ranking: 7 || 0,
      price: '600000',
    },
    {
      url: Images.noData.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 4 || 0,
      ranking: 1 || 0,
      price: '400000',
    },
    {
      url: Images.background.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 6 || 0,
      ranking: 3 || 0,
      price: '400000',
    },
    {
      url: Images.background.default,
      name: 'Bánh tráng cuốn thịt heo',
      type: 'Best seller',
      like: 20 || 0,
      ranking: 10 || 0,
      price: '400000',
    },
  ];
  return DATA;
};

export const getTitleHeaderFoodView = (type: string) => {
  switch (type) {
    case FOOD_DETAIL_TYPE.FOLLOWING:
      return t('food.count_fllower');
    case FOOD_DETAIL_TYPE.POST:
      return t('food.count_post');
    case FOOD_DETAIL_TYPE.MENU:
      return t('food.menu_image');
    case FOOD_DETAIL_TYPE.SERVICE:
      return t('food.detail.service.no');
    case FOOD_DETAIL_TYPE.REVIEW:
      return t('food.detail.review.no');
    default:
      return null;
  }
};

export const getPageSelectOption = () => ({
  '': `${t('sweet.user.reason_select')}`,
  'Page đã vi phạm quy tắc cộng đồng': `${t('sweet.page.community_rules')}`,
  'Page có hành vi lừa đảo, gây rối cộng động hoặc cá nhân cụ thể': `${t(
    'sweet.page.deceptive'
  )}`,
  'Page giả mạo': `${t('sweet.page.fake')}`,
});
