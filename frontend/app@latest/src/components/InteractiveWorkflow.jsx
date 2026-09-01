import { useState } from 'react';
import { 
  Kanban, 
  ListOrdered, 
  CalendarDays, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  SlidersHorizontal,
  FolderGit2
} from 'lucide-react';

export default function InteractiveWorkflow() {
  const [activeTab, setActiveTab] = useState('kanban');

  const tabs = [
    { id: 'kanban', label: 'Kanban Boards', icon: Kanban, desc: 'Agile columns with drag & drop cards' },
    { id: 'list', label: 'Sprint Backlog List', icon: ListOrdered, desc: 'Hierarchical issues with bulk actions' },
    { id: 'timeline', label: 'Timeline & Milestones', icon: CalendarDays, desc: 'Gantt-style release roadmaps' },
    { id: 'analytics', label: 'Sprint Analytics', icon: BarChart3, desc: 'Burn-down charts & team velocity' },
  ];

  return (
    <section id="workflow" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Adaptive Views
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work the way your team thinks.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Switch views seamlessly without losing your board context, assignees, or tags.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-4xl w-full">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 text-left ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`text-[10px] hidden sm:block mt-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* 1. Kanban Tab */}
          {activeTab === 'kanban' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-bold text-white">Board: Q4 Product Launch</h4>
                  <p className="text-xs text-slate-400">18 tasks total • 6 in progress • 8 completed</p>
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold rounded-lg">
                  Real-time Sync Active
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Backlog (3)</span>
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
                      <div className="text-[10px] text-purple-400 font-semibold mb-1">API SPEC</div>
                      REST API Endpoints for Mobile Push Notifications
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
                      <div className="text-[10px] text-amber-400 font-semibold mb-1">SECURITY</div>
                      Audit Organization Invite Expiration Logic
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>In Development (2)</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-blue-500/30 text-xs font-medium text-slate-100 shadow-md">
                      <div className="text-[10px] text-blue-400 font-semibold mb-1">CORE APP</div>
                      OAuth2 Login & Session Management
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1">FRONTEND</div>
                      Smooth Drag-to-Reorder List Components
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-850">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Shipped & Done (4)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 opacity-80">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1">SETUP</div>
                      Tailwind CSS Setup & Design System Tokens
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 opacity-80">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1">DATABASE</div>
                      Organization & Board Mongoose Schemas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. List Tab */}
          {activeTab === 'list' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-slate-200">Sprint Backlog Overview</h4>
                <span className="text-xs text-slate-400">Showing 4 high priority issues</span>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'ISSUE-104', title: 'Add real-time websocket updates for card movements', status: 'In Review', priority: 'High', assignee: 'Alex T.', tag: 'Fullstack' },
                  { id: 'ISSUE-105', title: 'Implement user organization role validation middleware', status: 'In Progress', priority: 'Critical', assignee: 'Marcus V.', tag: 'Backend' },
                  { id: 'ISSUE-106', title: 'Design responsive tablet & mobile drawer navigation', status: 'Completed', priority: 'Medium', assignee: 'Elena R.', tag: 'Design' },
                  { id: 'ISSUE-107', title: 'Optimize board loading query performance with indexes', status: 'Completed', priority: 'High', assignee: 'David C.', tag: 'Database' }
                ].map(issue => (
                  <div key={issue.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-850 rounded-xl border border-slate-850 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{issue.id}</span>
                      <span className="text-sm font-medium text-slate-200">{issue.title}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{issue.tag}</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        issue.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        issue.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>{issue.status}</span>
                      <span className="text-slate-400">{issue.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-slate-200">Quarterly Roadmap & Milestones</h4>
                <span className="text-xs text-blue-400 font-semibold">Sprint 14: Sep 1 - Sep 14</span>
              </div>
              <div className="space-y-3 pt-2">
                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Phase 1: Multi-Org Authentication & Permissions</span>
                    <span className="text-emerald-400">100% Done</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Phase 2: Real-time Board & Card State Management</span>
                    <span className="text-blue-400">80% In Progress</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-[80%]"></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Phase 3: Public API & Webhook Integrations</span>
                    <span className="text-purple-400">Upcoming Sprint</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full w-[25%]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-slate-200">Sprint 14 Team Velocity & Completion</h4>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +18% velocity increase
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850 text-center">
                  <div className="text-xs text-slate-400 mb-1">Story Points Completed</div>
                  <div className="text-3xl font-extrabold text-white">48 / 52</div>
                  <div className="text-[11px] text-emerald-400 mt-1">92% of sprint goal</div>
                </div>
                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850 text-center">
                  <div className="text-xs text-slate-400 mb-1">Average Resolution Time</div>
                  <div className="text-3xl font-extrabold text-blue-450 text-blue-400">1.4 Days</div>
                  <div className="text-[11px] text-slate-400 mt-1">40% faster than average</div>
                </div>
                <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-850 text-center">
                  <div className="text-xs text-slate-400 mb-1">Active Team Members</div>
                  <div className="text-3xl font-extrabold text-purple-400">12 Engineers</div>
                  <div className="text-[11px] text-slate-400 mt-1">Across 3 squads</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
