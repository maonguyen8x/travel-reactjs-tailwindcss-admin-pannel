import { upLoadIcon } from 'app/utils';
import { EditBackgroundPost } from './service';

export interface IValues {
  color: string;
  isActive: boolean;
  files: any;
  data: any;
  id: number;
}

export default {
  CREATE_BACKGROUND_POST: ({ getListBackgroundPost }: any) => async (
    values: IValues,
    setSubmitting: any
  ) => {
    const backgroundPost = values?.files && (await upLoadIcon(values?.files));
    EditBackgroundPost(values?.id, {
      backgroundPost: backgroundPost || values?.data?.backgroundPost,
      color: values?.color || values?.data?.color,
      isActive: true,
    }).then(() => {
      getListBackgroundPost();
      setSubmitting(false);
    });
  },
};
