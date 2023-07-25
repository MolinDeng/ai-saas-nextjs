import { Menu } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideBar from '@/components/sidebar';
import { cn } from '@/lib/utils';

function SideBarButton({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>
        <div
          className={cn(
            'flex items-center justify-center',
            buttonVariants({ variant: 'ghost', size: 'icon' })
          )}
        >
          <Menu />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="p-0">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default SideBarButton;
