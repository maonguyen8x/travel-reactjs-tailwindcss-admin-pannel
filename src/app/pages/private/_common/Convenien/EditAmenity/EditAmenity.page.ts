import { compose, withHandlers, lifecycle, withState } from 'recompose';
import { withFormik } from 'formik';
import { FormikBag } from 'formik';
import Api from 'app/services/Api';
import { checkDataApi } from 'app/utils';
import EditCategoryAmenity from './EditAmenity.view';
import { mapPropsToValues, validationSchema } from './EditAmenity.form.config';
import handlers from './EditAmenity.handler';
import { IValues } from './EditAmenity.type';

const fomitConfig = {
  mapPropsToValues,
  validationSchema,
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_AMENITY } = formikBag.props;
    EDIT_AMENITY(values);
  },
};

const enhancer = compose<any, any>(
  withHandlers(handlers),
  withState('data', 'setData', {}),
  lifecycle({
    componentDidMount(this: any) {
      const id = this?.props?.match?.params?.id;
      (async () => {
        const res = await Api.getAmenityById(id);
        const amenities = checkDataApi(res);
        this?.props?.setData(amenities);
      })();
    },
  }),

  // @ts-ignore
  withFormik(fomitConfig)
);

export default enhancer(EditCategoryAmenity);
