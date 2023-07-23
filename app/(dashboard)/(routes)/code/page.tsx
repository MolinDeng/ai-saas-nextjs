import Conversation from '@/components/conversation';
import Heading from '@/components/heading';
import { Code } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Generation - Jenius AI',
  description: 'Jenius AI, An One-Stop AI Platform ',
};

function CodeGenPage() {
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Gnerate code using descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <Conversation
        tips="Simple toggle button using react hooks"
        api="code"
        useMD={true}
      />
    </div>
  );
}

export default CodeGenPage;
