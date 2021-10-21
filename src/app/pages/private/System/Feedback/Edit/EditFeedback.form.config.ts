import * as Yup from 'yup';
import { t } from 'app/i18n';

interface IFeedbackItem {
  content: string;
  attachments: any;
}
interface IProps {
  feedbackDetail: IFeedbackItem;
}

const mapPropsToValues = ({ feedbackDetail }: IProps) => {
  const content = feedbackDetail?.content;
  const mediaContents = feedbackDetail?.attachments;

  const files = mediaContents;

  return {
    content,
    files,
  };
};

const validationSchema = Yup.object().shape({
  content: Yup.string().min(20).required(t('CONTENT_REQUEST')),
});

export { mapPropsToValues, validationSchema };
