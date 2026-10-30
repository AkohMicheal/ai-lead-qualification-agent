export type ThemeColorId = 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';

export interface ThemePreset {
    id: ThemeColorId;
    name: string;
    description: string;
    hex: string;
    headerBg: string;
    userBubble: string;
    sendButton: string;
    triggerBg: string;
    triggerRing: string;
    chipClass: string;
    accentText: string;
    badgeBg: string;
}

export const THEME_PRESETS: Record<ThemeColorId, ThemePreset> = {
    blue: {
        id: 'blue',
        name: 'Ocean Blue',
        description: 'Professional & Trustworthy',
        hex: '#2563eb',
        headerBg: 'bg-blue-600 text-white',
        userBubble: 'bg-blue-600 text-white',
        sendButton: 'bg-blue-600 hover:bg-blue-700 text-white',
        triggerBg: 'bg-blue-600 hover:bg-blue-700 text-white',
        triggerRing: 'focus-visible:ring-blue-500',
        chipClass:
            'border-blue-200 dark:border-blue-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-blue-700 dark:text-blue-300',
        accentText: 'text-blue-600 dark:text-blue-400',
        badgeBg: 'bg-white/20 text-white border-white/30',
    },
    emerald: {
        id: 'emerald',
        name: 'Emerald Green',
        description: 'Prestige & Natural Luxury',
        hex: '#059669',
        headerBg: 'bg-emerald-600 text-white',
        userBubble: 'bg-emerald-600 text-white',
        sendButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        triggerBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        triggerRing: 'focus-visible:ring-emerald-500',
        chipClass:
            'border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
        accentText: 'text-emerald-600 dark:text-emerald-400',
        badgeBg: 'bg-white/20 text-white border-white/30',
    },
    rose: {
        id: 'rose',
        name: 'Rose Boutique',
        description: 'Warm & High-End Boutique',
        hex: '#e11d48',
        headerBg: 'bg-rose-600 text-white',
        userBubble: 'bg-rose-600 text-white',
        sendButton: 'bg-rose-600 hover:bg-rose-700 text-white',
        triggerBg: 'bg-rose-600 hover:bg-rose-700 text-white',
        triggerRing: 'focus-visible:ring-rose-500',
        chipClass:
            'border-rose-200 dark:border-rose-800 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-rose-700 dark:text-rose-300',
        accentText: 'text-rose-600 dark:text-rose-400',
        badgeBg: 'bg-white/20 text-white border-white/30',
    },
    amber: {
        id: 'amber',
        name: 'Royal Amber',
        description: 'Warm Gold & Prime Estates',
        hex: '#d97706',
        headerBg: 'bg-amber-600 text-white',
        userBubble: 'bg-amber-600 text-white',
        sendButton: 'bg-amber-600 hover:bg-amber-700 text-white',
        triggerBg: 'bg-amber-600 hover:bg-amber-700 text-white',
        triggerRing: 'focus-visible:ring-amber-500',
        chipClass:
            'border-amber-200 dark:border-amber-800 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/60 text-amber-700 dark:text-amber-300',
        accentText: 'text-amber-600 dark:text-amber-400',
        badgeBg: 'bg-white/20 text-white border-white/30',
    },
    slate: {
        id: 'slate',
        name: 'Executive Slate',
        description: 'Modern Minimal & Sleek',
        hex: '#1e293b',
        headerBg: 'bg-slate-900 text-white',
        userBubble: 'bg-slate-900 text-white',
        sendButton: 'bg-slate-900 hover:bg-slate-800 text-white',
        triggerBg: 'bg-slate-900 hover:bg-slate-800 text-white',
        triggerRing: 'focus-visible:ring-slate-500',
        chipClass:
            'border-slate-300 dark:border-slate-700 hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200',
        accentText: 'text-slate-800 dark:text-slate-300',
        badgeBg: 'bg-white/20 text-white border-white/30',
    },
};
