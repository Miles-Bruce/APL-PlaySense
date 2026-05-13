import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FanPulse - Live Cricket Companion',
  description: 'Feel every moment. Live. Second-screen fan engagement platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="w-full min-h-screen bg-[#0D0D0D] max-w-[430px] mx-auto relative overflow-hidden shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
