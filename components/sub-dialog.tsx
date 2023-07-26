'use client';

import axios from 'axios';
import { useState } from 'react';
import { Check, Zap } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSubWindowStore } from '@/hooks/use-sub-window';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/toast';
import { features } from '@/lib/constants';

export const SubDialog = () => {
  const subWindow = useSubWindowStore();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: 'Error',
        message: 'Something went wrong',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={subWindow.isOpen} onOpenChange={subWindow.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Onwhiz
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            Unlimited usage unleashes infinite creativity
          </DialogDescription>
        </DialogHeader>
        <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
          {features.map((ft) => (
            <Card
              key={ft.href}
              className="p-3 border-black/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn('p-2 w-fit rounded-md', ft.bgColor)}>
                  <ft.icon className={cn('w-6 h-6', ft.color)} />
                </div>
                <div className="font-semibold text-sm">{ft.label}</div>
              </div>
              <Check color="purple" className="text-primary w-5 h-5" />
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
