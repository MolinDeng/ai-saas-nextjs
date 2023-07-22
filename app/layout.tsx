import './globals.css';
import { Poppins } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
