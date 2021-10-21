import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import AppActions from 'app/store/redux/AppRedux';
import { ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { getPathCreateNew } from 'app/utils';
import useOutsideClick from '../../useOutsideClick';
import Images from '../../../../assets/images';
import { IProps } from './type';

const TopBar = ({
  saveToken,
  currentProfile,
  saveLanguage,
  language,
  history,
}: IProps) => {
  const pages = history.location.pathname.split('/')?.[2];

  const [state, setState] = useState({
    lang: false,
    profile: false,
  });

  const { lang, profile } = state;
  const ref = useRef(null);

  const toggleLanguage = () => setState({ profile: false, lang: !lang });
  const toggleProfile = () => setState({ lang: false, profile: !profile });

  useOutsideClick(ref, () => {
    lang &&
      setState({
        ...state,
        lang: false,
      });
    profile &&
      setState({
        ...state,
        profile: false,
      });
  });

  const handleSignout = () => {
    localStorage.clear();
    saveToken(null);
  };

  return (
    <div className="flex flex-row items-center p-3 space-x-5 mr-16" ref={ref}>
      <Link to={getPathCreateNew(pages)}>
        <button className="bg-green-500 rounded-full w-12 h-12 text-white mr-2 flex items-center justify-center ">
          <i className="fas fa-plus text-xl" />
        </button>
      </Link>
      <button
        className="w-12 h-12 rounded-full bg-cover bg-red-400"
        onClick={() => history?.push(ROUTERS.SOS_LIST)}
      >
        <span className="text-base text-white">{'SOS'}</span>
      </button>
      <div className="px-2 relative" onClick={toggleLanguage}>
        <img
          src={language === 'vi' ? Images.vi.default : Images.en.default}
          alt="language"
          className="w-12 h-12 bg-cover"
        />
        {lang && (
          <div className="absolute top-14 -left-14 -right-20 z-10">
            <div className="bg-default rounded-lg space-y-5 py-3">
              <div
                className="flex flex-row justify-center items-center cursor-pointer hover:opacity-90"
                onClick={() => {
                  saveLanguage('vi');
                  setTimeout(() => window.location.reload(), 400);
                }}
              >
                <img
                  className="w-8 h-8 mx-2"
                  src={Images.vi.default}
                  alt="language"
                />
                <span className="text-white"> {t('app.language.vi')} </span>
              </div>
              <div
                className="flex flex-row justify-center items-center cursor-pointer hover:opacity-90"
                onClick={() => {
                  saveLanguage('en');
                  setTimeout(() => window.location.reload(), 400);
                }}
              >
                <img
                  className="w-8 h-8 mx-2"
                  src={Images.en.default}
                  alt="language"
                />
                <span className="text-white"> {t('app.language.en')} </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={toggleProfile}
        className="relative flex items-center space-x-3 px-2 cursor-pointer"
      >
        <img
          className="w-12 h-12 rounded-full bg-cover ring-1"
          src={Images.avatar_defautl.default}
          alt="avatar"
        />
        <span> {currentProfile?.name} </span>
        <i className="fas fa-chevron-down" />
        {profile && (
          <div className="absolute top-14 -left-14 right-0 z-10">
            <div className="bg-default rounded-lg space-y-5 py-3">
              <div
                className="ml-8"
                onClick={() => history?.push(ROUTERS.PROFILE)}
              >
                <i className="option-icon fas fa-user text-white" />
                <span className="text-white hover:text-yellow-300">
                  {' '}
                  {t('app.my_account')}{' '}
                </span>
              </div>
              <div className="ml-8" onClick={() => handleSignout()}>
                <i className="option-icon fas fa-power-off text-white" />
                <span className="text-white hover:text-yellow-300">
                  {' '}
                  {t('app.logout')}{' '}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { profile }, app: { lang } }: any) => {
  return {
    currentProfile: profile,
    language: lang,
  };
};

const mapDispathToProps = (dispatch: any) => ({
  saveToken: (token: string) => dispatch(AppActions.saveToken(token)),
  saveLanguage: (lang: string) => dispatch(AppActions.saveLanguage(lang)),
});

const enhancement = compose<any, any>(
  withRouter,
  connect(mapStateToProps, mapDispathToProps)
);

export default enhancement(TopBar);
