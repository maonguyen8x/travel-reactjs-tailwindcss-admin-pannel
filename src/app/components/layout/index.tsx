import React, { memo, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthActions from 'app/store/redux/AuthRedux';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, getUserMe, fetching, error, shrink }: any) => {
  useLayoutEffect(() => {
    getUserMe();
  }, []);

  return (
    <div className="bg-white flex flex-wrap w-screen h-screen overflow-hidden">
      <Sidebar />
      <Header />
      <div
        className={`flex flex-1 flex-col p-16 my-20 h-full overflow-y-scroll shadow transition-all duration-500 ease-in-out ${
          !shrink ? 'ml-20' : 'ml-80'
        }`}
      >
        <div className="flex flex-1 flex-col shadow-2xl mb-20">
          {!fetching && !error && children}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  shrink: state?.app?.shrink,
  fetching: state.auth.fetchingGetUserMe,
  error: state.auth.error,
});
const mapPropsToDispatch = (dispatch: any) => ({
  getUserMe: () => dispatch(AuthActions.getUserMeRequest()),
});

const enhancer = compose<any>(connect(mapStateToProps, mapPropsToDispatch));
export default enhancer(
  memo(Layout, (oldProps, newProps) => {
    if (oldProps.fetching !== newProps.fetching && !newProps.fetching) {
      return false;
    }
    if (oldProps.shrink !== newProps.shrink) {
      return false;
    }
    return true;
  })
);
