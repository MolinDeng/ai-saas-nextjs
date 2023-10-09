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
      <div className="inline absolute bottom-0 left-0 m-2 text-background">
        By{' '}
        <a
          className="text-yellow-200 underline"
          href="https://molin7.vercel.app/"
          target="_blank"
        >
          @molin
        </a>
        <br />
        View source on{' '}
        <a
          className="text-yellow-200 underline"
          href="https://github.com/MolinDeng/ai-saas-nextjs"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  );
}
