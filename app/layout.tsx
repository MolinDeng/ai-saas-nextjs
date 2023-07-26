import './globals.css';
import { Poppins, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toast';
import { SubDialog } from '@/components/sub-dialog';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster position="top-right" />
          <SubDialog />
        </body>
      </html>
    </ClerkProvider>
  );
}
