import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer border-2 border-black active:translate-x-[2px] active:translate-y-[2px]',
  {
    variants: {
      variant: {
        default: 'bg-[#FF5B5B] text-white hover:bg-[#ff4646] shadow-[3px_3px_0px_#000000] active:shadow-[1px_1px_0px_#000000]',
        primary: 'bg-[#FF5B5B] text-white hover:bg-[#ff4646] shadow-[3px_3px_0px_#000000] active:shadow-[1px_1px_0px_#000000]',
        secondary: 'bg-[#FAF5EE] text-black hover:bg-white shadow-[3px_3px_0px_#000000] active:shadow-[1px_1px_0px_#000000]',
        outline: 'bg-white text-black hover:bg-[#FAF5EE] shadow-[3px_3px_0px_#000000] active:shadow-[1px_1px_0px_#000000]',
        dark: 'bg-black text-white hover:bg-neutral-800 shadow-[3px_3px_0px_#FF5B5B] active:shadow-[1px_1px_0px_#FF5B5B]',
        ghost: 'border-transparent shadow-none hover:bg-black/5 active:translate-x-0 active:translate-y-0',
        link: 'text-black underline-offset-4 hover:underline border-none shadow-none active:translate-x-0 active:translate-y-0 p-0 h-auto'
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base font-bold',
        icon: 'h-10 w-10 p-0',
        iconSm: 'h-8 w-8 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
