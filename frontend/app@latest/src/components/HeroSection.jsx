import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Tag, 
  Paperclip, 
  MessageSquare, 
  CheckSquare, 
  Flame, 
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';

const INITIAL_CARDS = [
  {
    id: 'c1',
    column: 'todo',
    title: 'Design Dark Mode Design Tokens',
    tag: 'UI/UX',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    priority: 'High',
    priorityColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    checklist: '3/4',
    comments: 6,
    assignee: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    assigneeName: 'Elena Rostova',
    dueDate: 'Sep 4',
  },
  {
    id: 'c2',
    column: 'todo',
    title: 'Implement JWT Refresh & Org Roles API',
    tag: 'Backend',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    priority: 'Critical',
    priorityColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    checklist: '1/3',
    comments: 12,
    assignee: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    assigneeName: 'Marcus Vance',
    dueDate: 'Sep 5',
  },
  {
    id: 'c3',
    column: 'in-progress',
    title: 'Real-time Card Drag & Drop Animations',
    tag: 'Frontend',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    priority: 'High',
    priorityColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    checklist: '5/5',
    comments: 4,
    assignee: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    assigneeName: 'Sarah Jenkins',
    dueDate: 'Today',
  },
  {
    id: 'c4',
    column: 'in-progress',
    title: 'Workspace Member Invite Modal',
    tag: 'Feature',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    priority: 'Medium',
    priorityColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    checklist: '2/2',
    comments: 2,
    assignee: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces',
    assigneeName: 'Alex Thorne',
    dueDate: 'Sep 6',
  },
  {
    id: 'c5',
    column: 'done',
    title: 'MongoDB Schema Indexes & Performance',
    tag: 'Database',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    priority: 'Low',
    priorityColor: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    checklist: '4/4',
    comments: 8,
    assignee: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    assigneeName: 'David Chen',
    dueDate: 'Done',
  }
];

export default function HeroSection() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [newCardInput, setNewCardInput] = useState('');
  const [addingToCol, setAddingToCol] = useState(null);

  const filterOptions = ['All', 'Frontend', 'Backend', 'UI/UX', 'Feature', 'Database'];

  const filteredCards = activeFilter === 'All' 
    ? cards 
    : cards.filter(c => c.tag.toLowerCase() === activeFilter.toLowerCase());

  const moveCard = (cardId, nextColumn) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        return { ...card, column: nextColumn };
      }
      return card;
    }));
  };

  const handleAddCard = (colId) => {
    if (!newCardInput.trim()) {
      setAddingToCol(null);
      return;
    }
    const newCard = {
      id: 'c_' + Date.now(),
      column: colId,
      title: newCardInput.trim(),
      tag: 'Task',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      priority: 'Medium',
      priorityColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      checklist: '0/1',
      comments: 0,
      assignee: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      assigneeName: 'You',
      dueDate: 'Sep 7',
    };
    setCards(prev => [newCard, ...prev]);
    setNewCardInput('');
    setAddingToCol(null);
  };

  const columns = [
    { id: 'todo', title: 'Sprint Backlog', count: filteredCards.filter(c => c.column === 'todo').length, color: 'border-slate-700/60' },
    { id: 'in-progress', title: 'In Progress', count: filteredCards.filter(c => c.column === 'in-progress').length, color: 'border-blue-500/50' },
    { id: 'done', title: 'Completed', count: filteredCards.filter(c => c.column === 'done').length, color: 'border-emerald-500/50' },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-xs sm:text-sm font-medium text-slate-200 hover:border-blue-400/50 transition-all cursor-pointer group">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 font-semibold">New:</span> 
            <span>Multi-workspace Sprint Boards & Automations</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Organize work, track issues, and ship{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              at lightning speed.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            The modern agile platform designed for software teams. Manage organizations, boards, sprint cycles, and issues with seamless real-time clarity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5 text-blue-200" />
              <span>Start Free - No Card Required</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-base transition-all flex items-center justify-center gap-2.5 shadow-md"
            >
              <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
              <span>Watch 2-Min Product Tour</span>
            </button>
          </div>

          {/* Trust Metrics Pill */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant team invitations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Role-based permissions</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Board Mockup Showcase */}
        <div className="mt-14 relative">
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800/90 p-4 sm:p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
            
            {/* Board Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                  TF
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base sm:text-lg">Engineering Core Workspace</h3>
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                      Sprint 14 Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Try interacting with cards below: filter tags, add cards, or shift columns!</p>
                </div>
              </div>

              {/* Tag Filters */}
              <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 lg:pb-0">
                <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {filterOptions.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      activeFilter === tag
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {columns.map(col => {
                const colCards = filteredCards.filter(c => c.column === col.id);
                return (
                  <div key={col.id} className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 flex flex-col min-h-[380px]">
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <h4 className="font-semibold text-sm text-slate-200">{col.title}</h4>
                        <span className="px-2 py-0.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-full">
                          {col.count}
                        </span>
                      </div>
                      <button 
                        onClick={() => setAddingToCol(col.id)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Add task"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Add Card Input */}
                    {addingToCol === col.id && (
                      <div className="mb-3 p-2.5 bg-slate-900 border border-blue-500/40 rounded-xl space-y-2">
                        <input
                          type="text"
                          autoFocus
                          placeholder="Task title..."
                          value={newCardInput}
                          onChange={(e) => setNewCardInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddCard(col.id);
                            if (e.key === 'Escape') setAddingToCol(null);
                          }}
                          className="w-full bg-slate-950 px-2.5 py-1.5 text-xs text-white rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setAddingToCol(null)}
                            className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleAddCard(col.id)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-md"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Cards List */}
                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
                      {colCards.length === 0 ? (
                        <div className="h-28 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                          No tasks in this column
                        </div>
                      ) : (
                        colCards.map(card => (
                          <div 
                            key={card.id}
                            className="p-3.5 bg-slate-900/90 hover:bg-slate-850 border border-slate-800/90 hover:border-slate-700 rounded-xl shadow-md transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${card.tagColor}`}>
                                {card.tag}
                              </span>
                              <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded border ${card.priorityColor}`}>
                                {card.priority}
                              </span>
                            </div>

                            <p className="text-sm font-medium text-slate-100 leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                              {card.title}
                            </p>

                            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-[11px]">
                                  <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                                  {card.checklist}
                                </span>
                                <span className="flex items-center gap-1 text-[11px]">
                                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                  {card.comments}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <img 
                                  src={card.assignee} 
                                  alt={card.assigneeName} 
                                  title={card.assigneeName}
                                  className="w-5 h-5 rounded-full object-cover border border-slate-700" 
                                />

                                {/* Move Column Buttons for interactivity */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                  {col.id !== 'todo' && (
                                    <button 
                                      onClick={() => moveCard(card.id, col.id === 'done' ? 'in-progress' : 'todo')}
                                      className="px-1 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                                      title="Move Left"
                                    >
                                      ←
                                    </button>
                                  )}
                                  {col.id !== 'done' && (
                                    <button 
                                      onClick={() => moveCard(card.id, col.id === 'todo' ? 'in-progress' : 'done')}
                                      className="px-1 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                                      title="Move Right"
                                    >
                                      →
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Demo Video Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                TaskFlow Interactive Walkthrough
              </h3>
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pulse">
                <Play className="w-8 h-8 fill-blue-400 translate-x-0.5" />
              </div>
              <h4 className="text-white font-semibold">Sprint Workflow in Action</h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Watch how fast teams create workspaces, assign cards, trigger automations, and track progress effortlessly.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
