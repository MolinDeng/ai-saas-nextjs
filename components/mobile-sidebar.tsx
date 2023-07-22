'use client';
import { Menu } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideBar from './sidebar';
import { cn } from '@/lib/utils';

function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger>
        <div
          className={cn(
            'md:hidden flex items-center justify-center',
            buttonVariants({ variant: 'ghost', size: 'icon' })
          )}
        >
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSideBar;
