import './globals.css';
import { Poppins, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
