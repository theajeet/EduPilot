
import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed problematic import
// import { GeistMono } from 'geist/font/mono'; // Removed problematic import
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AppShell } from '@/components/AppShell';
import { CustomThemeProvider } from '@/contexts/theme-context';

// const geistSans = GeistSans; // Removed usage
// const geistMono = GeistMono; // Removed usage

export const metadata: Metadata = {
  title: 'EduPilot - Your Learning Companion',
  description: 'Navigate your learning journey with EduPilot.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased"> {/* Removed geistSans.variable and relying on Tailwind's default font-sans */}
        <CustomThemeProvider>
          <SidebarProvider defaultOpen={true}>
            <AppShell>
              {children}
            </AppShell>
          </SidebarProvider>
          <Toaster />
        </CustomThemeProvider>
      </body>
    </html>
  );
}
