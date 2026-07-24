import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/constants';
import { getContent, getPublicSettings } from '@/lib/content-store';
import { buildThemeCss } from '@/lib/theme';
import { SettingsProvider } from '@/components/providers/settings-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BackgroundEffects } from '@/components/common/background-effects';
import { MouseGlow } from '@/components/common/mouse-glow';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateMetadata(): Metadata {
  const { site } = getPublicSettings();
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    applicationName: SITE.brand,
    keywords: [
      'Minecraft',
      'Community',
      'CLOUDZ',
      'CloudzSociety',
      'Minecraft Server',
      'Gaming',
    ],
    authors: [{ name: SITE.brand }],
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      url: SITE.url,
      siteName: site.name,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/icons/favicon.svg',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#1A2E52',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = getPublicSettings();
  const content = getContent();
  const themeCss = buildThemeCss(settings.theme);

  return (
    <html
      lang="de"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <style
          id="cz-theme"
          dangerouslySetInnerHTML={{ __html: themeCss }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans">
        <SettingsProvider settings={settings} content={content}>
          <BackgroundEffects />
          <MouseGlow />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
