import React, { useState, useLayoutEffect, memo } from 'react';
import AppActions from 'app/store/redux/AppRedux';
import { connect } from 'react-redux';
import { IReduxStates } from 'app/store/redux/redux.type';
import { withRouter } from 'react-router-dom';
import { t } from 'app/i18n';
import { USER_ROLES } from 'app/constants/User.constants';
import { compose } from 'recompose';
import { useHistory } from 'react-router-dom';
import { ThemeRouters } from '../../../routers';
import { IProps } from './type';

const Sidebar = ({
  saveToggleSidebar,
  currentMath,
  saveSidebarShrink,
  shrink = false,
  role,
  scopes = '',
  location,
}: IProps) => {
  const [state, setState] = useState({
    isMenu: false,
    isMatch: '',
  });

  const { isMenu, isMatch } = state;
  const locationPath = location?.pathname?.split('/')?.[2];

  const toggle = (items: any) => {
    setState({
      ...state,
      isMenu: !isMenu,
      isMatch: items?.subMenu?.[0]?.match,
    });
    saveToggleSidebar(items?.subMenu?.[0]?.match);
  };

  const onOpen = (items: any) => {
    if (!!items?.path) {
      setState({
        ...state,
        isMenu: !isMenu,
        isMatch: items?.subMenu?.[0]?.match,
      });
      saveToggleSidebar(items?.match);
    }
  };

  const onRoutes = (items: any) => () => {
    !!items?.subMenu ? toggle(items) : onOpen(items);
  };

  useLayoutEffect(() => {
    if (!!isMatch || !!currentMath) {
      setState({
        ...state,
        isMenu: true,
        isMatch: currentMath,
      });
    }
  }, [isMatch, currentMath]);

  const checkPermission = (scopeRequest?: string) => {
    if (role !== USER_ROLES.NORMAL_USER) return true;

    return scopes
      ?.concat(',DASHBOARD')
      ?.split(',')
      ?.includes(scopeRequest || '');
  };

  const history = useHistory();

  function handleClick(items: any) {
    history.push(items.path);
    onRoutes(items);
  }

  return (
    <div className="bg-red-300 relative">
      <div
        className={`absolute top-2/4 ml-2 -mt-40 z-50 shadow transition-all duration-500 ease-in-out rounded-full  ${
          shrink ? 'left-72' : 'left-12'
        }`}
        onClick={() => saveSidebarShrink(!shrink)}
      >
        {!shrink ? (
          <i className="fas fa-angle-double-right text-white text-xl bg-default w-10 h-10 rounded-full flex items-center justify-center ring-2 shadow-2xl" />
        ) : (
          <i className="fas fa-angle-double-left text-white text-xl bg-default w-10 h-10 rounded-full flex items-center justify-center ring-2 shadow-2xl" />
        )}
      </div>
      <div
        className={`fixed top-0 left-0 bottom-0 bg-default z-10 mt-20 shadow transition-all duration-500 ease-in-out ${
          !shrink ? 'w-20 flex' : 'w-80'
        }`}
      >
        <ul className="">
          {ThemeRouters.map((items: any, index: number) => {
            return (
              checkPermission(items.scopes) && (
                <li
                  key={index}
                  onClick={() => handleClick(items)}
                  className={`flex items-center justify-start w-full relative h-24 cursor-pointer text-white text-xl ${
                    locationPath === items?.match && shrink && 'bg-menu-active'
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <i className={items?.icon} />
                  </div>
                  <p
                    className={`transition-all duration-300 ease-in text-xl ${
                      locationPath === items?.match && 'active'
                    } mb-0 ${!shrink ? 'opacity-0' : 'opacity-100'}`}
                  >
                    {t(items?.name)}
                  </p>
                  {locationPath === items?.match && shrink && (
                    <i className="fas fa-circle absolute right-8 text-sm" />
                  )}
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IReduxStates) => ({
  currentMath: state?.app?.match,
  shrink: state?.app?.shrink,
  scopes: state?.auth?.profile?.scopes,
  role: state?.auth?.profile?.roles,
});

const mapDispatchToProps = (dispatch: any) => ({
  saveToggleSidebar: (field: any) =>
    dispatch(AppActions.saveToggleSidebar(field)),
  saveSidebarShrink: (shrink: boolean) =>
    dispatch(AppActions.saveSidebarShrink(shrink)),
});

const enhancer = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
);

export default enhancer(memo(Sidebar));
