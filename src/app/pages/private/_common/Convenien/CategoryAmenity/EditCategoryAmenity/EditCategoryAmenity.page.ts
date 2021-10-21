import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { withFormik } from 'formik';
import { FormikBag } from 'formik';
import Api from 'app/services/Api';
import EditCategoryAmenity from './EditCategoryAmenity.view';
import {
  mapPropsToValues,
  validationSchema,
} from './EditCategoryAmenity.form.config';
import handlers from './EditCategoryAmenity.handler';
import { IValues } from './EditCategoryAmenity.type';

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_CATEGORY_AMENITY } = formikBag.props;
    EDIT_CATEGORY_AMENITY(values);
  },
};

const enhancer = compose<any, any>(
  withHandlers(handlers),
  withState('data', 'setData', {}),
  lifecycle({
    componentDidMount(this: any) {
      const id = this?.props?.match?.params?.id;
      (async () => {
        const res = await Api.getCategoryAmenityById(id);
        const categoryAmenities = res.ok && res.status === 200 && res?.data;
        this?.props?.setData(categoryAmenities);
      })();
    },
  }),

  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(EditCategoryAmenity);
