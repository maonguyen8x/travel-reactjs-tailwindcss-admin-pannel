import { withFormik } from 'formik';
import React, { useState } from 'react';
import AuthActions from 'app/store/redux/AuthRedux';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { getTimeLogged, loggingMultipleChecks } from 'app/utils';
import { KEY_PRESS } from 'app/constants';
import { t } from 'app/i18n';
import ConfirmPasswordModal from 'app/components/ConfirmPassword';
import moment from 'moment';
import { IProps } from './type';
import Images from '../../assets/images';

let lastSubmit: any = 0;

const Login = (props: IProps) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    fetching,
  } = props;

  const [state, setState] = useState({
    showPopup: false,
    showInput: false,
  });

  const { showPopup, showInput } = state;

  const onSubmit = () => {
    loggingMultipleChecks(handleSubmit);
  };

  const onEnter = (e: any) => {
    if (e?.code === KEY_PRESS.ENTER || e?.which === 13) {
      onSubmit();
    }
  };

  const togglePopup = () => {
    setState({
      ...state,
      showPopup: !showPopup,
    });
  };
  const showConfirmCode = () => {
    setState({
      ...state,
      showInput: !showInput,
    });
  };

  return (
    <div className="flex flex-row justify-center items-center space-x-40">
      <video
        autoPlay
        loop
        src={Images.login_animation.default}
        muted
        className="w-30vh h-50vh uto-login"
      >
        <track kind="captions" {...props} />
      </video>

      <div className="relative flex flex-col justify-center items-center">
        <img
          src={Images.form_login.default}
          alt="form"
          className="w-30vh h-50vh"
        />
        <div className="absolute inset-x-5">
          <div className="flex items-center justify-center py-8">
            <img
              src={Images.login_title.default}
              alt="title"
              className="w-56 h-full"
            />
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="">
              <span className="text-2xl px-3 text-white leading-relaxed">
                {'Sign in'}
              </span>
              <input
                autoComplete="off"
                type="email"
                className="w-full p-3 text-xl text-white placeholder-white bg-gray-900 bg-opacity-50 rounded-full border border-white focus:outline-none"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={t('user.modal.email_placeholder')}
                onKeyPress={onEnter}
              />
              {errors.email && touched.email && (
                <div
                  className="text-md text-me text-red-500 px-3"
                  id="feedback"
                >
                  {errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                autoComplete="off"
                type="password"
                className="w-full p-3 text-xl text-white placeholder-white bg-gray-900 bg-opacity-50 rounded-full border border-white focus:outline-none"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder={t('user.modal.password_placeholder')}
                onKeyPress={onEnter}
              />
              {errors.password && touched.password && (
                <div
                  className="text-md text-me text-red-500 px-3"
                  id="feedback"
                >
                  {errors.password}
                </div>
              )}
              <div className="text-right my-1 mx-3">
                <a
                  href="#"
                  className="text-white text-base"
                  onClick={togglePopup}
                >
                  {t('user.login.forgot_password')}
                </a>
              </div>
            </div>

            <div className="text-center">
              <button
                disabled={fetching}
                className="bg-blue-500 px-12 py-2 rounded-full focus:outline-none"
                type="button"
                onClick={onSubmit}
              >
                <span className="text-white">
                  {fetching ? 'Loading...' : 'Login'}
                </span>
              </button>
            </div>
          </form>

          <ConfirmPasswordModal
            showPopup={showPopup}
            togglePopup={togglePopup}
            showInput={showInput}
            showConfirmCode={showConfirmCode}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  fetching: state.auth.fetchingLogin,
});

const mapPropsToDispatch = (dispatch: any) => ({
  login: (account: any) => dispatch(AuthActions.loginRequest(account)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapPropsToDispatch),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({ email: '', password: '' }),
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(16).required(),
    }),
    handleSubmit: async (values: any, { props }: any) => {
      const token = '';
      lastSubmit = lastSubmit + 1;
      const minutes = localStorage.getItem('minutes');
      const getTime = moment().format();
      if (getTimeLogged(minutes)) {
        localStorage.setItem('lastSubmit', '0');
        localStorage.setItem('minutes', getTime);
        lastSubmit = 1;
      } else {
        localStorage.setItem('lastSubmit', lastSubmit);
        localStorage.setItem('minutes', getTime);
      }
      props.login({
        deviceToken: token,
        email: values.email,
        password: values.password,
      });
    },
  })
);
export default enhancer(Login);
