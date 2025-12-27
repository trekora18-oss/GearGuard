import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
}

export function Dialog({ isOpen, onClose, children, title, description }: DialogProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-all duration-100 animate-in fade-in-0 sm:rounded-lg">
            <div
                className="fixed inset-0"
                onClick={onClose}
                role="presentation" // Better a11y, but aria-hidden="true" was better?
            // aria-hidden="true" makes it ignored by screenreader?
            />
            <div
                className="relative z-50 w-full max-w-lg gap-4 border bg-card p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 sm:rounded-lg"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    {title && <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>

                <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
