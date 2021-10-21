import * as Yup from 'yup';
import { t } from 'app/i18n';
import { IPolicyItem } from './EditPolicy.type';

interface IProps {
  policyDetail: IPolicyItem;
}

const mapPropsToValues = ({ policyDetail }: IProps) => {
  const alias = policyDetail?.alias;
  const content = policyDetail?.content;

  return {
    alias,
    content,
  };
};

const validationSchema = Yup.object().shape({
  content: Yup.string().min(20).required(t('APP.POLICY.REQUIRED.CONTENT')),
  alias: Yup.string().required(t('APP.POLICY.REQUIRED.ALIAS')),
});

export { mapPropsToValues, validationSchema };
