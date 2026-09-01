import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does TaskFlow compare to traditional Trello and Jira?',
      a: 'TaskFlow is built ground-up for speed with modern web technologies. Unlike slow legacy tools, it gives you multi-workspace isolation, sprint velocity metrics, sub-issue checklists, and instant keyboard shortcuts with zero page reloads.'
    },
    {
      q: 'Can I invite clients or external stakeholders to specific boards?',
      a: 'Yes! Our granular Role-Based Access Control (RBAC) lets you invite members with specific roles such as Admin, Member, or View-Only Observer so clients can track progress without modifying sprint cards.'
    },
    {
      q: 'Is there a free forever tier?',
      a: 'Absolutely. The Starter Community plan is completely free forever and includes up to 3 workspaces, unlimited boards, unlimited cards, and up to 5 collaborators.'
    },
    {
      q: 'How does multi-workspace organization work?',
      a: 'You can create distinct organizations (e.g. "Acme Corp", "Client Project Alpha") under a single login. Each workspace retains its own members, boards, and access controls.'
    },
    {
      q: 'Can I export our project data and issue logs?',
      a: 'Yes, you can export your boards, cards, checklists, and activity history to JSON or CSV formats at any time.'
    },
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got questions? We have answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Everything you need to know about boards, teams, and billing.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-white font-semibold text-base sm:text-lg hover:text-blue-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-400 bg-blue-500/10' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-400 leading-relaxed border-t border-slate-850 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
