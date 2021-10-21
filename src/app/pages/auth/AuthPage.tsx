import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Images from '../../assets/images';
import Login from './Login';

const AuthPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${Images.background.default})` }}
      className="w-auto h-screen bg-no-repeat bg-cover bg-bottom flex flex-row justify-center items-center"
    >
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default AuthPage;
