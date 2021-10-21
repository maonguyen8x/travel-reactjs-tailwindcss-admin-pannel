import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { FormikBag } from 'formik';
import { withFormik } from 'formik';
import WithApp from 'app/hocs/withApp';
import MessengerAction from 'app/store/redux/MessengerRedux';
import AddLocationView from './AddMessenger.view';
import { mapPropsToValues, validationSchema } from './AddMessenger.form.config';
import handlers from './AddMessenger.handler';
import { IValues } from './AddMessenger.type';

const mapStateToProps = (state: any) => ({
  isLoading: state?.messenger?.fetching,
});
const mapPropsToDispatch = (dispatch: any) => ({
  sendMessenger: (message: string) =>
    dispatch(MessengerAction.createMessengerRequest(message)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { SEND_MESSENGER } = formikBag?.props;
    SEND_MESSENGER(values);
    formikBag?.resetForm({});
  },
  enableReinitialize: true,
};

const enhancer = compose<any, any>(
  WithApp,
  connect(mapStateToProps, mapPropsToDispatch),
  withHandlers(handlers),
  // @ts-ignore
  withFormik(formikConfig)
);

export default enhancer(AddLocationView);
