import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] [&_svg]:relative [&_svg]:size-4 [&_svg]:shrink-0 after:pointer-events-none after:absolute after:inset-0 after:content-[''] after:-translate-x-[130%] after:skew-x-[-20deg] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-transform after:duration-700 after:ease-out hover:after:translate-x-[130%]",
  {
    variants: {
      variant: {
        default:
          'border border-white/20 bg-brand/85 text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_30px_-10px_rgba(0,102,255,0.7)] hover:-translate-y-0.5 hover:bg-brand hover:shadow-glow',
        outline:
          'border border-white/15 bg-white/[0.06] text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white/[0.12]',
        ghost:
          'text-text-secondary backdrop-blur-sm hover:bg-white/10 hover:text-white',
        secondary:
          'border border-white/15 bg-white/[0.08] text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white/[0.14]',
        link: 'text-brand underline-offset-4 after:hidden hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-13 px-8 text-base',
        xl: 'h-14 gap-2.5 px-9 text-base [&_svg]:size-5',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
