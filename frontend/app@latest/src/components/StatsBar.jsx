import { Layers, Users, Zap, ShieldCheck } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    { label: 'Active Teams & Orgs', value: '45,000+', icon: Users, change: '+24% this month' },
    { label: 'Tasks Shipped Daily', value: '1.2M+', icon: Zap, change: '99.98% reliability' },
    { label: 'Agile Boards Created', value: '380,000+', icon: Layers, change: 'In 140+ countries' },
    { label: 'Uptime SLA Guarantee', value: '99.99%', icon: ShieldCheck, change: 'Enterprise grade' },
  ];

  const companies = [
    'Acme Corp', 'FintechOS', 'CloudScale', 'NextGen AI', 'Starlight Tech', 'Vortex Digital'
  ];

  return (
    <section className="py-12 border-y border-slate-850 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Row */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Powering fast-moving teams at industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mt-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {companies.map((company, index) => (
              <span key={index} className="text-base sm:text-lg font-bold text-slate-300 tracking-wider">
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
