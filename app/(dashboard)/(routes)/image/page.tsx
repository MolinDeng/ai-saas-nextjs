import Heading from '@/components/heading';
import ImgConversation from '@/components/image-conversation';
import { ImageIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Generation - Jenius AI',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

function ImgGenPage() {
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <ImgConversation tips="A picture of a cat on a guitar." api="image" />
    </div>
  );
}

export default ImgGenPage;
