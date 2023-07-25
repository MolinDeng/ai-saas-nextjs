'use client';

import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import {
  Aperture,
  Code,
  LayoutGrid,
  MessageCircle,
  Music2,
  Cog,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import SubBanner from './sub-banner';

export const poppins600 = Poppins({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutGrid,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageCircle,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: Aperture,
    href: '/image',
    color: 'text-pink-700',
  },
  {
    label: 'Video Generation',
    icon: Youtube,
    href: '/video',
    color: 'text-orange-700',
  },
  {
    label: 'Music Generation',
    icon: Music2,
    href: '/music',
    color: 'text-emerald-700',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    icon: Cog,
    href: '/settings',
  },
];

interface SideBarProps {
  apiLimitCount: number;
  isPro: boolean;
}
function SideBar({ apiLimitCount, isPro }: SideBarProps) {
  const pathname = usePathname();
  return (
    <div className="space-y-1 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href={'/dashboard'} className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/icon.png" />
          </div>
          <h1 className={cn('text-3xl font-bold', poppins600.className)}>
            Jenius
          </h1>
        </Link>
        <div className="space-y-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                pathname === route.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bottom-0 w-full">
        {isPro && <SubBanner apiLimitCount={apiLimitCount} />}
        <div className="hidden md:flex items-center justify-center pt-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
