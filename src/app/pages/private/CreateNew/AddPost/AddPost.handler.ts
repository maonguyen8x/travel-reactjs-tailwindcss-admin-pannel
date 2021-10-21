import { IValues } from './AddPost.type';

export default {
  CREATE_POST: (props: any) => (values: IValues) => {
    const { createPost } = props;

    createPost({
      content: values.content,
      locationId: values.locationId,
      mediaContents: values?.files,
      accessType: values?.accessType,
      isPublicLocation: true,
    });
  },
};
