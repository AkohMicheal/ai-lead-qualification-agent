import * as React from 'react';

export type AvatarId = 'white-male' | 'white-female' | 'dark-male' | 'dark-female' | 'friendly-robot';

export interface AvatarOption {
    id: AvatarId;
    name: string;
    role: string;
    description: string;
    component: React.ComponentType<{ className?: string }>;
}

export function WhiteMaleAvatar({ className = 'w-full h-full' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="#EEF2FF" />
            
            {/* Torso & Shirt */}
            <path d="M22 92C22 76 34 68 50 68C66 68 78 76 78 92" fill="#3B82F6" />
            <path d="M42 68L50 78L58 68" fill="#F8FAFC" />
            <path d="M50 78L50 92" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />

            {/* Neck */}
            <rect x="44" y="58" width="12" height="12" rx="3" fill="#F6C8A4" />

            {/* Face */}
            <ellipse cx="50" cy="46" rx="20" ry="22" fill="#FBD6B7" />

            {/* Ears */}
            <circle cx="29" cy="48" r="5" fill="#F6C8A4" />
            <circle cx="71" cy="48" r="5" fill="#F6C8A4" />

            {/* Hair */}
            <path d="M30 40C30 26 38 18 50 18C62 18 70 26 70 38C66 34 60 33 54 34C48 35 44 32 38 34C34 35 32 37 30 40Z" fill="#5C3826" />
            <path d="M28 42C30 36 34 33 38 33" stroke="#422517" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="42" cy="46" rx="2.5" ry="3.5" fill="#1E293B" />
            <ellipse cx="58" cy="46" rx="2.5" ry="3.5" fill="#1E293B" />
            <circle cx="43" cy="45" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="45" r="1" fill="#FFFFFF" />

            {/* Eyebrows */}
            <path d="M38 40C40 39 44 39 46 41" stroke="#5C3826" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 41C56 39 60 39 62 40" stroke="#5C3826" strokeWidth="2" strokeLinecap="round" />

            {/* Nose */}
            <path d="M50 47V51C50 52 48 53 47 53" stroke="#E29D72" strokeWidth="2" strokeLinecap="round" />

            {/* Warm Smile */}
            <path d="M43 55C46 59 54 59 57 55" stroke="#993C1D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Customer Service Headset */}
            <path d="M28 48C28 32 36 24 50 24C64 24 72 32 72 48" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="25" y="44" width="6" height="12" rx="3" fill="#0284C7" />
            <rect x="69" y="44" width="6" height="12" rx="3" fill="#0284C7" />
            <path d="M69 54C69 64 60 68 52 67" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="67" r="3.5" fill="#0284C7" />
        </svg>
    );
}

export function WhiteFemaleAvatar({ className = 'w-full h-full' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="#FDF2F8" />

            {/* Hair Back */}
            <path d="M26 44C26 62 34 76 50 76C66 76 74 62 74 44" fill="#C2410C" />

            {/* Torso & Blazer */}
            <path d="M22 92C22 76 34 68 50 68C66 68 78 76 78 92" fill="#E11D48" />
            <path d="M42 68L50 80L58 68" fill="#FFFFFF" />

            {/* Neck */}
            <rect x="44" y="58" width="12" height="12" rx="3" fill="#FAD1B5" />

            {/* Face */}
            <ellipse cx="50" cy="46" rx="19" ry="21" fill="#FEE2CE" />

            {/* Ears */}
            <circle cx="30" cy="48" r="4.5" fill="#FAD1B5" />
            <circle cx="70" cy="48" r="4.5" fill="#FAD1B5" />

            {/* Hair Front */}
            <path d="M28 42C28 26 36 18 50 18C64 18 72 26 72 42C68 32 60 28 50 28C40 28 32 32 28 42Z" fill="#EA580C" />
            <path d="M30 40C32 48 33 56 36 60" stroke="#C2410C" strokeWidth="4" strokeLinecap="round" />
            <path d="M70 40C68 48 67 56 64 60" stroke="#C2410C" strokeWidth="4" strokeLinecap="round" />

            {/* Eyes & Lashes */}
            <ellipse cx="42" cy="46" rx="2.5" ry="3.5" fill="#1E293B" />
            <ellipse cx="58" cy="46" rx="2.5" ry="3.5" fill="#1E293B" />
            <circle cx="43" cy="45" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="45" r="1" fill="#FFFFFF" />
            <path d="M38 42L40 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M62 42L60 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

            {/* Eyebrows */}
            <path d="M38 40C41 38 44 38 46 40" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M54 40C56 38 59 38 62 40" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round" />

            {/* Cute Cheeks */}
            <circle cx="37" cy="50" r="3" fill="#FDA4AF" opacity="0.6" />
            <circle cx="63" cy="50" r="3" fill="#FDA4AF" opacity="0.6" />

            {/* Smile */}
            <path d="M44 54C47 58 53 58 56 54" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Headset */}
            <path d="M29 48C29 32 37 24 50 24C63 24 71 32 71 48" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <rect x="26" y="44" width="5" height="11" rx="2.5" fill="#E11D48" />
            <rect x="69" y="44" width="5" height="11" rx="2.5" fill="#E11D48" />
            <path d="M29 53C29 63 38 66 46 66" stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="48" cy="66" r="3" fill="#E11D48" />
        </svg>
    );
}

