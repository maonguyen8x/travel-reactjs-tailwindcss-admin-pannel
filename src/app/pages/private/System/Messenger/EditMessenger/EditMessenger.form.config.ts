import * as Yup from 'yup';

const mapPropsToValues = ({ match }: any) => {
  const messageVi = match?.params?.slug.split('__')?.[0];
  const messageEn = match?.params?.slug.split('__')?.[1];
  return {
    messageVi: messageVi || '',
    messageEn: messageEn || '',
  };
};

const validationSchema = () =>
  Yup.lazy((values: any) => {
    return Yup.object().shape({
      ...(!!values?.messageVi || !!values?.messageEn
        ? {}
        : {
            messageVi: Yup.string().required(),
            messageEn: Yup.string().required(),
          }),
    });
  });

export { mapPropsToValues, validationSchema };
