import React from 'react';
import { Link } from 'react-router';
import logo from '../../src/assets/logo.webp'

const CharityLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-end gap-2.5'>
        <img className='h-8 w-8 rounded-2xl' src={logo} alt="" />
        <p className='text-3xl -ml-2 font-extrabold'>CharityEx</p>
        </div>
        </Link>
    );
};

export default CharityLogo;