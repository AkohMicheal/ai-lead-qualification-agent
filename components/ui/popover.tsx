'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;
const PopoverPortal = PopoverPrimitive.Portal;

function PopoverContent({
    className,
    align = 'center',
    side = 'bottom',
    sideOffset = 6,
    children,
    ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup> & {
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
}) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Positioner side={side} align={align} sideOffset={sideOffset}>
                <PopoverPrimitive.Popup
                    className={cn(
                        'z-50 w-80 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-2xl outline-none',
                        className
                    )}
                    {...props}
                >
                    {children}
                </PopoverPrimitive.Popup>
            </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
    );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverPortal };
