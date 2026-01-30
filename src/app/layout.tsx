import type { Metadata } from 'next';
import StoreProvider from '@/components/layout/StoreProvider';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import Navigation from '@/components/layout/Navigation';

export const metadata: Metadata = {
  title: 'Product Dashboard',
  description: 'Next.js + MUI + Redux Product Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeRegistry>
            <Navigation />
            {children}
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
