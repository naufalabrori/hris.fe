import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from '@/lib/QueryClientProvider';
import NextTopLoader from 'nextjs-toploader';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'HRIS',
  description: 'Human Resource Information System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <QueryProvider>
          <NextTopLoader />
          {children}
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
