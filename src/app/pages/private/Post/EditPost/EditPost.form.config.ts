import * as Yup from 'yup';
import { t } from 'app/i18n';
import { ACCESS_TYPES } from 'app/constants';
import { pathOr } from 'ramda';

const mapPropsToValues = ({ postDetail }: any) => {
  const accessType = pathOr(ACCESS_TYPES.PUBLIC, ['accessType'], postDetail);
  const content = pathOr('', ['content'], postDetail);
  const mediaContents = pathOr([], ['mediaContents'], postDetail);
  const address = pathOr('', ['location', 'address'], postDetail);

  return {
    accessType,
    content,
    files: mediaContents,
    locationId: address,
  };
};

const validationSchema = Yup.object().shape({
  accessType: Yup.string().required(t('required.content')),
  content: Yup.string().required(t('required.content')),
  files: Yup.array()
    .test(
      'empty-check',
      t('required.media_content'),
      (file) => Number(file) !== 0
    )
    .nullable(),
  locationId: Yup.string().required(t('required.location')),
});

export { mapPropsToValues, validationSchema };
