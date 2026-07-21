import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Standard page section with generous vertical rhythm. */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="container">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
  className?: string;
}

/** Reusable section header with eyebrow, title and description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mb-14 flex flex-col gap-4',
        centered && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center rounded-full border border-border bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base text-text-secondary md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
