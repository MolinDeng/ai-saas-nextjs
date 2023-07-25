import Image from 'next/image';
import React from 'react';

interface EmptyProps {
  label: string;
}

function Empty({ label }: EmptyProps) {
  return (
    <div className="flex pt-10 flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image src="/empty.png" fill alt="Empty" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
}

export default Empty;
