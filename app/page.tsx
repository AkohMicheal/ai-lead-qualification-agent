import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Automate Your Lead Qualification
          </h1>
          <p className="text-lg text-muted-foreground">
            Watch our AI instantly qualify prospects 24/7, capture requirements,
            and route hot leads directly to your sales team.
          </p>
        </div>

        {/* Render the ChatBot here */}
        <ChatBot />
      </div>
    </main>
  );
}