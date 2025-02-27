import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    // Create a handler for numeric input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow only if the input is numeric, or special keys (backspace, delete, arrows, etc.)
      if (type === 'number') {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
        const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '.', 'e'];

        // If it's not a control key and not a number/allowed character, prevent it
        if (!allowedKeys.includes(e.key) && !allowedChars.includes(e.key)) {
          e.preventDefault();
        }
      }
    };

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        onKeyDown={type === 'number' ? handleKeyDown : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
