import { useState } from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter Community',
      tagline: 'Perfect for indie hackers, small side-projects & students.',
      price: isAnnual ? '$0' : '$0',
      period: 'forever free',
      popular: false,
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
      features: [
        'Up to 3 Active Workspaces',
        'Unlimited Kanban Boards & Cards',
        'Up to 5 Team Members',
        'Standard Issue & Checklist Tracking',
        'Community Discord Support',
        '250MB File Attachments',
      ],
    },
    {
      name: 'Pro Team',
      tagline: 'For fast-shipping product squads & growing engineering teams.',
      price: isAnnual ? '$12' : '$15',
      period: 'per member / month',
      popular: true,
      buttonText: 'Start 14-Day Free Trial',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30',
      features: [
        'Unlimited Workspaces & Organizations',
        'Unlimited Members & Collaborators',
        'Advanced Sprint Automations & Triggers',
        'Custom Fields & Task Priority Tags',
        'Multi-Org Role-Based Access Control',
        '10GB Cloud Storage per User',
        'Priority 24/7 Email & Chat Support',
      ],
    },
    {
      name: 'Enterprise Scale',
      tagline: 'Dedicated infrastructure, custom SLAs & enterprise governance.',
      price: isAnnual ? '$39' : '$49',
      period: 'per member / month',
      popular: false,
      buttonText: 'Contact Enterprise Sales',
      buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700',
      features: [
        'Everything in Pro Team',
        'Custom SAML SSO & Active Directory',
        'Dedicated Database Instances',
        'Custom SLA Guarantee (99.99%)',
        'Audit Log Compliance & Exports',
        'Dedicated Technical Account Manager',
        'Unlimited Storage & Custom Integrations',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Zap className="w-3.5 h-3.5" />
            Transparent, Predictable Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Plans built to scale with your team.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Start for free, upgrade when your team expands. No hidden charges.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors focus:outline-none"
            >
              <div
                className={`w-5 h-5 bg-blue-500 rounded-full shadow-md transition-transform duration-200 ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annually</span>
              <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-slate-900/90 border-2 border-blue-500/80 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular Squad Choice
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[36px]">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-xs sm:text-sm text-slate-400">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-800 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Included capabilities:
                  </div>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${plan.buttonStyle}`}>
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
