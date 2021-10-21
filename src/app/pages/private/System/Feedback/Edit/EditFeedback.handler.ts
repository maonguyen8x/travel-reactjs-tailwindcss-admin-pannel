import { FormikBag } from 'formik';

interface IValues {
  content: string;
  files: any;
}
const EDIT_FEEDBACK = (
  values: IValues,
  formikBag: FormikBag<any, IValues>
): void => {
  const { editFeedback, feedbackDetail } = formikBag.props;
  const { id } = feedbackDetail;
  editFeedback(id, {
    content: values.content,
    files: values.files,
  });
};

export { EDIT_FEEDBACK };
