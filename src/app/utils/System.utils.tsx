import NormalInput from 'app/components/Form/NormalInput';
import TextInput from 'app/components/Form/TextInput';
import SweetAlert from 'app/components/SweetAlert';
import {
  COLORS,
  EVENTS,
  REPORT_STATUS_TYPES,
  ROUTERS,
  ROUTER_PATH,
  STATUS_CHANGE_LOCATION_TYPES,
  STATUS_ORDER_TOUR,
} from 'app/constants';
import { t } from 'app/i18n';
import Api from 'app/services/Api';
import { EventRegister } from 'app/services/EventRegister';
import { compose, includes, map, reduce, uniq, filter } from 'ramda';
import Swal from 'sweetalert2';
import { customDashBoardType } from '.';

export const onClickRowTable = (e: any) => e?.stopPropagation();

export const uploadImageCallBack = (files: any) => {
  const file = files;
  return new Promise(() => {
    const dataForm = new FormData();
    dataForm.append('files', file);

    // imageService.postImage(dataForm, 'Article').then(res => {
    //   resolve({ data: { link: IMAGE_STORE + res.data[0].org } });
    // })
  });
};

export const removeSpecialCharacter = (value: string) =>
  value.replace(/[^a-zA-Z0-9 ]/g, '');

export const compareArray = (array1: any[], array2: any[]): boolean => {
  // if the other array is a falsy value, return
  if (!array1) {
    return false;
  }
  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0, l = array1.length; i < l; i += 1) {
    // Check if we have nested arrays
    // tslint:disable-next-line:early-exit
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      return compareArray(array1[i], array2[i]);
    }
    if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

export const showConfirmLockPopup = async (
  id: number,
  title: string,
  inputOptions: any,
  filter?: any
) => {
  Swal.fire({
    title: t(`sweet.block.title.${title}`),
    icon: 'question',
    input: 'radio',
    inputPlaceholder: 'Select',
    inputOptions,
    inputValidator: (value) => (!value ? t('error_text') : ''),
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t(`sweet.button.block.${title}`),
    cancelButtonText: t('sweet.button.back'),
    reverseButtons: true,
    html:
      `<label class="uto-label">${t('sweet.label.other_reason')}</label>` +
      '<textarea id="textarea" class="swal2-input uto-textarea">',
    focusConfirm: false,
    preConfirm: (reason) => {
      return [
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById('textarea').value || reason,
      ];
    },
  }).then(async (result: any) => {
    if (result?.isConfirmed && !!result?.value?.[0]) {
      EventRegister?.emit(EVENTS.LOCK_REQUEST, {
        id: id,
        reason: result?.value?.[0],
        filter,
      });
    }
  });
};

export const showConfirmUnLockPopup = (
  unLock: any,
  id: number,
  title: string,
  detail = false,
  system = false
) => {
  Swal.fire({
    title: t(`sweet.un_block.title.${title}`),
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.RED,
    cancelButtonColor: COLORS.CANCELED,
    confirmButtonText: t(`sweet.button.un_block.${title}`),
    cancelButtonText: t('sweet.button.back'),
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      unLock(id, {
        detail,
        system,
      });
    }
  });
};

export const formatLiteral = (text: string) => {
  let result = text;
  result = result?.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result?.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result?.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result?.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result?.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result?.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result?.replace(/đ/g, 'd');
  result = result?.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  result = result?.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  result = result?.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  result = result?.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  result = result?.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  result = result?.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  result = result?.replace(/Đ/g, 'D');
  return result?.toLocaleLowerCase();
};

export const countCountryLocations = (postDetail: any) =>
  compose(
    uniq,
    map((x: any) => formatLiteral(x.country).replace(/ /g, ''))
  )(postDetail?.metadata?.hadCameLocations || [])?.length;

export const getMapResultList = (data: any, key: string) =>
  compose(
    filter((result: any) => result),
    map((items: any) => items?.types?.[0] === key && items?.long_name)
  )(data)?.[0] || '';

export const customPathImage = (url: string) => {
  const pathName = url?.split('/');
  const customPathName = pathName?.[pathName?.length - 1];

  return `https://5002302-s3user.storebox.vn/jgooooo-dev/${customPathName}`;
};

export const formDataFiles = (files: any) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i += 1) {
    formData.append('files', files[i]);
  }

  return formData;
};
export const formatHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const readFile = (file: any) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

export const CustomInput = ({ label, value }: any) => (
  <NormalInput value={value} label={label} as="Col" md="6" disabled />
);

export const CustomTextInput = ({ label, field, md, Col, disabled }: any) => (
  <TextInput {...field} label={label} as={Col} md={md} disabled={disabled} />
);

export const getNumberPictureVideo = (medias: any) =>
  reduce(
    (acc: any, elem: any) => {
      if (
        includes('video', [
          elem?.type?.toLowerCase(),
          elem?.resourceType?.toLowerCase(),
        ])
      ) {
        return {
          ...acc,
          numberVideo: acc?.numberVideo + 1,
        };
      }
      return {
        ...acc,
        numberImage: acc?.numberImage + 1,
      };
    },
    { numberVideo: 0, numberImage: 0 }
  )(medias || []);

