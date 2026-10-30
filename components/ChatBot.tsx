'use client';

import { useChat, type UIMessage } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import {
    Send,
    User,
    X,
    Wrench,
    Settings,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    getAvatarComponent,
    type AvatarId,
} from '@/components/ChatAvatars';
import {
    THEME_PRESETS,
    type ThemeColorId,
} from '@/components/ChatThemes';
import { ChatCustomizer } from '@/components/ChatCustomizer';
import { cn } from '@/lib/utils';

const DEFAULT_TITLE = 'Prime Estates AI Concierge';
const DEFAULT_GREETING =
    'Hi there! Welcome to Prime Estates. To get you to the right agent, are you looking to buy, rent, or sell?';
const DEFAULT_AVATAR: AvatarId = 'friendly-robot';
const DEFAULT_THEME: ThemeColorId = 'emerald';

const QUICK_REPLIES = [
    { label: 'Looking to Buy', text: 'Looking to Buy', icon: '🏠' },
    { label: 'Looking to Rent', text: 'Looking to Rent', icon: '🔑' },
    { label: 'Speak to an Agent', text: 'Speak to an Agent', icon: '📞' },
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
    const [input, setInput] = useState('');
    const [systemError, setSystemError] = useState<string | null>(null);

    // Customization states
    const [headerTitle, setHeaderTitle] = useState(DEFAULT_TITLE);
    const [greetingMessage, setGreetingMessage] = useState(DEFAULT_GREETING);
    const [activeAvatar, setActiveAvatar] = useState<AvatarId>(DEFAULT_AVATAR);
    const [themeColor, setThemeColor] = useState<ThemeColorId>(DEFAULT_THEME);

    const currentTheme = THEME_PRESETS[themeColor] || THEME_PRESETS.emerald;
    const ActiveAvatarComp = getAvatarComponent(activeAvatar);

    const { messages, sendMessage, status } = useChat<UIMessage>({
        messages: [
            {
                id: 'welcome',
                role: 'assistant',
                parts: [
                    {
                        type: 'text',
                        text: DEFAULT_GREETING,
                    },
                ],
            },
        ],
        onError: (err) => {
            console.error('Client Chat Error:', err);
            setSystemError(
                'Our leasing assistant is temporarily undergoing scheduled maintenance. Please try again shortly, or reach out directly to our engineering support team.'
            );
        },
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage({ text: input });
        setInput('');
    };

    const handleQuickReply = (text: string) => {
        if (isLoading) return;
        sendMessage({ text });
    };

    const handleResetDefaults = () => {
        setHeaderTitle(DEFAULT_TITLE);
        setGreetingMessage(DEFAULT_GREETING);
        setActiveAvatar(DEFAULT_AVATAR);
        setThemeColor(DEFAULT_THEME);
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, systemError, isOpen]);

    // Auto-close widget 3 seconds after completion (phone number collected / wrap up)
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
            const text =
                lastMessage.parts
                    ?.map((p: any) => p.text)
                    .join(' ')
                    .toLowerCase() || '';
            if (
                text.includes('great day') ||
                text.includes('reach out shortly') ||
                text.includes('thank you')
            ) {
                const timer = setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
                return () => clearTimeout(timer);
            }
        }
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Expanded Chat Window */}
            {isOpen && (
                <Card className="w-[380px] sm:w-[420px] h-[580px] flex flex-col shadow-2xl border border-border/80 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-300 bg-background overflow-hidden rounded-2xl">
                    {/* Header */}
                    <CardHeader
                        className={cn(
                            'border-b py-3 px-4 flex flex-row items-center justify-between transition-colors duration-300',
                            currentTheme.headerBg
                        )}
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 p-0.5 border border-white/40 shadow-xs">
                                    <ActiveAvatarComp className="w-full h-full" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white ring-1 ring-black/10" />
                            </div>

                            <div className="flex flex-col text-left">
                                <CardTitle className="text-sm font-semibold leading-tight text-white flex items-center gap-1.5">
                                    {headerTitle}
                                </CardTitle>
                                <span className="text-[11px] text-white/80 font-normal">
                                    Live Concierge • Active
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Settings Customization Trigger */}
                            <button
                                type="button"
                                onClick={() => setIsCustomizerOpen(true)}
                                className="h-8 w-8 rounded-full inline-flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                                title="Widget Customization"
                                aria-label="Widget Customization"
                            >
                                <Settings className="w-4 h-4" />
                            </button>

                            {/* Close Window Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-white/90 hover:text-white hover:bg-white/20"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close chat"
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </CardHeader>

                    {/* Chat Messages */}
                    <CardContent className="flex-1 overflow-hidden p-0 relative flex flex-col bg-background">
                        <ScrollArea ref={scrollRef} className="h-full p-4 overflow-y-auto flex-1">
                            <div className="flex flex-col gap-3 pb-4">
                                {messages.map((m) => {
                                    const isWelcome = m.id === 'welcome';

                                    return (
                                        <div
                                            key={m.id}
                                            className={`flex flex-col ${
                                                m.role === 'user' ? 'items-end' : 'items-start'
                                            }`}
                                        >
                                            <div
                                                className={`flex gap-2.5 max-w-[90%] ${
                                                    m.role === 'user' ? 'justify-end' : 'justify-start'
                                                }`}
                                            >
                                                {m.role === 'assistant' && (
                                                    <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden bg-muted border p-0.5 shadow-2xs mt-0.5">
                                                        <ActiveAvatarComp className="w-full h-full" />
                                                    </div>
                                                )}

                                                <div
                                                    className={cn(
                                                        'px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                                                        m.role === 'user'
                                                            ? cn(currentTheme.userBubble, 'rounded-br-xs shadow-xs')
                                                            : 'bg-muted/70 border border-border/60 rounded-bl-xs text-foreground'
                                                    )}
                                                >
                                                    {isWelcome ? (
                                                        <span>{greetingMessage}</span>
                                                    ) : (
                                                        m.parts.map((part, index) => {
                                                            if (part.type === 'text') {
                                                                return <span key={index}>{part.text}</span>;
                                                            }
                                                            return null;
                                                        })
                                                    )}
                                                </div>

                                                {m.role === 'user' && (
                                                    <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                                                        <AvatarFallback className="bg-primary/10 text-foreground text-xs font-semibold">
                                                            <User size={13} />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>

                                            {/* Quick-Reply Chips under the initial greeting message */}
                                            {isWelcome && messages.length === 1 && (
                                                <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5 pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    {QUICK_REPLIES.map((chip) => (
                                                        <button
                                                            key={chip.label}
                                                            type="button"
                                                            disabled={isLoading}
                                                            onClick={() => handleQuickReply(chip.text)}
                                                            className={cn(
                                                                'text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 shadow-2xs font-medium cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                                                                currentTheme.chipClass
                                                            )}
                                                        >
                                                            <span className="text-xs">{chip.icon}</span>
                                                            <span>{chip.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {isLoading && (
                                    <div className="flex gap-2.5 justify-start items-center">
                                        <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden bg-muted border p-0.5 shadow-2xs">
                                            <ActiveAvatarComp className="w-full h-full" />
                                        </div>
                                        <div className="px-3.5 py-2.5 rounded-2xl bg-muted/70 border border-border/60 rounded-bl-xs text-sm flex items-center gap-1 text-muted-foreground">
                                            <span className="animate-pulse">●</span>
                                            <span className="animate-pulse delay-150">●</span>
                                            <span className="animate-pulse delay-300">●</span>
                                        </div>
                                    </div>
                                )}

                                {systemError && (
                                    <div className="mx-2 my-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5 font-semibold">
                                            <Wrench size={13} className="text-amber-600 shrink-0" />
                                            Maintenance Notice
                                        </div>
                                        <p>{systemError}</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>

                    {/* Footer Form */}
                    <CardFooter className="p-3 border-t bg-background">
                        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={systemError ? 'Assistant offline...' : 'Type your response...'}
                                className="flex-1 rounded-full text-xs focus-visible:ring-1"
                                disabled={isLoading || !!systemError}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim() || !!systemError}
                                className={cn(
                                    'rounded-full shrink-0 h-9 w-9 transition-colors shadow-xs',
                                    currentTheme.sendButton
                                )}
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {/* Customization Drawer */}
            <ChatCustomizer
                open={isCustomizerOpen}
                onOpenChange={setIsCustomizerOpen}
                activeAvatar={activeAvatar}
                onSelectAvatar={setActiveAvatar}
                activeTheme={themeColor}
                onSelectTheme={setThemeColor}
                headerTitle={headerTitle}
                onHeaderTitleChange={setHeaderTitle}
                greetingMessage={greetingMessage}
                onGreetingMessageChange={setGreetingMessage}
                onResetDefaults={handleResetDefaults}
            />

            {/* Floating Toggle Button Bubble */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'h-14 w-14 rounded-full shadow-2xl p-0 overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-105 relative border-2 border-white dark:border-slate-800 cursor-pointer',
                    currentTheme.triggerBg,
                    currentTheme.triggerRing
                )}
                size="icon"
                aria-label={isOpen ? 'Close chat' : 'Open concierge chat'}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <div className="w-full h-full p-1.5 flex items-center justify-center">
                        <ActiveAvatarComp className="w-full h-full rounded-full drop-shadow-xs" />
                    </div>
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white font-bold ring-2 ring-white">
                        1
                    </span>
                )}
            </Button>
        </div>
    );
}
