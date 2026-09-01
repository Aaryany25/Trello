import { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CtaBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-700 p-8 sm:p-14 lg:p-16 shadow-2xl shadow-blue-600/30 text-white">
          
          {/* Subtle background glow circles */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Join 45,000+ engineers shipping faster today
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to supercharge your agile sprint workflow?
            </h2>

            <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto">
              Create your organization in seconds. No credit card required, start free forever.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-lg animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>You're in! Check your inbox for your instant workspace invite.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-slate-950/80 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-blue-200">
              <span>✓ Free 14-day Pro trial included</span>
              <span>✓ Instant setup in 30 seconds</span>
              <span>✓ No credit card required</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
