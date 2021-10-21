import { formartSearchTime, toNumber, formatCustomSearchTime } from 'app/utils';
import { t } from 'app/i18n';
import * as Yup from 'yup';
import moment from 'moment';
import { pathOr } from 'ramda';
import { ItemActivities } from './EditActivities.type';

interface IProps {
  activityDetail: ItemActivities;
}

const mapPropsToValues = ({ activityDetail }: IProps) => {
  const files = activityDetail?.mediaContents;
  const startDay = moment(activityDetail?.from).format('YYYY-MM-DD');
  const endDay = moment(activityDetail?.to).format('YYYY-MM-DD');
  const fromHour = moment(activityDetail?.from).format('hh:mm');
  const toHour = moment(activityDetail?.to).format('hh:mm');

  const currencyId = activityDetail?.currencyId;
  const introduction = activityDetail?.introduction;
  const price = toNumber(activityDetail?.price)?.toPrecision();

  const locationId = activityDetail?.location?.id;
  const name = activityDetail?.name;
  const address = activityDetail?.formatedAddress;
  const city = activityDetail?.location?.areaLevel1;
  const country = activityDetail?.location?.country;
  const district = activityDetail?.location?.areaLevel2;
  const ward = activityDetail?.location?.areaLevel3;
  const street = activityDetail?.location?.areaLevel4;
  const number = activityDetail?.location?.areaLevel5;
  const lat = activityDetail?.location?.latitude;
  const lng = activityDetail?.location?.longitude;

  return {
    name,
    address,
    price,
    files,
    country,
    city,
    district,
    ward,
    street,
    number,
    startDay,
    endDay,
    introduction,
    lat,
    lng,
    currencyId,
    fromHour,
    toHour,
    locationId,
  };
};

const validationSchema = Yup.object().shape({
  locationId: Yup.number()
    .typeError(t('activity.required.location'))
    .required(),
  name: Yup.string().required(t('activity.name.require')),
  country: Yup.string().required(t('activity.country.require')),
  city: Yup.string().required(t('activity.city.require')),
  district: Yup.string().required(t('activity.district.require')),
  ward: Yup.string().required(t('activity.ward.require')),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required(t('activity.price.require')),
  startDay: Yup.string().required(t('activity.start_day.require')),
  endDay: Yup.string().required(t('activity.end_day.require')),
  files: Yup.array()
    .test(
      'empty-check',
      t('required.media_content'),
      (file) => Number(file) !== 0
    )
    .nullable(),
});

export { mapPropsToValues, validationSchema };