export const findTotalType = (data: any, type: string) => {
  return data
    ?.map((items: any) => customDashBoardType(items?.type) && items)
    ?.find((i: any) => i?.type === type);
};

export const RandomColor = (index: number) => {
  const arr: any = [];

  for (let i = 0; i < index; i += 1) {
    const color = `rgb(${Math.floor(Math.random() * 200)}, ${Math.floor(
      Math.random() * 200
    )}, ${Math.floor(Math.random() * 200)})`;

    arr?.push(color);
  }

  return arr;
};

export const getStatusOrderTour = (status: string) => {
  switch (status) {
    case STATUS_ORDER_TOUR.REQUEST:
      return (
        <span className="text-green-400 font-medium">
          {t('booking.going_on')}
        </span>
      );
    case STATUS_ORDER_TOUR.CONFIRMED:
      return (
        <span className="text-yellow-500 font-medium">
          {t('booking.confirmed')}
        </span>
      );
    case STATUS_ORDER_TOUR.CANCELED:
      return (
        <span className="text-red-500 font-medium">
          {t('booking.canceled')}
        </span>
      );
    case STATUS_ORDER_TOUR.COMPLETED:
      return (
        <span className="text-gray-500 font-medium">
          {t('booking.completed')}
        </span>
      );
    default:
      return '';
  }
};

export const changeStatus = (type: string) => {
  switch (type) {
    case STATUS_CHANGE_LOCATION_TYPES.ACCEPTED:
      return (
        <span className="text-green-400 font-medium">
          {t('change_request.status.accepted')}
        </span>
      );
    case STATUS_CHANGE_LOCATION_TYPES.REJECTED:
      return (
        <span className="text-gray-500 font-medium">
          {t('change_request.status.rejected')}
        </span>
      );
    case STATUS_CHANGE_LOCATION_TYPES.REQUESTED:
      return (
        <span className="text-yellow-500 font-medium">
          {t('change_request.status.requested')}
        </span>
      );
    default:
      return '';
  }
};

export const ReportStatusTypes = (name: string) => {
  switch (name) {
    case REPORT_STATUS_TYPES.WAITING_FOR_PROCESSING:
      return (
        <span className="text-yellow-500 font-medium">
          {t('report.wait_processing')}
        </span>
      );
    case REPORT_STATUS_TYPES.PROCESSING:
      return (
        <span className="text-green-400 font-medium">
          {t('report.processing')}
        </span>
      );
    case REPORT_STATUS_TYPES.PENDING:
      return (
        <span className="text-red-500 font-medium">{t('report.pending')}</span>
      );
    case REPORT_STATUS_TYPES.COMPLETED:
      return (
        <span className="text-gray-500 font-medium">
          {t('report.completed')}
        </span>
      );
    case REPORT_STATUS_TYPES.CLOSED:
      return (
        <span className="text-red-500 font-medium">{t('report.closed')}</span>
      );
    default:
      return '';
  }
};

export const onDeleteData = (
  message: string,
  LIST_MESSAGE: any,
  setData: any
) => () => {
  Swal.fire({
    title: t('sweet.message.title'),
    text: t('sweet.message.sub_title'),
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.GREEN,
    cancelButtonColor: COLORS.RED,
    confirmButtonText: t('sweet.button.confirm'),
    cancelButtonText: t('sweet.button.cancel'),
  }).then((result) => {
    if (result.isConfirmed) {
      Api.deleteMessenger({ message: JSON.parse(message) })
        .then(async (res) => {
          if (res?.ok) {
            const res = await LIST_MESSAGE();
            setData(res);
          }
        })
        .then(() => {
          SweetAlert.toastSuccess(t('sweet.message.delete_success'));
        });
    }
  });
};

export const BlockPage = () => () => {};

export const ConfirmPage = () => () => {};

export const uploadBackgroundPostFile = async (event: any) => {
  const file = event?.target?.files;
  const url = window.URL.createObjectURL(
    new Blob([file?.[0]], { type: 'image/jpeg' })
  );
  return { file, url };
};

export const getPathCreateNew = (path: string) => {
  switch (path) {
    case ROUTER_PATH.LOCATION:
      return ROUTERS.LOCATION_ADD;
    case ROUTER_PATH.POST:
      return ROUTERS.POST_ADD;
    case ROUTER_PATH.FOOD:
      return ROUTERS.FOOD_ADD;
    case ROUTER_PATH.TOUR:
      return ROUTERS.TOUR_ADD;
    case ROUTER_PATH.ACTIVITY:
      return ROUTERS.CREATE_NEW_ACTIVITY;
    default:
      return ROUTERS.POST_ADD;
  }
};

/* eslint-disable */
export const changeToSearch = (address: string) => {
  let slug;
  slug = address.toLowerCase();
  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  // Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ''
  );
  // Đổi khoảng trắng thành ký tự gạch ngang
  // slug = slug.replace(/ /gi, '-');
  // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  // Xóa các ký tự gạch ngang ở đầu và cuối
  slug = `@${slug}@`;
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};
