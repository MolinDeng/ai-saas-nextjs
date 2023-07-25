'use client';
import { cn, formSchema } from '@/lib/utils';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { ArrowUpCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from '@/lib/openai';
import { useState } from 'react';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

interface ConversationProps {
  tips: string;
  api: string;
  useMD: boolean;
}

function Conversation({ tips, api, useMD }: ConversationProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const promptForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const isLoading = promptForm.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post(`/api/${api}`, {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      promptForm.reset();
    } catch (error) {
      // if (error?.response?.status === 403) {
      //   proModal.onOpen();
      // } else {
      //   toast.error("Something went wrong.");
      // }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="px-4 lg:px-8">
      <Form {...promptForm}>
        <form
          onSubmit={promptForm.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="Send a message"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="col-span-12 lg:col-span-2 w-full"
            disabled={isLoading}
          >
            <Send />
          </Button>
        </form>
      </Form>
      <div className="space-y-4 mt-4 overflow-y-scroll h-[calc(100vh-21rem)] md:h-[calc(100vh-18rem)] lg:h-[calc(100vh-15rem)]">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <>
            <p className="mt-10 text-center text-muted-foreground">
              Try "{tips}"
            </p>
            <ArrowUpCircle className="h-10 w-10 mx-auto mt-5 animate-bounce text-muted-foreground" />
            <Empty label="No conversation started." />
          </>
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={nanoid()} // TODO
              className={cn(
                'p-8 w-full flex items-start gap-x-8 rounded-lg',
                message.role === 'user'
                  ? 'bg-white border border-black/10'
                  : 'bg-muted'
              )}
            >
              {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
              {useMD ? (
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ''}
                </ReactMarkdown>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
