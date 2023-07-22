import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Jenius AI ｜ Home',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

export default function LandingPage() {
  return (
    <div>
      LandingPage (Unprotected)
      <div>
        <Link href={'/sign-in'}>
          <Button>Login</Button>
        </Link>
        <Link href={'/sign-up'}>
          <Button>Register</Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
