import { useState } from 'react';
import { Search, UserCheck, Sparkles, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';

export default function BoardHero({
  boardTitle,
  searchQuery,
  setSearchQuery,
  assigneeQuery,
  setAssigneeQuery,
  onOpenCreateCard,
  activeTag,
  setActiveTag
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localAssignee, setLocalAssignee] = useState(assigneeQuery);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSearchQuery(localSearch);
    setAssigneeQuery(localAssignee);
  };

  const trendingTags = ['All', 'High Priority', 'Frontend', 'Backend', 'Database', 'UI/UX', 'In Process'];

  return (
    <section className="pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      
      {/* Board Title Header */}
      <div className="inline-block px-3 py-1 bg-white border-2 border-black rounded text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0px_#000000] mb-3">
        ⚡ Active Agile Sprint
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black mb-3">
        {boardTitle || 'Aryan fullstack'}
      </h1>

      <p className="text-xs sm:text-sm text-neutral-800 font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
        Manage issues, track sprint backlogs, and collaborate across workspaces with real-time kanban workflow.
      </p>

      {/* Dual Search & Filter Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
      >
        {/* Task Title Search */}
        <div className="flex-1 relative flex items-center bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000] focus-within:shadow-[4px_4px_0px_#000000] transition-all">
          <Search className="w-5 h-5 text-black absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search Task title, issue, or keyword..."
            className="w-full h-11 pl-11 pr-4 bg-transparent text-xs sm:text-sm font-semibold text-black placeholder:text-neutral-500 focus:outline-none"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch('');
                setSearchQuery('');
              }}
              className="mr-3 text-xs font-bold text-neutral-400 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Assignee Filter */}
        <div className="sm:w-60 relative flex items-center bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000] focus-within:shadow-[4px_4px_0px_#000000] transition-all">
          <UserCheck className="w-5 h-5 text-black absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={localAssignee}
            onChange={(e) => {
              setLocalAssignee(e.target.value);
              setAssigneeQuery(e.target.value);
            }}
            placeholder="Assignee (Aryan, Avni)"
            className="w-full h-11 pl-11 pr-4 bg-transparent text-xs sm:text-sm font-semibold text-black placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        {/* Action Button */}
        <Button
          type="button"
          onClick={onOpenCreateCard}
          variant="primary"
          className="h-11 px-6 text-sm font-bold shadow-[3px_3px_0px_#000000] flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Task</span>
        </Button>
      </form>

      {/* Label Quick Filters */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
        <span className="text-neutral-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5B5B]" />
          Filter by:
        </span>
        {trendingTags.map((tag) => {
          const isSelected = activeTag === tag || (tag === 'All' && !activeTag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag === 'All' ? '' : tag)}
              className={`px-2.5 py-1 rounded border-[1.5px] border-black transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF5B5B] text-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-white text-black hover:bg-[#FAF5EE] shadow-[1.5px_1.5px_0px_#000000]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

    </section>
  );
}
