import { Aperture, Code, MessageCircle, Music2, Youtube } from 'lucide-react';

export const MAX_FREE_COUNTS = 5;
export const amountOptions = [
  {
    value: '1',
    label: '1 Photo',
  },
  {
    value: '2',
    label: '2 Photos',
  },
  {
    value: '3',
    label: '3 Photos',
  },
  {
    value: '4',
    label: '4 Photos',
  },
  {
    value: '5',
    label: '5 Photos',
  },
];

export const resolutionOptions = [
  {
    value: '256x256',
    label: '256x256',
  },
  {
    value: '512x512',
    label: '512x512',
  },
  {
    value: '1024x1024',
    label: '1024x1024',
  },
];

export const features = [
  {
    label: 'Conversation',
    icon: MessageCircle,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music2,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: Aperture,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: Youtube,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
];
