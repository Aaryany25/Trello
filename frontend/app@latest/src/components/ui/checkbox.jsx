import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef(({ className, checked, onChange, id, ...props }, ref) => {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'w-4 h-4 rounded-[2px] border-2 border-black bg-white flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-checked:bg-[#FF5B5B] peer-checked:border-black shadow-[1.5px_1.5px_0px_#000000]',
          className
        )}
      >
        <Check
          className={cn(
            'w-3.5 h-3.5 text-white stroke-[3.5] opacity-0 transition-opacity',
            checked && 'opacity-100'
          )}
        />
      </div>
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

export { Checkbox };
