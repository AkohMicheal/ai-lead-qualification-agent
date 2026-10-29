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

Follow this exact sequence. Do not ask multiple questions at once. Wait for the user to answer before moving to the next step.

Step 1: Ask if they are looking to buy, rent, or sell.
Step 2: Ask for their preferred location and budget range.
Step 3: Ask for their timeline (when they need to move).
Step 4: Ask for their phone number so an agent can contact them to confirm viewings.

Rules:
- Be polite, welcoming, and brief.
- If a user goes off-topic, politely decline and steer them back to the current step.
- Once you collect the phone number in Step 4, thank them, confirm that an agent will reach out shortly, wish them a great day, and DO NOT ask any further questions.
- Never invent properties or prices.
`;

// Dispatch structured lead data to Make.com webhook
async function triggerMakeWebhook(messages: any[]) {
    try {
        const userText = messages
            .filter((m: any) => m.role === 'user')
            .map((m: any) => m.parts?.map((p: any) => p.text).join(' '))
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

// Deterministic offline fallback engine for demo recordings when API quota is exhausted
function getMockResponse(userMessage: string, messageCount: number): string {
    const text = userMessage.toLowerCase();

    if (text.includes('buy') || text.includes('rent') || text.includes('sell')) {
        return "Got it! What is your preferred location and budget range?";
    }
    if (text.includes('lekki') || text.includes('island') || text.includes('ikeja') || text.includes('million') || text.includes('budget') || text.includes('₦')) {
        return "That's a great choice. When are you looking to move or complete this transaction?";
    }
    if (text.includes('month') || text.includes('week') || text.includes('asap') || text.includes('soon') || text.includes('year')) {
        return "Understood. Lastly, could you please share your phone number so one of our senior agents can reach out to confirm your viewing schedule?";
    }
    if (/\b\d{10,}\b/.test(text) || text.includes('phone') || text.includes('08')) {
        return "Thank you! Your details have been securely routed to our agent team. An agent will reach out shortly. Have a great day!";
    }

    if (messageCount <= 2) return "Are you looking to buy, rent, or sell a property?";
    if (messageCount <= 4) return "What is your preferred location and budget range?";
    if (messageCount <= 6) return "When are you looking to move?";
    return "Please share your phone number so an agent can contact you.";
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

function extractLastUserText(messages: any[]): string {
    const lastUserMsg = messages?.filter((m: any) => m.role === 'user').pop();
    if (!lastUserMsg) return '';
    if (Array.isArray(lastUserMsg.parts)) {
        return lastUserMsg.parts
            .map((p: any) => (p && typeof p.text === 'string' ? p.text : ''))
            .filter(Boolean)
            .join(' ');
    }
    return typeof lastUserMsg.content === 'string' ? lastUserMsg.content : '';
}

export async function POST(req: Request) {
    let body: any;
    try {
        body = await req.json();
        const { messages = [] } = body;

        // Trigger Make.com webhook in the background when phone number is collected
        void triggerMakeWebhook(messages);

        const userText = extractLastUserText(messages);
        const mockReply = getMockResponse(userText, messages.length);

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
            abortSignal: AbortSignal.timeout(2500),
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

        const userText = extractLastUserText(messages);
        const mockReply = getMockResponse(userText, messages.length);

        return createMockStreamResponse(mockReply);
    }
}
