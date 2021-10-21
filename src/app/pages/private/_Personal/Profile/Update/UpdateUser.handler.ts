import { formatDay } from 'app/utils';
import { IValues } from './UpdateUser.type';

export default {
  UPDATE_PROFILE: (props: any) => (values: IValues) => {
    const { updateUserProfile } = props;
    const newBirthday = formatDay(values.birthday);
    updateUserProfile({
      introduce: {
        introduce: values.introduce,
        isPublic: true,
      },
      gender: {
        gender: values.gender,
        isPublic: true,
      },
      birthday: {
        birthday: newBirthday,
        isPublic: true,
      },
      address: {
        address: values.address,
        isPublic: true,
      },
      website: {
        website: values.website,
        isPublic: true,
      },
      education: values.education,
      work: {
        work: values.work,
        isPublic: true,
      },
      phone: {
        phone: values.phone,
        isPublic: true,
      },
      email: {
        email: values.email,
        isPublic: true,
      },
    });
  },
};