export function DarkMaleAvatar({ className = 'w-full h-full' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="#ECFDF5" />

            {/* Torso & Polo */}
            <path d="M22 92C22 76 34 68 50 68C66 68 78 76 78 92" fill="#059669" />
            <path d="M43 68L50 78L57 68" fill="#F0FDF4" />
            <path d="M50 78V92" stroke="#047857" strokeWidth="2" strokeLinecap="round" />

            {/* Neck */}
            <rect x="44" y="58" width="12" height="12" rx="3" fill="#713F12" />

            {/* Face */}
            <ellipse cx="50" cy="46" rx="20" ry="22" fill="#854D0E" />

            {/* Ears */}
            <circle cx="29" cy="48" r="5" fill="#713F12" />
            <circle cx="71" cy="48" r="5" fill="#713F12" />

            {/* Fade Cut Hair */}
            <path d="M29 42C29 27 36 19 50 19C64 19 71 27 71 42C67 36 61 35 50 35C39 35 33 36 29 42Z" fill="#171717" />
            <path d="M29 36C29 33 32 30 36 29" stroke="#171717" strokeWidth="4" strokeLinecap="round" />
            <path d="M71 36C71 33 68 30 64 29" stroke="#171717" strokeWidth="4" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="42" cy="46" rx="2.5" ry="3.5" fill="#18181B" />
            <ellipse cx="58" cy="46" rx="2.5" ry="3.5" fill="#18181B" />
            <circle cx="43" cy="45" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="45" r="1" fill="#FFFFFF" />

            {/* Eyebrows */}
            <path d="M38 40C41 39 44 39 46 41" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M54 41C56 39 59 39 62 40" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" />

            {/* Warm Wide Smile */}
            <path d="M43 54C46 59 54 59 57 54" stroke="#FEF3C7" strokeWidth="2" fill="#FEF3C7" strokeLinecap="round" />
            <path d="M42 54C46 61 54 61 58 54" stroke="#451A03" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Customer Service Headset */}
            <path d="M28 48C28 32 36 24 50 24C64 24 72 32 72 48" stroke="#18181B" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="25" y="44" width="6" height="12" rx="3" fill="#10B981" />
            <rect x="69" y="44" width="6" height="12" rx="3" fill="#10B981" />
            <path d="M69 54C69 64 60 68 52 67" stroke="#18181B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="67" r="3.5" fill="#10B981" />
        </svg>
    );
}

export function DarkFemaleAvatar({ className = 'w-full h-full' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="#FEF3C7" />

            {/* High Bun / Textured Afro Puffs */}
            <circle cx="50" cy="22" r="16" fill="#18181B" />
            <circle cx="36" cy="28" r="9" fill="#18181B" />
            <circle cx="64" cy="28" r="9" fill="#18181B" />
            <rect x="42" y="27" width="16" height="5" rx="2.5" fill="#F59E0B" />

            {/* Torso & Modern Collar */}
            <path d="M22 92C22 76 34 68 50 68C66 68 78 76 78 92" fill="#D97706" />
            <path d="M42 68L50 80L58 68" fill="#FFFBEB" />

            {/* Neck */}
            <rect x="44" y="58" width="12" height="12" rx="3" fill="#5A2E0E" />

            {/* Face */}
            <ellipse cx="50" cy="48" rx="19" ry="21" fill="#713F12" />

            {/* Ears & Gold Hoops */}
            <circle cx="30" cy="50" r="4.5" fill="#5A2E0E" />
            <circle cx="70" cy="50" r="4.5" fill="#5A2E0E" />
            <circle cx="30" cy="54" r="3.5" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
            <circle cx="70" cy="54" r="3.5" stroke="#F59E0B" strokeWidth="1.5" fill="none" />

            {/* Front Hairline */}
            <path d="M30 44C32 35 40 33 50 33C60 33 68 35 70 44C66 40 58 38 50 38C42 38 34 40 30 44Z" fill="#18181B" />

            {/* Eyes & Lashes */}
            <ellipse cx="42" cy="47" rx="2.5" ry="3.5" fill="#18181B" />
            <ellipse cx="58" cy="47" rx="2.5" ry="3.5" fill="#18181B" />
            <circle cx="43" cy="46" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="46" r="1" fill="#FFFFFF" />
            <path d="M38 43L40 45" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M62 43L60 45" stroke="#18181B" strokeWidth="1.8" strokeLinecap="round" />

            {/* Eyebrows */}
            <path d="M38 41C41 39 44 39 46 41" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 41C56 39 59 39 62 41" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="37" cy="52" r="3" fill="#B45309" opacity="0.6" />
            <circle cx="63" cy="52" r="3" fill="#B45309" opacity="0.6" />

            {/* Warm Bright Smile */}
            <path d="M43 56C46 61 54 61 57 56" stroke="#FEF3C7" strokeWidth="2" fill="#FEF3C7" strokeLinecap="round" />
            <path d="M42 56C46 63 54 63 58 56" stroke="#3D1A04" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Headset */}
            <path d="M29 50C29 34 37 26 50 26C63 26 71 34 71 50" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <rect x="26" y="46" width="5" height="11" rx="2.5" fill="#F59E0B" />
            <rect x="69" y="46" width="5" height="11" rx="2.5" fill="#F59E0B" />
            <path d="M29 55C29 64 38 67 46 67" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="48" cy="67" r="3" fill="#F59E0B" />
        </svg>
    );
}

