'use client';

import { useChat, type UIMessage } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, X, MessageSquare, Wrench } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [systemError, setSystemError] = useState<string | null>(null);

    const { messages, sendMessage, status } = useChat<UIMessage>({
        messages: [
            {
                id: 'welcome',
                role: 'assistant',
                parts: [
                    {
                        type: 'text',
                        text: 'Hi there! Welcome to [Agency Name]. To get you to the right agent, are you looking to buy, rent, or sell?',
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

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, systemError, isOpen]);

    // Auto-close widget 3 seconds after completion (when assistant says have a great day / wraps up)
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
            const text = lastMessage.parts?.map((p: any) => p.text).join(' ').toLowerCase() || '';
            if (text.includes('great day') || text.includes('reach out shortly') || text.includes('thank you')) {
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
                <Card className="w-[380px] sm:w-[420px] h-[560px] flex flex-col shadow-2xl border-muted mb-4 animate-in fade-in slide-in-from-bottom-4 duration-300 bg-background">
                    <CardHeader className="border-b bg-muted/30 py-3 px-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Bot className="w-5 h-5 text-primary" />
                            Prime Estates AI Assistant
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live Agent
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0 relative flex flex-col">
                        <ScrollArea ref={scrollRef} className="h-full p-4 overflow-y-auto flex-1">
                            <div className="flex flex-col gap-3 pb-4">
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                    >
                                        {m.role === 'assistant' && (
                                            <Avatar className="w-7 h-7 shrink-0">
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    <Bot size={14} />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div
                                            className={`px-3.5 py-2 rounded-2xl max-w-[80%] text-sm ${m.role === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                                                    : 'bg-muted/60 border rounded-bl-sm'
                                                }`}
                                        >
                                            {m.parts.map((part, index) => {
                                                if (part.type === 'text') {
                                                    return <span key={index}>{part.text}</span>;
                                                }
                                                return null;
                                            })}
                                        </div>

                                        {m.role === 'user' && (
                                            <Avatar className="w-7 h-7 shrink-0">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    <User size={14} />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 justify-start">
                                        <Avatar className="w-7 h-7 shrink-0">
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                <Bot size={14} />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="px-3.5 py-2 rounded-2xl bg-muted/60 border rounded-bl-sm text-sm flex items-center gap-1">
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

                    <CardFooter className="p-3 border-t bg-background">
                        <form
                            onSubmit={handleSubmit}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={systemError ? "Assistant offline..." : "Type your response..."}
                                className="flex-1 rounded-full text-sm focus-visible:ring-1"
                                disabled={isLoading || !!systemError}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim() || !!systemError}
                                className="rounded-full shrink-0 h-9 w-9"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}

            {/* Floating Toggle Button Bubble */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-transform hover:scale-105 relative"
                size="icon"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white font-bold ring-2 ring-background">
                        1
                    </span>
                )}
            </Button>
        </div>
    );
}