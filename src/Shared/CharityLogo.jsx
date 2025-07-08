import React from 'react';
import { Link } from 'react-router';

const CharityLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-end'>
        <img src="/src/assets/logo.webp" alt="" />
        <p className='text-3xl -ml-2 font-extrabold'>CharityEx</p>
        </div>
        </Link>
    );
};

export default CharityLogo;