export function FriendlyRobotAvatar({ className = 'w-full h-full' }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Background circle */}
            <circle cx="50" cy="50" r="48" fill="#F0FDFA" />

            {/* Antenna with Glowing Pulse */}
            <line x1="50" y1="25" x2="50" y2="15" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="13" r="5" fill="#14B8A6" />
            <circle cx="50" cy="13" r="8" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.6" />

            {/* Body Chassis */}
            <path d="M26 92C26 76 36 70 50 70C64 70 74 76 74 92" fill="#0F766E" />
            <rect x="42" y="74" width="16" height="12" rx="4" fill="#115E59" />
            <circle cx="47" cy="80" r="2" fill="#2DD4BF" />
            <circle cx="53" cy="80" r="2" fill="#2DD4BF" />

            {/* Robot Neck */}
            <rect x="45" y="60" width="10" height="11" rx="2" fill="#0D9488" />
            <line x1="45" y1="64" x2="55" y2="64" stroke="#115E59" strokeWidth="1.5" />
            <line x1="45" y1="67" x2="55" y2="67" stroke="#115E59" strokeWidth="1.5" />

            {/* Robot Head (Rounded Screen Shell) */}
            <rect x="25" y="25" width="50" height="38" rx="14" fill="#F8FAFC" stroke="#0D9488" strokeWidth="3" />

            {/* Visor Screen */}
            <rect x="30" y="30" width="40" height="26" rx="9" fill="#0F172A" />

            {/* Friendly Digital Visor Eyes */}
            <path d="M37 42C37 38 43 38 43 42" stroke="#2DD4BF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M57 42C57 38 63 38 63 42" stroke="#2DD4BF" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="40" cy="38" r="1" fill="#5EEAD4" />
            <circle cx="60" cy="38" r="1" fill="#5EEAD4" />

            {/* Cheerful Digital LED Mouth */}
            <path d="M46 49C48 51 52 51 54 49" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />

            {/* Headphone Audio Earpieces */}
            <rect x="21" y="34" width="5" height="18" rx="2.5" fill="#14B8A6" />
            <rect x="74" y="34" width="5" height="18" rx="2.5" fill="#14B8A6" />
            <path d="M23 44C23 27 34 22 50 22C66 22 77 27 77 44" stroke="#0F766E" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
    );
}

export const AVATAR_OPTIONS: AvatarOption[] = [
    {
        id: 'white-male',
        name: 'Alex',
        role: 'Sales Specialist',
        description: 'White Male',
        component: WhiteMaleAvatar,
    },
    {
        id: 'white-female',
        name: 'Sarah',
        role: 'Leasing Advisor',
        description: 'White Female',
        component: WhiteFemaleAvatar,
    },
    {
        id: 'dark-male',
        name: 'Marcus',
        role: 'Senior Consultant',
        description: 'Dark Male',
        component: DarkMaleAvatar,
    },
    {
        id: 'dark-female',
        name: 'Maya',
        role: 'Client Concierge',
        description: 'Dark Female',
        component: DarkFemaleAvatar,
    },
    {
        id: 'friendly-robot',
        name: 'Sparky',
        role: 'AI Concierge Bot',
        description: 'Friendly Robot',
        component: FriendlyRobotAvatar,
    },
];

export function getAvatarComponent(id: AvatarId): React.ComponentType<{ className?: string }> {
    const found = AVATAR_OPTIONS.find((a) => a.id === id);
    return found ? found.component : WhiteMaleAvatar;
}
