import { IValues } from './EditPost.type';

export default {
  EDIT_POST: (props: any) => (values: IValues) => {
    const { editPost, postDetail } = props;
    const { id } = postDetail;

    const locationId =
      typeof values?.locationId === 'number'
        ? values?.locationId
        : postDetail?.locationId;

    editPost(id, {
      locationId,
      content: values?.content,
      mediaContents: values?.files,
      accessType: values?.accessType,
      isPublicLocation: true,
    });
  },
};
