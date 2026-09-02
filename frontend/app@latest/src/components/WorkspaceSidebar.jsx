import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Building2, Kanban, Plus, CheckCircle, BarChart2, Users, UserPlus } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

export default function WorkspaceSidebar({
  organizations,
  activeOrgId,
  setActiveOrgId,
  onOpenCreateOrg,
  onOpenOrgMembers,
  boards,
  activeBoardId,
  setActiveBoardId,
  onOpenCreateBoard,
  selectedStatuses,
  setSelectedStatuses,
  selectedPriorities,
  setSelectedPriorities,
  selectedAssignees,
  setSelectedAssignees,
  onResetFilters,
  hasActiveFilters,
  totalCards,
  completedCards
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const toggleStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const togglePriority = (pri) => {
    if (selectedPriorities.includes(pri)) {
      setSelectedPriorities(selectedPriorities.filter((p) => p !== pri));
    } else {
      setSelectedPriorities([...selectedPriorities, pri]);
    }
  };

  const toggleAssignee = (name) => {
    if (selectedAssignees.includes(name)) {
      setSelectedAssignees(selectedAssignees.filter((a) => a !== name));
    } else {
      setSelectedAssignees([...selectedAssignees, name]);
    }
  };

  const progressPercent = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-[#FAF5EE] border-2 border-black rounded-md p-5 shadow-[4px_4px_0px_#000000]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b-2 border-black mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-black" />
            <h2 className="text-base font-black tracking-tight text-black font-sans">
              Workspaces & Filters
            </h2>
          </div>

          <div className="flex items-center gap-1">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-[11px] font-bold text-[#FF5B5B] hover:underline flex items-center gap-1 mr-1"
                title="Reset Filters"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-white rounded border border-black transition-colors"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4 text-black" /> : <ChevronUp className="w-4 h-4 text-black" />}
            </button>
          </div>
        </div>

        {/* Contents */}
        {!isCollapsed && (
          <div className="space-y-6">
            
            {/* Organisation Selector & Management */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-black">
                  Active Organisation
                </label>
                <button
                  onClick={onOpenCreateOrg}
                  className="text-[11px] font-extrabold text-[#2563EB] hover:underline flex items-center gap-0.5 cursor-pointer"
                  title="Create new organisation"
                >
                  <Plus className="w-3 h-3" /> New Org
                </button>
              </div>

              <div className="relative mb-2">
                <select
                  value={activeOrgId}
                  onChange={(e) => setActiveOrgId(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-white border-2 border-black rounded text-xs font-bold text-black appearance-none focus:outline-none shadow-[2px_2px_0px_#000000] cursor-pointer"
                >
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.title} ({org.dec || 'Workspace'})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-black absolute right-3 top-3 pointer-events-none" />
              </div>

              {/* Org Members Quick link */}
              <button
                onClick={onOpenOrgMembers}
                className="w-full py-1.5 px-2 bg-white hover:bg-[#FFFDF9] border border-black rounded text-[11px] font-bold text-black flex items-center justify-between shadow-[1px_1px_0px_#000000] cursor-pointer transition-all"
              >
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{activeOrg?.members?.length || 1} Team Members</span>
                </span>
                <span className="text-[#2563EB] hover:underline">+ Invite</span>
              </button>
            </div>

            {/* Boards List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-black">
                  Boards
                </label>
                <button
                  onClick={onOpenCreateBoard}
                  className="text-[11px] font-extrabold text-[#2563EB] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              </div>
              <div className="space-y-1.5">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setActiveBoardId(board.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded border text-xs font-bold transition-all text-left ${
                      board.id === activeBoardId
                        ? 'bg-white text-black border-black shadow-[2px_2px_0px_#000000]'
                        : 'bg-transparent text-neutral-700 border-transparent hover:bg-white/60 hover:border-black'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Kanban className="w-3.5 h-3.5 text-black shrink-0" />
                      {board.title}
                    </span>
                    {board.id === activeBoardId && (
                      <span className="w-2 h-2 rounded-full bg-[#FF5B5B] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Status / Stage Checkboxes */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                Workflow Stage
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="st-todo"
                    checked={selectedStatuses.includes('todo')}
                    onChange={() => toggleStatus('todo')}
                  />
                  <label htmlFor="st-todo" className="cursor-pointer select-none">
                    Todo
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="st-inprocess"
                    checked={selectedStatuses.includes('inProcess')}
                    onChange={() => toggleStatus('inProcess')}
                  />
                  <label htmlFor="st-inprocess" className="cursor-pointer select-none">
                    In Process
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="st-review"
                    checked={selectedStatuses.includes('inReview')}
                    onChange={() => toggleStatus('inReview')}
                  />
                  <label htmlFor="st-review" className="cursor-pointer select-none">
                    In Review
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="st-done"
                    checked={selectedStatuses.includes('done')}
                    onChange={() => toggleStatus('done')}
                  />
                  <label htmlFor="st-done" className="cursor-pointer select-none">
                    Done
                  </label>
                </div>

              </div>
            </div>

            {/* Priority Checkboxes */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                Priority
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pri-high"
                    checked={selectedPriorities.includes('High')}
                    onChange={() => togglePriority('High')}
                  />
                  <label htmlFor="pri-high" className="cursor-pointer select-none">
                    High Priority
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pri-med"
                    checked={selectedPriorities.includes('Medium')}
                    onChange={() => togglePriority('Medium')}
                  />
                  <label htmlFor="pri-med" className="cursor-pointer select-none">
                    Medium
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pri-low"
                    checked={selectedPriorities.includes('Low')}
                    onChange={() => togglePriority('Low')}
                  />
                  <label htmlFor="pri-low" className="cursor-pointer select-none">
                    Low
                  </label>
                </div>

              </div>
            </div>

            {/* Assignee Checkboxes */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                Assignee
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="user-aryan"
                    checked={selectedAssignees.includes('Aryan')}
                    onChange={() => toggleAssignee('Aryan')}
                  />
                  <label htmlFor="user-aryan" className="cursor-pointer select-none">
                    Aryan
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="user-avni"
                    checked={selectedAssignees.includes('Avni')}
                    onChange={() => toggleAssignee('Avni')}
                  />
                  <label htmlFor="user-avni" className="cursor-pointer select-none">
                    Avni
                  </label>
                </div>

              </div>
            </div>

            {/* Sprint Progress Widget */}
            <div className="p-3.5 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
              <div className="flex items-center justify-between text-xs font-bold text-black mb-1.5">
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-[#2563EB]" /> Sprint Progress
                </span>
                <span className="font-extrabold text-[#15803D]">{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-[#FAF5EE] border-2 border-black rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] font-semibold text-neutral-600 flex justify-between">
                <span>{completedCards} of {totalCards} tasks completed</span>
                <span>Active</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </aside>
  );
}
