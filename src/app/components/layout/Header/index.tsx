import Images from 'app/assets/images';
import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex flex-row justify-between bg-white shadow-sm z-50">
      <div className="px-14 flex items-center justify-center">
        <Link to="/">
          <img src={Images.logo.default} alt="logo" width="130px" />
        </Link>
      </div>
      <TopBar />
    </div>
  );
};

export default Header;
