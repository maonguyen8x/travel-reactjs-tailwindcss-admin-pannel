import React from 'react';
import Modal from 'app/components/ModalForgotPassword';
import { Link } from 'react-router-dom';
import images from 'app/assets/images';
import { t } from 'app/i18n';
import { IProps } from './type';

const ConfirmPasswordModal = (props: IProps) => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    showPopup,
    togglePopup,
    showInput,
    showConfirmCode,
  } = props;

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="">
        <Modal
          isShowModal={showPopup}
          toggle={togglePopup}
          body={
            <div className="container mx-auto pt-20">
              <div className="flex flex-col justify-center items-center text-center ">
                <div className="py-16">
                  <Link to="/">
                    <img
                      className="w-96"
                      src={images.logo.default}
                      alt="logo"
                    />
                  </Link>
                </div>
                {!showInput && (
                  <div className="flex flex-col space-y-5 py-16">
                    <span className="text-4xl font-medium">
                      {t('user.modal.cannot_login_text')}
                    </span>
                    <span className="text-gray-500 leading-relaxed w-3/4">
                      {t('user.modal.link_email')}
                    </span>
                    <input
                      type="email"
                      className="h-16 bg-gray-100 px-3 rounded-xl border-2"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={'Enter your email address'}
                    />
                  </div>
                )}
                {errors?.email && touched?.email && (
                  <div id="feedback">{errors?.email}</div>
                )}

                {showInput && (
                  <div className="flex flex-col space-y-5 p-10">
                    <span className="text-4xl font-medium">
                      {t('user.modal.code_confirm_title')}
                    </span>
                    <p>{t('user.modal.code')}</p>
                    <input
                      type="text"
                      className="h-16 bg-gray-100 px-3 rounded-xl border-2"
                      name="code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t('user.modal.code_placeholder')}
                    />
                    <p>{t('user.modal.password_title')}</p>
                    <input
                      type="text"
                      className="h-16 bg-gray-100 px-3 rounded-xl border-2"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t('user.modal.password')}
                    />
                    <input
                      type="text"
                      className="h-16 bg-gray-100 px-3 rounded-xl border-2"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={t('user.modal.password_confirm')}
                    />
                  </div>
                )}

                <div className="py-16">
                  <button
                    type="button"
                    className="relative bg-blue-400 px-28 py-3 rounded-2xl"
                    onClick={showConfirmCode}
                  >
                    <span className=" text-white flex items-center text-2xl">
                      {'Gửi'}
                      <i className="fas fa-angle-right absolute right-5" />
                    </span>
                  </button>
                </div>
                <div className="absolute bottom-10">
                  {!showInput && (
                    <Link to="">{t('user.modal.account_exist')}</Link>
                  )}
                </div>

                {showInput && (
                  <div className="absolute bottom-10">
                    <Link to="">{t('user.modal.code_exist')}</Link>
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>
    </form>
  );
};

export default ConfirmPasswordModal;
