import Logo from '@/assets/logo/Logo';
import NavbarSwitch from '@/elements/NavbarSwitch';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-background  border-b-[1px] border-disabled shadow-sm flex justify-between px-4">

          <Logo className="w-16 h-12" color='var(--foreground)' />

          <div className='flex items-center justify-center '>
            <NavbarSwitch classname={'mt-2'} />
          </div>

        </div>
    );
};

export default Navbar;