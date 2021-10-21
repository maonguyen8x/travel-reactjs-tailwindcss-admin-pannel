import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { FormikBag } from 'formik';
import { withFormik } from 'formik';
import WithApp from 'app/hocs/withApp';
import MessengerAction from 'app/store/redux/MessengerRedux';
import AddLocationView from './EditMessenger.view';
import {
  mapPropsToValues,
  validationSchema,
} from './EditMessenger.form.config';
import handlers from './EditMessenger.handler';
import { IValues } from './EditMessenger.type';

const mapStateToProps = (state: any) => ({
  isLoading: state?.messenger?.fetching,
});
const mapPropsToDispatch = (dispatch: any) => ({
  editMessenger: (message: string) =>
    dispatch(MessengerAction.editMessengerRequest(message)),
});

const formikConfig = {
  mapPropsToValues,
  validationSchema,
  handleSubmit: (values: IValues, formikBag: FormikBag<any, IValues>): void => {
    const { EDIT_MESSENGER } = formikBag?.props;
    EDIT_MESSENGER(values);
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
