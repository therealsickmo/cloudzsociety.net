import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Logo showText={false} className="scale-150" />
      <p className="mt-8 text-7xl font-extrabold text-gradient-brand md:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-white">Seite nicht gefunden</h1>
      <p className="mt-3 max-w-md text-text-secondary">
        Diese Seite existiert nicht oder wurde verschoben. Vielleicht hast du
        dich in den Wolken verlaufen.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          <Home className="size-4" />
          Zurück zur Startseite
        </Link>
      </Button>
    </div>
  );
}
