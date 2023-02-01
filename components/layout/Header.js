import { MenuIcon } from '@heroicons/react/solid';
import React from 'react';
import LogOutButton from './header/LogOutButton';
import Notifications from './header/Notifications';
import SearchBox from './header/SearchBox';
import UserMenu from './header/UserMenu';

const Header = ({ mobileNavsidebar, setMobileNavsidebar }) => {
  return (
    <header className="flex justify-center items-center h-20 px-6 sm:px-10 bg-white">

      <MenuIcon className='h-12 stroke-slate-600 cursor-pointer sm:hidden' onClick={() => setMobileNavsidebar(!mobileNavsidebar)} />
      {/*<SearchBox />*/}

      <div className='ml-10 md:ml-0 flex justify-center items-center'>
        <img className='md:hidden w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png" />
        <div className=''>
          <p className="font-semibold md:text-2xl md:tracking-wide">Intranet - Escola Modelar Cambaúba</p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center ml-auto">
        {/*<UserMenu />*/}
        <div className="border-l pl-3 ml-3 space-x-1">

          {/*<Notifications />*/}
          <LogOutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;