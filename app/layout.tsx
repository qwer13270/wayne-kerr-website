import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DarkModeProvider } from '@/src/contexts/DarkModeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wayne Kerr Electronics',
  description: 'Leader in LCR Meters and Measurement Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}