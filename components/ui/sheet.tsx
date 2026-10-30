'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Backdrop>) {
    return (
        <SheetPrimitive.Backdrop
            className={cn(
                'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300',
                className
            )}
            {...props}
        />
    );
}

interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Popup> {
    side?: 'top' | 'right' | 'bottom' | 'left';
}

function SheetContent({
    side = 'right',
    className,
    children,
    ...props
}: SheetContentProps) {
    const sideVariants = {
        top: 'inset-x-0 top-0 border-b animate-in slide-in-from-top duration-300',
        bottom: 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-300',
        left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r animate-in slide-in-from-left duration-300',
        right: 'inset-y-0 right-0 h-full w-full sm:max-w-sm border-l animate-in slide-in-from-right duration-300',
    };

    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Popup
                className={cn(
                    'fixed z-50 bg-background p-6 shadow-2xl transition ease-in-out',
                    sideVariants[side],
                    className
                )}
                {...props}
            >
                {children}
                <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
            </SheetPrimitive.Popup>
        </SheetPortal>
    );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex flex-col space-y-2 text-left', className)} {...props} />
    );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
    );
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
    return (
        <SheetPrimitive.Title
            className={cn('text-lg font-semibold text-foreground', className)}
            {...props}
        />
    );
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
    return (
        <SheetPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
