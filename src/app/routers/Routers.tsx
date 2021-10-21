import React, { memo } from 'react';
import { connect, shallowEqual } from 'react-redux';
import { compose } from 'recompose';
import { Switch, withRouter } from 'react-router-dom';
import Layout from '../components/layout';
import AuthPage from '../pages/auth/AuthPage';
import HomePage from '../pages/private';

interface IProps {
  token: string;
  scopes: string;
  role: string;
}

const Routes = ({ role, scopes, token }: IProps) => {
  return (
    <Switch>
      {!!token ? (
        <Layout>
          <HomePage role={role} scopes={scopes} />
        </Layout>
      ) : (
        <AuthPage />
      )}
    </Switch>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state?.app?.token,
    scopes: state?.auth?.profile?.scopes,
    role: state?.auth?.profile?.roles,
  };
};

const enhancer = compose<any, any>(withRouter, connect(mapStateToProps));

export default enhancer(
  memo(Routes, (oldProps, newProps) =>
    shallowEqual(oldProps.token, newProps.token)
  )
);
