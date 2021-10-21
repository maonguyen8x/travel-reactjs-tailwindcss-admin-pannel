import React from 'react';
import { IProps } from './type';

const SquareImage = ({ src, children }: IProps) => (
  <div className="w-full padding-top relative">
    <div className="absolute inset-0 flex overflow-hidden rounded-md cursor-pointer">
      <div
        style={{ backgroundImage: `url(${src})` }}
        className="bg-cover flex flex-1 transition-all duration-700 ease-in-out transform hover:scale-125"
      >
        {children && children}
      </div>
    </div>
  </div>
);

export default SquareImage;
