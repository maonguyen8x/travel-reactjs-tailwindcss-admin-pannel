import { t } from 'app/i18n';
import * as Yup from 'yup';
import { ILocationItem } from './EditLocation.type';

interface IProps {
  locationDetail: ILocationItem;
}

const mapPropsToValues = ({ locationDetail }: IProps) => {
  const name = locationDetail?.name;
  const city = locationDetail?.areaLevel1;
  const country = locationDetail?.country;
  const district = locationDetail?.areaLevel2;
  const ward = locationDetail?.areaLevel3;
  const street = locationDetail?.areaLevel4;
  const number = locationDetail?.areaLevel5;
  const lat = locationDetail?.latitude;
  const lng = locationDetail?.longitude;
  const averagePoint = locationDetail?.averagePoint || 1;

  return {
    averagePoint,
    lat,
    lng,
    name,
    city,
    country,
    district,
    ward,
    street,
    number,
  };
};

const validationSchema = ({ isWhere }: any) =>
  Yup.object().shape({
    country: Yup.string().required(),
    city: Yup.string().required(),
    district: Yup.string().required(),
    ward: Yup.string().required(),
    lat: Yup.number().required().typeError(t('message.number')),
    lng: Yup.number().required().typeError(t('message.number')),
    ...(isWhere
      ? {
          averagePoint: Yup.number().min(1).required(),
          name: Yup.string().required(),
        }
      : {
          name: Yup.string(),
        }),
  });

export { mapPropsToValues, validationSchema };
