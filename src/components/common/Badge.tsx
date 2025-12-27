import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': variant === 'default',
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80': variant === 'destructive',
                    'text-foreground': variant === 'outline',
                    'border-transparent bg-success text-success-foreground hover:bg-success/80': variant === 'success',
                    'border-transparent bg-warning text-warning-foreground hover:bg-warning/80': variant === 'warning',
                },
                className
            )}
            {...props}
        />
    );
});
Badge.displayName = "Badge";

export { Badge };
