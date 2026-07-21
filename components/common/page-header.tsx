import type { ReactNode } from 'react';
import { Reveal } from '@/components/common/reveal';

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Consistent hero header for all subpages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-14 pt-16 md:pb-16 md:pt-24">
      <div className="absolute inset-x-0 -top-20 mx-auto h-40 w-2/3 rounded-full bg-brand/15 blur-[120px]" />
      <div className="container relative flex flex-col items-center text-center">
        <Reveal>
          {eyebrow && (
            <span className="mb-4 inline-flex items-center rounded-full border border-border bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-text-secondary md:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
