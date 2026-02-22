import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: 'AFA Energy Romania | Independent Technical Due Diligence',
  description: 'Professional technical advisory, ATR analysis, and investment-grade reporting for the Romanian renewable energy market.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
