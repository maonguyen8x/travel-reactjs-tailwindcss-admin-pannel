import * as Yup from 'yup';
import { isEmpty, isNil } from 'ramda';

const mapPropsToValues = () => ({
  messageVi: '',
  messageEn: '',
});

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
