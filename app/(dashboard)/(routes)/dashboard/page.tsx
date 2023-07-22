import { Button } from '@/components/ui/button';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jenius AI ｜ Dashboard',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

export default function DashboardPage() {
  return <Button variant={'destructive'}>Click Me</Button>;
}
