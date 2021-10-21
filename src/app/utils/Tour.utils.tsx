import Images from 'app/assets/images';
import {
  COLORS,
  FORMAT_MOMENT_QUERY,
  TOUR_DETAIL_TYPES,
  TYPE_ORDER,
} from 'app/constants';
import { t } from 'app/i18n';
import Swal from 'sweetalert2';
import moment from 'moment';
import { formatTime } from '.';

export const getFieldTour = () => [
  {
    id: 'name',
    name: t('tour.name'),
    show: true,
  },
  {
    id: 'locationId',
    name: t('tour.location'),
    show: true,
  },
  {
    id: 'userId',
    name: t('tour.custom.creator'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('tour.createdAt'),
    show: true,
  },
  {
    id: 'totalPosts',
    name: t('tour.custom.total_posts'),
    show: true,
  },
  {
    id: 'totalReview',
    name: t('tour.total_ranking'),
    show: false,
  },
  {
    id: 'totalFollowers',
    name: t('tour.total_followers'),
    show: false,
  },
  {
    id: 'isActive',
    name: t('tour.verify'),
    show: false,
  },
  {
    id: 'action',
    name: t('tour.action'),
    show: true,
  },
];

export const onDeteleTour = async (id: number, getData: any, filter?: any) => {
  Swal.fire({
    title: t('sweet.title.tour'),
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
      getData(filter);
    }
  });
};

export const getDataServiceTourDetail = () => {
  const DATA = [
    {
      url: Images.background.default,
      name:
        ' Tour du lịch Đà Nẵng - Hội An - Quảng Bình - Huế - Hầ Nội - Vịnh Hạ Long - Sài Gòn - Vũng Tàu',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.image_default.default,
      name:
        ' Tour du lịch Đà Nẵng - Hội An - Quảng Bình - Huế - Hầ Nội - Vịnh Hạ Long - Sài Gòn - Vũng Tàu',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.background.default,
      name:
        'DU LỊCH ĐÀ NẴNG - HỘI AN - KDL BÀ NÀ - CẦU VÀNG - ĐỘNG THIÊN ĐƯỜNG - HUẾ',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.noDisplay.default,
      name: ' Tour du lịch phố cổ Hội An - Cù Lao Chàm',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.noData.default,
      name: ' Tour du lịch Bà Nà hill đi về trong ngày',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.background.default,
      name: ' Tour du lịch phố cổ Hội An - Cù Lao Chàm',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.background.default,
      name: 'B Tour du lịch phố cổ Hội An - Cù Lao Chàm',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.image_default.default,
      name:
        ' Tour du lịch Đà Nẵng - Hội An - Quảng Bình - Huế - Hầ Nội - Vịnh Hạ Long - Sài Gòn - Vũng Tàu',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.background.default,
      name:
        'DU LỊCH ĐÀ NẴNG - HỘI AN - KDL BÀ NÀ - CẦU VÀNG - ĐỘNG THIÊN ĐƯỜNG - HUẾ',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
    {
      url: Images.noDisplay.default,
      name: ' Tour du lịch phố cổ Hội An - Cù Lao Chàm',
      type: 'Daily tour',
      destination: 'Đà Nẵng, Huế, Quãng Bình, Quãng Trị',
    },
  ];
  return DATA;
};

export const getDataVerifyPageTour = () => {
  const DATA = [
    {
      key: t('authentication.type'),
      value: 'Doanh Nghiệp',
    },
    {
      key: t('authentication.name_service'),
      value: 'Tour',
    },
    {
      key: t('authentication.name_company'),
      value: 'Roses house',
    },
    {
      key: t('authentication.owner_company'),
      value: 'Nguyễn Mạnh Hoan',
    },
  ];
  return DATA;
};

export const onCancelVerifyTourPage = async () => {
  Swal.fire({
    title: t('sweet.cancel_verify.tour.title'),
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
      //
    }
  });
};

