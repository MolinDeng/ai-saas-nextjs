import NaviBoard from '@/components/navi-board';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Onwhiz AI',
  description: 'Onwhiz AI, An One-Stop AI Platform ',
};

export default function DashboardPage() {
  return (
    <div>
      <NaviBoard />
    </div>
  );
}
