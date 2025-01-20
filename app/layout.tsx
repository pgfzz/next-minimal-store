import './globals.css';
import { GeistMono } from 'geist/font/mono';
import { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { CartProvider } from '@/components/cart-context';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'NEXYZY',
  description: 'Inspired by yeezy.com, built with Next.js.',
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${GeistMono.className}`}>
          <CartProvider>
            <div className="flex flex-col mx-5 overflow-y-scroll">
              <Header />
              {children}
            </div>
          </CartProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
