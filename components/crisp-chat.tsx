'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('8359fed1-63fb-45e7-86d2-6fde5a437153');
  }, []);

  return null;
};
