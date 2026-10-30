'use client';

import * as React from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    AVATAR_OPTIONS,
    type AvatarId,
} from '@/components/ChatAvatars';
import {
    THEME_PRESETS,
    type ThemeColorId,
} from '@/components/ChatThemes';
import {
    Settings,
    Palette,
    UserCheck,
    MessageSquare,
    Type,
    RotateCcw,
    Check,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatCustomizerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    activeAvatar: AvatarId;
    onSelectAvatar: (avatarId: AvatarId) => void;
    activeTheme: ThemeColorId;
    onSelectTheme: (themeId: ThemeColorId) => void;
    headerTitle: string;
    onHeaderTitleChange: (title: string) => void;
    greetingMessage: string;
    onGreetingMessageChange: (greeting: string) => void;
    onResetDefaults: () => void;
}

export function ChatCustomizer({
    open,
    onOpenChange,
    activeAvatar,
    onSelectAvatar,
    activeTheme,
    onSelectTheme,
    headerTitle,
    onHeaderTitleChange,
    greetingMessage,
    onGreetingMessageChange,
    onResetDefaults,
}: ChatCustomizerProps) {
    const currentTheme = THEME_PRESETS[activeTheme] || THEME_PRESETS.emerald;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-l shadow-2xl"
            >
                {/* Header */}
                <SheetHeader className="p-5 border-b bg-muted/30 shrink-0">
                    <div className="flex items-center gap-2 text-primary font-medium text-xs tracking-wider uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        Live Customizer
                    </div>
                    <SheetTitle className="text-lg font-bold flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Widget Customization
                    </SheetTitle>
                    <SheetDescription className="text-xs text-muted-foreground">
                        Configure your digital concierge branding, persona, and greetings with real-time preview.
                    </SheetDescription>
                </SheetHeader>

                {/* Content Area */}
                <ScrollArea className="flex-1 p-5 overflow-y-auto">
                    <div className="space-y-6 pb-6">
                        {/* Section 1: Avatar Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                    <UserCheck className="w-4 h-4 text-primary" />
                                    Digital Concierge Avatar
                                </Label>
                                <span className="text-[11px] text-muted-foreground">
                                    5 cartoon personas
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {AVATAR_OPTIONS.map((option) => {
                                    const isSelected = activeAvatar === option.id;
                                    const AvatarComp = option.component;

                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => onSelectAvatar(option.id)}
                                            className={cn(
                                                'flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer relative group',
                                                isSelected
                                                    ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary'
                                                    : 'border-border/70 hover:border-primary/50 hover:bg-muted/40'
                                            )}
                                        >
                                            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden bg-muted border p-0.5">
                                                <AvatarComp className="w-full h-full" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                                                    {option.name}
                                                    {isSelected && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                    )}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground truncate">
                                                    {option.description}
                                                </div>
                                                <div className="text-[9px] text-muted-foreground/80 truncate font-mono">
                                                    {option.role}
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <div className="absolute right-2 top-2 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 2: Dynamic Theming */}
                        <div className="space-y-3 pt-2 border-t">
                            <div className="flex items-center justify-between">
                                <Label className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                    <Palette className="w-4 h-4 text-primary" />
                                    Theme Color Preset
                                </Label>
                                <span className="text-[11px] font-medium capitalize text-muted-foreground">
                                    {currentTheme.name}
                                </span>
                            </div>

                            <div className="grid grid-cols-5 gap-2">
                                {(Object.keys(THEME_PRESETS) as ThemeColorId[]).map((themeKey) => {
                                    const preset = THEME_PRESETS[themeKey];
                                    const isSelected = activeTheme === themeKey;

                                    return (
                                        <button
                                            key={themeKey}
                                            type="button"
                                            onClick={() => onSelectTheme(themeKey)}
                                            title={preset.name}
                                            className={cn(
                                                'flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer group',
                                                isSelected
                                                    ? 'border-primary bg-primary/5 shadow-xs ring-2 ring-primary/40'
                                                    : 'border-border/70 hover:border-primary/40 hover:bg-muted/40'
                                            )}
                                        >
                                            <div
                                                className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: preset.hex }}
                                            >
                                                {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                            </div>
                                            <span className="text-[10px] font-medium text-muted-foreground truncate w-full text-center">
                                                {themeKey}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 3: Header Title */}
                        <div className="space-y-2 pt-2 border-t">
                            <Label htmlFor="header-title" className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                <Type className="w-4 h-4 text-primary" />
                                Header Title
                            </Label>
                            <Input
                                id="header-title"
                                value={headerTitle}
                                onChange={(e) => onHeaderTitleChange(e.target.value)}
                                placeholder="e.g., Customer Support"
                                className="text-xs h-9 bg-background"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Appears prominently in the chat header window.
                            </p>
                        </div>

                        {/* Section 4: Custom Greeting Message */}
                        <div className="space-y-2 pt-2 border-t">
                            <Label htmlFor="greeting-message" className="flex items-center gap-2 text-xs font-semibold text-foreground">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                Initial Greeting Message
                            </Label>
                            <textarea
                                id="greeting-message"
                                value={greetingMessage}
                                onChange={(e) => onGreetingMessageChange(e.target.value)}
                                rows={3}
                                placeholder="e.g., Hi! Welcome to Diamond Crest. How can we help?"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                The first message visitors see when opening the chat widget.
                            </p>
                        </div>

                        {/* Section 5: Quick-Reply Action Chips Info */}
                        <div className="space-y-2 pt-2 border-t">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-semibold text-foreground">
                                    Quick-Reply Qualification Chips
                                </Label>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                                    Active
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                <span className={cn('text-[11px] px-2.5 py-1 rounded-full border', currentTheme.chipClass)}>
                                    Looking to Buy
                                </span>
                                <span className={cn('text-[11px] px-2.5 py-1 rounded-full border', currentTheme.chipClass)}>
                                    Looking to Rent
                                </span>
                                <span className={cn('text-[11px] px-2.5 py-1 rounded-full border', currentTheme.chipClass)}>
                                    Speak to an Agent
                                </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">
                                High-converting 1-click prompts displayed directly below the greeting.
                            </p>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer Controls */}
                <SheetFooter className="p-4 border-t bg-muted/20 shrink-0 flex items-center justify-between sm:justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onResetDefaults}
                        className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset Defaults
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className={cn('text-xs font-semibold', currentTheme.sendButton)}
                    >
                        Apply & Close
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
