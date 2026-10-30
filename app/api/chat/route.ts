import { google } from '@ai-sdk/google';
import {
    streamText,
    convertToModelMessages,
    createUIMessageStream,
    createUIMessageStreamResponse,
} from 'ai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are a concise, professional real estate lead qualification assistant. 
Your ONLY goal is to guide the user through a strict 4-step qualification process and then route them to a human agent. 

Follow this sequence step-by-step:
Step 1: Ask if they are looking to buy, rent, or sell.
Step 2: Ask for their preferred location and budget range.
Step 3: Ask for their timeline (when they need to move).
Step 4: Ask for their phone number so an agent can contact them to confirm viewings.

Rules:
- Be polite, welcoming, and brief. Do not ask multiple questions at once.
- NEVER repeat a question that has already been asked or answered in the conversation history. Review the previous messages carefully before responding.
- If the assistant has ALREADY asked for their timeline (e.g. "when are you looking to move" or "when do you need to move"), any subsequent user answer MUST be treated as their timeline response; immediately proceed to Step 4 (ask for their phone number). NEVER ask when they are looking to move a second time.
- If the user provides an answer to a step (even if brief, e.g. "immediately", "in 2 months", "now", "next year", "December", "asap"), acknowledge it and IMMEDIATELY move forward to the next step.
- If the user provides details for multiple steps at once (e.g. location, budget, and timeline together), acknowledge both and move directly to the next unanswered step (e.g. Step 4 phone number). Never re-ask for information the user already shared.
- Once you collect the phone number in Step 4, thank them, confirm that an agent will reach out shortly, wish them a great day, and DO NOT ask any further questions.
- Never invent properties or prices.
`;

// Dispatch structured lead data to Make.com webhook
async function triggerMakeWebhook(messages: any[]) {
    try {
        const userText = messages
            .filter((m: any) => m.role === 'user')
            .map((m: any) => getMessageText(m))
            .join(' | ');

        // Detect if user has provided a phone number (10+ digits)
        const hasPhoneNumber = /\b\d{10,}\b/.test(userText);
        const webhookUrl = process.env.MAKE_WEBHOOK_URL;

        if (hasPhoneNumber && webhookUrl) {
            // Non-blocking background fetch to Make.com
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetPhone: '2348100915397',
                    transcript: userText,
                    timestamp: new Date().toISOString(),
                    source: 'Prime Estates AI Chatbot MVP',
                }),
            }).catch((err) => console.error('Webhook fetch failed:', err));
        }
    } catch (err) {
        console.error('Make.com dispatch error:', err);
    }
}

function getMessageText(m: any): string {
    if (!m) return '';
    if (typeof m.content === 'string') return m.content;
    if (Array.isArray(m.parts)) {
        return m.parts
            .map((p: any) => (p && typeof p.text === 'string' ? p.text : ''))
            .filter(Boolean)
            .join(' ');
    }
    return '';
}

// Deterministic conversation-state engine for demo recordings & quota fallback
function getMockResponse(messages: any[]): string {
    const userMessages = messages.filter((m: any) => m.role === 'user');
    const assistantMessages = messages.filter((m: any) => m.role === 'assistant');

    const lastUserText = getMessageText(userMessages[userMessages.length - 1]).toLowerCase();
    const allUserText = userMessages.map((m: any) => getMessageText(m).toLowerCase()).join(' | ');
    const allAssistantText = assistantMessages.map((m: any) => getMessageText(m).toLowerCase()).join(' | ');

    // Check if phone number is provided anywhere (10+ digits or Nigerian mobile format)
    const hasPhone =
        /\b\d{10,}\b/.test(allUserText) ||
        /\b0[789][01]\d{8}\b/.test(allUserText) ||
        allUserText.includes('phone') ||
        allUserText.includes('080') ||
        allUserText.includes('081') ||
        allUserText.includes('090') ||
        allUserText.includes('070');

    // What questions has the assistant already asked in previous turns?
    const askedPhone =
        allAssistantText.includes('phone number') ||
        allAssistantText.includes('share your phone') ||
        allAssistantText.includes('number so an agent');

    const askedTimeline =
        allAssistantText.includes('when are you looking') ||
        allAssistantText.includes('when do you need to move') ||
        allAssistantText.includes('timeline') ||
        allAssistantText.includes('complete this transaction') ||
        allAssistantText.includes('when to move') ||
        allAssistantText.includes('when are you looking to move');

    const askedLocationBudget =
        allAssistantText.includes('location') ||
        allAssistantText.includes('budget');

    // 1. Once phone number is provided or step 4 was already asked, provide final wrap-up
    if (hasPhone || (askedPhone && userMessages.length >= 4)) {
        return "Thank you! Your details have been securely routed to our agent team. An agent will reach out shortly. Have a great day!";
    }

    // 2. CRITICAL FIX: If the assistant ALREADY asked for their timeline,
    // the user's latest response is their timeline. Move forward to Step 4 (Phone Number)!
    if (askedTimeline) {
        return "Understood. Lastly, could you please share your phone number so one of our senior agents can reach out to confirm your viewing schedule?";
    }

    // Check if user provided timeline in current or previous text
    const hasTimeline =
        lastUserText.includes('month') ||
        lastUserText.includes('week') ||
        lastUserText.includes('asap') ||
        lastUserText.includes('soon') ||
        lastUserText.includes('year') ||
        lastUserText.includes('immediately') ||
        lastUserText.includes('now') ||
        lastUserText.includes('december') ||
        lastUserText.includes('january') ||
        lastUserText.includes('february') ||
        lastUserText.includes('march') ||
        lastUserText.includes('april') ||
        lastUserText.includes('may') ||
        lastUserText.includes('june') ||
        lastUserText.includes('july') ||
        lastUserText.includes('august') ||
        lastUserText.includes('september') ||
        lastUserText.includes('october') ||
        lastUserText.includes('november') ||
        lastUserText.includes('days') ||
        lastUserText.includes('tomorrow') ||
        lastUserText.includes('urgent') ||
        lastUserText.includes('flexible');

    // 3. If location and budget were already asked
    if (askedLocationBudget) {
        // If user also already mentioned their timeline in this turn, skip Step 3 and ask for Phone
        if (hasTimeline) {
            return "Understood. Lastly, could you please share your phone number so one of our senior agents can reach out to confirm your viewing schedule?";
        }
        return "That's a great choice. When are you looking to move or complete this transaction?";
    }

    // 4. If user already indicated intent (buy, rent, sell)
    const hasIntent =
        allUserText.includes('buy') ||
        allUserText.includes('rent') ||
        allUserText.includes('sell');

    if (hasIntent) {
        // Check if user also gave location & budget in the same turn
        const hasLocationBudget =
            (lastUserText.includes('million') || lastUserText.includes('₦') || lastUserText.includes('budget') || /\b\d+m\b/.test(lastUserText) || lastUserText.includes('k')) &&
            (lastUserText.includes('lekki') || lastUserText.includes('island') || lastUserText.includes('ikeja') || lastUserText.includes('abuja') || lastUserText.includes('in ') || lastUserText.includes('at '));

        if (hasLocationBudget) {
            if (hasTimeline) {
                return "Understood. Lastly, could you please share your phone number so one of our senior agents can reach out to confirm your viewing schedule?";
            }
            return "That's a great choice. When are you looking to move or complete this transaction?";
        }

        return "Got it! What is your preferred location and budget range?";
    }

    // 5. Default fallback progression based on user turn count
    if (userMessages.length <= 1) return "Are you looking to buy, rent, or sell a property?";
    if (userMessages.length <= 2) return "Got it! What is your preferred location and budget range?";
    if (userMessages.length <= 3) return "That's a great choice. When are you looking to move or complete this transaction?";
    return "Understood. Lastly, could you please share your phone number so one of our senior agents can reach out to confirm your viewing schedule?";
}

function createMockStreamResponse(mockReply: string) {
    const stream = createUIMessageStream({
        execute({ writer }) {
            writer.write({ type: 'start' });
            writer.write({ type: 'text-start', id: 'part-0' });
            writer.write({ type: 'text-delta', id: 'part-0', delta: mockReply });
            writer.write({ type: 'text-end', id: 'part-0' });
            writer.write({ type: 'finish' });
        },
    });

    return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
    let body: any;
    try {
        body = await req.json();
        const { messages = [] } = body;

        // Trigger Make.com webhook in the background when phone number is collected
        void triggerMakeWebhook(messages);

        const mockReply = getMockResponse(messages);

        const url = new URL(req.url);
        const isDemoMode =
            process.env.DEMO_MODE === 'true' ||
            process.env.MOCK_CHAT === 'true' ||
            req.headers.get('x-demo-mode') === 'true' ||
            url.searchParams.get('demo') === 'true' ||
            !process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        // Immediate mock fallback when in demo mode or when API key is missing
        if (isDemoMode) {
            return createMockStreamResponse(mockReply);
        }

        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
            model: google('gemini-3.8-flash'),
            system: SYSTEM_PROMPT,
            messages: modelMessages,
            temperature: 0.2,
            maxRetries: 0,
            abortSignal: AbortSignal.timeout(3500),
        });

        // Intercept stream errors (e.g. 429 Quota Exceeded, timeout) to instantly fall back to mock
        const stream = createUIMessageStream({
            async execute({ writer }) {
                let started = false;
                const writeFallback = () => {
                    if (!started) writer.write({ type: 'start' });
                    writer.write({ type: 'text-start', id: 'part-0' });
                    writer.write({ type: 'text-delta', id: 'part-0', delta: mockReply });
                    writer.write({ type: 'text-end', id: 'part-0' });
                    writer.write({ type: 'finish' });
                };

                try {
                    const reader = result.toUIMessageStream().getReader();
                    let hasText = false;

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        if (value.type === 'start') started = true;

                        if (value.type === 'error' || value.type === 'abort') {
                            if (!hasText) {
                                writeFallback();
                                return;
                            }
                            return;
                        }

                        if (value.type === 'text-delta') hasText = true;
                        writer.write(value);
                    }
                } catch {
                    writeFallback();
                }
            },
        });

        return createUIMessageStreamResponse({ stream });
    } catch (error: any) {
        console.warn('API Quota Exceeded or Failed. Activating Instant Demo Fallback Simulator:', error?.message);

        const messages = body?.messages || [];

        // Trigger webhook even on fallback mock mode during testing
        void triggerMakeWebhook(messages);

        const mockReply = getMockResponse(messages);

        return createMockStreamResponse(mockReply);
    }
}
