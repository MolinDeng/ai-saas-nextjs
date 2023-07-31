import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toast';
import { SubDialog } from '@/components/sub-dialog';
import { CrispChat } from '@/components/crisp-chat';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispChat />
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" />
          <SubDialog />
        </body>
      </html>
    </ClerkProvider>
  );
}
