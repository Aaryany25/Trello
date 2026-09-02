import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full bg-white px-3 py-2 text-sm text-black font-medium border-2 border-black placeholder:text-neutral-500 focus:outline-none focus:bg-[#FFFDF9] disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-[2px_2px_0px_#000000] focus:shadow-[3px_3px_0px_#000000]',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
