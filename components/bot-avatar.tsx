import { Avatar, AvatarImage } from '@/components/ui/avatar';

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/icon.png" />
    </Avatar>
  );
};

export default BotAvatar;
