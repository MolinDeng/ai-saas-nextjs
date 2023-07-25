import VideoConversation from '@/components/video-conversation';
import Heading from '@/components/heading';
import { Youtube } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Generation - Jenius AI',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

function VideoPage() {
  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn what you think into what you see."
        icon={Youtube}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <VideoConversation tips="Cat running on the floor." />
    </div>
  );
}

export default VideoPage;
