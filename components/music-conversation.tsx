'use client';
import { formSchema } from '@/lib/utils';
import axios from 'axios';
import { ArrowUpCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Empty from '@/components/empty';
import Loader from '@/components/loader';
import { toast } from '@/components/ui/toast';
import { useSubWindowStore } from '@/hooks/use-sub-window';

interface MusicConversationProps {
  tips: string;
}

function MusicConversation({ tips }: MusicConversationProps) {
  const subWindow = useSubWindowStore();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const promptForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const isLoading = promptForm.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/music', values);
      console.log(response);

      setMusic(response.data.audio);

      promptForm.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        subWindow.onOpen();
      } else {
        toast({
          title: 'Error',
          message: 'Something went wrong',
          type: 'error',
        });
      }
    } finally {
      router.refresh(); // update changes/rehydrate all server components
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
                    className=" border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!music && !isLoading && (
          <>
            <p className="mt-10 text-center text-muted-foreground">
              Try "{tips}"
            </p>
            <ArrowUpCircle className="h-10 w-10 mx-auto mt-5 animate-bounce text-muted-foreground" />
            <Empty label="No music generated." />
          </>
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
}

export default MusicConversation;
