import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
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
    <html lang="tr" suppressHydrationWarning>
      <body className="page-light">
        <OrganizationSchema />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
