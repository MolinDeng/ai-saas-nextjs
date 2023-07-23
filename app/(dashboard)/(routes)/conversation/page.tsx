import Conversation from '@/components/conversation';
import Heading from '@/components/heading';
import { MessageSquare } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversation - Jenius AI',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

function ConversationPage() {
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <Conversation
        tips="Who founded OpenAI?"
        api="conversation"
        useMD={false}
      />
    </div>
  );
}

export default ConversationPage;
