import { compose, withHandlers } from 'recompose';
import { FormikBag, withFormik } from 'formik';
import MediaContentAction from 'app/store/redux/MediaContentRedux';
import { connect } from 'react-redux';
import AddBackgroundView from './AddBackgroundPost.view';
import handlers from './AddBackgroundPost.handler';
import { IValues } from './AddBackgroundPost.handler';

const mapDispatchToProps = (dispatch: any) => ({
  getListBackgroundPost: (offset: number, limit: number) =>
    dispatch(MediaContentAction.getListBackgroundPostRequest(offset, limit)),
});

const formikConfig = {
  enableReinitialize: true,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { setSubmitting, props } = formikBag;
    const { CREATE_BACKGROUND_POST } = props;
    CREATE_BACKGROUND_POST(values, setSubmitting);
  },
};

const enhancer = compose<any, any>(
  connect(null, mapDispatchToProps),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddBackgroundView);
