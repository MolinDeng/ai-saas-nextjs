import React from 'react';
import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing-navbar';
import { LandingHero } from '@/components/landing-hero';
import { LandingContent } from '@/components/landing-content';

export const metadata: Metadata = {
  title: 'Onwhiz AI',
  description: 'Onwhiz AI, An One-Stop AI Platform ',
};

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
