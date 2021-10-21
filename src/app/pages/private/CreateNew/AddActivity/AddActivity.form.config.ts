import * as Yup from 'yup';
import moment from 'moment';
import { COORDINATES, FORMAT_COMPARE_TIME } from 'app/constants';
import { t } from 'app/i18n';
import { formatDay } from 'app/utils';

const mapPropsToValues = () => ({
  name: '',
  locationId: null,
  country: '',
  city: '',
  district: '',
  ward: '',
  street: '',
  number: '',
  address: '',
  lat: COORDINATES.lat,
  lng: COORDINATES.lng,
  files: [],
  startDate: '',
  fromHour: '',
  endDate: '',
  toHour: '',
  introduce: '',
  price: '0',
});

const validationSchema = Yup.object().shape({
  locationId: Yup.number()
    .typeError(t('activity.required.location'))
    .required(),
  name: Yup.string().required(),
  startDate: Yup.string()
    .required(t('activity.validate.date'))
    .test('newDate', t('activity.validate.check_new_date'), function () {
      const { startDate } = this.parent;
      const newDate = new Date();
      const compareDate =
        moment(new Date()).isBefore(startDate) ||
        moment(formatDay(newDate)).isSame(startDate);
      return compareDate;
    }),
  fromHour: Yup.string().required(),
  endDate: Yup.string()
    .required(t('activity.validate.date'))
    .test('date', t('activity.validate.check_date'), function () {
      const { startDate, endDate } = this.parent;
      const compareDate =
        moment(startDate).isBefore(endDate) ||
        moment(startDate).isSame(endDate);
      return compareDate;
    }),
  toHour: Yup.string()
    .required()
    .test('time', t('activity.validate.check_time'), function () {
      const { startDate, endDate, fromHour, toHour } = this.parent;
      const startTime = moment(`${startDate}T${fromHour}`).format(
        FORMAT_COMPARE_TIME
      );
      const endTime = moment(`${endDate}T${toHour}`).format(
        FORMAT_COMPARE_TIME
      );
      const compareTime = moment(startTime).isBefore(endTime);
      return compareTime;
    }),
  introduce: Yup.string().required(t('activity.required.introduce')),
  country: Yup.string().required(t('activity.required.country')),
  ward: Yup.string().required(t('activity.required.ward')),
  city: Yup.string().required(t('activity.required.city')),
  district: Yup.string().required(t('activity.required.district')),
  address: Yup.string().required(t('activity.required.address')),
  files: Yup.array()
    .test('empty-check', t('activity.validate.date'), (file: any) => {
      return Number(file) !== 0 && file?.length <= 15;
    })
    .nullable(),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive(t('activity.required.price'))
    .required()
    .min(0, t('activity.validate.min_price'))
    .max(100000000, t('activity.validate.max_price')),
});

export { mapPropsToValues, validationSchema };
