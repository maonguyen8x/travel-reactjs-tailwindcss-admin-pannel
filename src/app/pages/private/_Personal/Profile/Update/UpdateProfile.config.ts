import * as Yup from 'yup';
import { t } from 'app/i18n';
import { IPropfileItem } from './UpdateUser.type';

interface IProps {
  profile: IPropfileItem;
}

const mapPropsToValues = ({ profile }: IProps) => {
  const introduce = profile?.profiles?.introduce?.introduce;
  const gender = profile?.profiles?.gender?.gender;
  const birthday = profile?.profiles?.birthday?.birthday;
  const address = profile?.profiles?.address?.address;
  const phone = profile?.profiles?.phone?.phone;
  const website = profile?.profiles?.website?.website;
  const work = profile?.profiles?.work?.work;
  const education = profile?.profiles?.education;
  const email = profile?.email?.email;
  const name = profile?.name;

  return {
    introduce,
    gender,
    birthday,
    address,
    email,
    website,
    phone,
    education,
    work,
    name,
  };
};

const validationSchema = Yup.object().shape({
  introduce: Yup.string().required(t('APP.PROFILE.REQUIRED.INTRO')).nullable(),
  gender: Yup.string().required(t('APP.PROFILE.REQUIRED.GENDER')).nullable(),
  birthday: Yup.string()
    .required(t('APP.PROFILE.REQUIRED.BIRTHDAY'))
    .nullable(),
  address: Yup.string().required(t('APP.PROFILE.REQUIRED.ADDRESS')).nullable(),
  website: Yup.string().required(t('APP.PROFILE.REQUIRED.WEBSITE')).nullable(),
  education: Yup.string()
    .required(t('APP.PROFILE.REQUIRED.EDUCATION'))
    .nullable(),
  work: Yup.string().required(t('APP.PROFILE.REQUIRED.WORK')).nullable(),
  email: Yup.string().required(t('APP.PROFILE.REQUIRED.EMAIL')).nullable(),
  phone: Yup.string().required(t('APP.PROFILE.REQUIRED.PHONE')).nullable(),
});
export { mapPropsToValues, validationSchema };
