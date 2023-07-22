import NaviBoard from '@/components/naviBoard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Jenius AI',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

export default function DashboardPage() {
  return (
    <div>
      <NaviBoard />
    </div>
  );
}
