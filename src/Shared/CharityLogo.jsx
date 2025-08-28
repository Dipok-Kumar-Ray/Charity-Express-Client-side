import React from 'react';
import { Link } from 'react-router';
import logo from '../../src/assets/logo.webp';

const CharityLogo = () => {
  return (
    <Link to='/'>
      <div className='flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5'>
        {/* Responsive Logo Image */}
        <img
          className='h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-2xl'
          src={logo}
          alt="CharityEx Logo"
        />

        {/* Responsive Text */}
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold'>
          CharityEx
        </p>
      </div>
    </Link>
  );
};

export default CharityLogo;
