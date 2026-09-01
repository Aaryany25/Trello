import { 
  LayoutGrid, 
  Building2, 
  CheckCircle, 
  Users2, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: LayoutGrid,
      title: 'Visual Agile Kanban Boards',
      description: 'Create customizable columns, drag-and-drop workflow stages, card priorities, and sprint backlogs tailored to any development cycle.',
      badge: 'Core Engine',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      gradient: 'from-blue-500/10 via-transparent to-transparent'
    },
    {
      icon: Building2,
      title: 'Multi-Workspace & Organizations',
      description: 'Organize teams by company, department, or client project. Keep repositories, boards, and permissions isolated yet easily accessible.',
      badge: 'Multi-Tenancy',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      gradient: 'from-purple-500/10 via-transparent to-transparent'
    },
    {
      icon: CheckCircle,
      title: 'Deep Issue & Task Tracking',
      description: 'Break complex epics into digestible checklists, markdown descriptions, tags, deadlines, and multi-member assignees.',
      badge: 'Sprint Ready',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      gradient: 'from-emerald-500/10 via-transparent to-transparent'
    },
    {
      icon: Users2,
      title: 'Real-time Team Collaboration',
      description: 'Collaborate live with team presence, instant comment threads, @mentions, and instant sync across devices with zero refresh lag.',
      badge: 'Live Sync',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      gradient: 'from-cyan-500/10 via-transparent to-transparent'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Role-Based Access (RBAC)',
      description: 'Granular permissions for Admins, Members, and Observers. Protect critical boards with secure JWT authentication and audit trails.',
      badge: 'Security',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      gradient: 'from-amber-500/10 via-transparent to-transparent'
    },
    {
      icon: Zap,
      title: 'Automations & Instant Triggers',
      description: 'Auto-assign reviewers on status change, auto-archive completed sprint items, and receive notifications right when tasks move.',
      badge: 'Automated',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      gradient: 'from-rose-500/10 via-transparent to-transparent'
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Engineered for Modern Engineering & Product Teams
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Everything your team needs to plan, track, and ship.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Replace fragmented spreadsheets and cluttered tools with an all-in-one agile workspace.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-7 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span>Explore capability</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
