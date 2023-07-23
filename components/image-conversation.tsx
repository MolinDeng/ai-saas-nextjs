'use client';
import { cn, mediaFormSchema } from '@/lib/utils';
import axios from 'axios';
import { ArrowUpCircle, Download, Send } from 'lucide-react';
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
import { toast } from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { amountOptions, resolutionOptions } from '@/lib/constants';
import Image from 'next/image';
import { Card, CardFooter } from '@/components/ui/card';
import { ApiError } from 'next/dist/server/api-utils';

interface ImgConversationProps {
  tips: string;
  api: string;
}

function ImgConversation({ tips, api }: ImgConversationProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const promptForm = useForm<z.infer<typeof mediaFormSchema>>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });
  const isLoading = promptForm.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof mediaFormSchema>) => {
    try {
      setImages([]);
      const response = await axios.post(`/api/${api}`, values);

      if (response.data.name == 'Error')
        throw new ApiError(response.data.status, response.data.message);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);

      promptForm.reset();
    } catch (error) {
      console.log('22222');
      // if (error?.response?.status === 403) {
      //   proModal.onOpen();
      // } else {
      //   toast.error("Something went wrong.");
      // }
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
              <FormItem className="col-span-12 lg:col-span-6">
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
          <FormField
            name="amount"
            control={promptForm.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="resolution"
            control={promptForm.control}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <div className="p-20">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <>
            <p className="mt-10 text-center text-muted-foreground">
              Try "{tips}"
            </p>
            <ArrowUpCircle className="h-10 w-10 mx-auto mt-5 animate-bounce text-muted-foreground" />
            <Empty label="Empty..." />
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImgConversation;
