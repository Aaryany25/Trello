import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-bold border-[1.5px] border-black transition-colors select-none shadow-[1.5px_1.5px_0px_#000000]',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        fulltime: 'bg-[#0F766E] text-white',      // Teal-green like in image
        entry: 'bg-[#15803D] text-white',         // Green like entry in image
        parttime: 'bg-[#1E40AF] text-white',      // Deep Royal Blue in image
        midlevel: 'bg-[#B91C1C] text-white',      // Crimson/Red-orange in image
        coral: 'bg-[#FF5B5B] text-white',
        yellow: 'bg-[#F59E0B] text-black',
        purple: 'bg-[#7C3AED] text-white',
        counter: 'bg-transparent text-black border-2 border-black shadow-none font-semibold px-3 py-1 text-sm rounded-none',
        outline: 'bg-white text-black border-black shadow-[2px_2px_0px_#000000]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
