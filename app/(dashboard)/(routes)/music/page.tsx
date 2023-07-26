import MusicConversation from '@/components/music-conversation';
import Heading from '@/components/heading';
import { Music2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Generation - Onwhiz AI',
  description: 'Onwhiz AI, An One-Stop AI Platform ',
};

function MusicPage() {
  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn what you think into what you hear."
        icon={Music2}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <MusicConversation tips="Classical guitar solo." />
    </div>
  );
}

export default MusicPage;