export const onVerifyTourPage = () => {
  Swal.fire({
    title: t('sweet.verify.tour.title'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: COLORS.GREEN,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t('sweet.button.confirm'),
    cancelButtonText: t('sweet.button.cancel'),
    reverseButtons: true,
    showCloseButton: true,
  });
};

export const getTypeStatusManageBookingStay = (
  startDate: string,
  endDate: string,
  status: string
) => {
  const DATE = new Date();
  const TODAY = moment(DATE).format(FORMAT_MOMENT_QUERY);

  const firstDate = moment(startDate).format(FORMAT_MOMENT_QUERY);
  const secondDate = moment(endDate).format(FORMAT_MOMENT_QUERY);

  const beforeDate = moment(TODAY).isBefore(firstDate);
  const currentDate =
    moment(TODAY).isBetween(firstDate, secondDate) ||
    moment(TODAY).isSame(firstDate);

  if (
    beforeDate &&
    status !== TYPE_ORDER.REQUEST &&
    status !== TYPE_ORDER.CANCELED
  ) {
    return TYPE_ORDER.CONFIRMED;
  }
  if (currentDate && status === TYPE_ORDER.CONFIRMED) {
    return TYPE_ORDER.GOING_ON;
  }
  return status;
};

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getTitleTourProvider = (type: string) => {
  switch (type) {
    case TOUR_DETAIL_TYPES.TOUR:
      return t('tour.detail.total_tour');
    case TOUR_DETAIL_TYPES.BOOKING:
      return t('tour.detail.total_booking');
    case TOUR_DETAIL_TYPES.RANKING:
      return t('tour.detail.total_ranking');
    case TOUR_DETAIL_TYPES.POST:
      return t('tour.detail.total_posts');
    case TOUR_DETAIL_TYPES.FOLLOW:
      return t('tour.detail.total_follow');
    default:
      return null;
  }
};

export const getTitleTourDetail = (type: string) => {
  switch (type) {
    case TOUR_DETAIL_TYPES.TOUR:
      return t('tour.detail.information');
    case TOUR_DETAIL_TYPES.TICKET:
      return t('tour.detail.ticket');
    case TOUR_DETAIL_TYPES.TIME:
      return t('tour.detail.times');
    case TOUR_DETAIL_TYPES.TRAVEL:
      return t('tour.detail.travel');
    case TOUR_DETAIL_TYPES.RANKING:
      return t('tour.total_ranking');
    default:
      return null;
  }
};

export const onDeleteTourPage = async () => {
  Swal.fire({
    title: t('sweet.title.tour'),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonColor: COLORS.RED,
    confirmButtonText: t('sweet.button.submit'),
    cancelButtonText: t('sweet.button.cancel'),
    reverseButtons: true,
    showCloseButton: true,
    html:
      `<label class="uto-label-page">${t('sweet.label.noti')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea-page"></textarea>',
    focusConfirm: false,
    preConfirm: (reason) => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value || reason,
      ];
    },
  }).then(async (result: any) => {});
};

export const getDataTravelSchedule = () => [
  {
    day: '1',
    data: [
      {
        time: '08:00',
        description:
          'Tập trung tại địa điểm đón, xuất phát,Tập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phát',
        attachments: [
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
      },
      {
        time: '12:00',
        description:
          'Ăn trưa tại nhà Hàng Hội An 1990, Quý khách có 1h để nghỉ nghơi và ăn uống tại điểm nghỉ này. ',
        attachments: [
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1432139509613-5c4255815697?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1606851094291-6efae152bb87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
      },
      {
        time: '14:00',
        description:
          'Quý Khách di chuyển tới khu vực tàu để đi đến địa điểm lặn, ngắm san hô.',
        attachments: [
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
      },
    ],
  },
  {
    day: '2',
    data: [
      {
        time: '08:00',
        description:
          'Tập trung tại địa điểm đón, xuất phát,Tập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phátTập trung tại địa điểm đón, xuất phát',
        attachments: [
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        ],
      },
    ],
  },
];
