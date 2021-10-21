import { upLoadIcon } from 'app/utils';
import { addBackgroundPost } from './service';

export interface IValues {
  color: string;
  isActive: boolean;
  files: any;
}

export default {
  CREATE_BACKGROUND_POST: ({ getListBackgroundPost }: any) => async (
    values: IValues,
    setSubmitting: any
  ) => {
    const backgroundPost = await upLoadIcon(values?.files);
    addBackgroundPost({
      backgroundPost,
      color: values?.color,
      isActive: true,
    }).then(() => {
      getListBackgroundPost();
      setSubmitting(false);
    });
  },
};
