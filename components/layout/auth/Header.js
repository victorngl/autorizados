import { MenuIcon } from '@heroicons/react/solid';
import React from 'react';
import LogOutButton from '../header/LogOutButton';
import Notifications from '../header/Notifications';
import SearchBox from '../header/SearchBox';
import UserMenu from '../header/UserMenu';

const Header = ({ mobileNavsidebar, setMobileNavsidebar }) => {
  return (
    <header className="justify-center flex items-center h-20 px-6 sm:px-10 bg-white">
      <div className="flex flex-shrink-0 items-center ">
        <div className='mx-10 flex pt-6 text-center justify-center mb-6 items-center'>
          <img className='w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png" />
          <p className="font-semibold md:text-2xl md:tracking-wide">Intranet - Escola Modelar Cambaúba</p>
        </div>
      </div>
    </header>

    
  );
};

export default Header;