import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="page-light" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
