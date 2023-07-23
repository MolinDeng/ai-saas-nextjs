import React from 'react';
import { UserButton } from '@clerk/nextjs';
import SideBarButton from '@/components/sidebar-button';

function NavBar() {
  return (
    <div className="md:hidden flex items-center py-4 px-10">
      <SideBarButton />
      <div className="flex w-full justify-end p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default NavBar;
