import { useState } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  CheckSquare, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Trash2, 
  Tag, 
  User, 
  Flame,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'border-black bg-[#FAF5EE]', badgeColor: 'bg-neutral-800 text-white' },
  { id: 'inProcess', title: 'In Process', color: 'border-black bg-[#FAF5EE]', badgeColor: 'bg-[#2563EB] text-white' },
  { id: 'inReview', title: 'In Review', color: 'border-black bg-[#FAF5EE]', badgeColor: 'bg-[#7C3AED] text-white' },
  { id: 'done', title: 'Done', color: 'border-black bg-[#FAF5EE]', badgeColor: 'bg-[#15803D] text-white' }
];

export default function KanbanBoard({
  cards,
  onCardClick,
  onMoveCard,
  onDeleteCard,
  onQuickAddCard,
  viewMode = 'board'
}) {
  const [quickAddColumn, setQuickAddColumn] = useState(null);
  const [quickTitle, setQuickTitle] = useState('');

  const handleQuickAddSubmit = (columnId, e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onQuickAddCard(columnId, quickTitle.trim());
    setQuickTitle('');
    setQuickAddColumn(null);
  };

  const getPriorityVariant = (priority) => {
    if (priority === 'High') return 'midlevel'; // Crimson
    if (priority === 'Medium') return 'yellow';
    return 'parttime'; // Blue
  };

  const getLabelVariant = (label) => {
    if (label === 'Frontend' || label === 'Full-time') return 'fulltime'; // Teal
    if (label === 'Backend' || label === 'Database') return 'parttime'; // Blue
    if (label === 'UI/UX' || label === 'Design') return 'purple';
    if (label === 'High Priority' || label === 'Urgent') return 'midlevel'; // Crimson
    return 'entry';
  };

  return (
    <div className="flex-1 min-w-0">
      
      {/* Top bar: Total Cards + Active Count Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black font-sans">
            Total Issues & Cards
          </h2>
          <div className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black shadow-[2px_2px_0px_#000000]">
            {cards.length} active tasks
          </div>
        </div>

        {/* Legend */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-neutral-700">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#FF5B5B] border border-black" /> High Priority</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] border border-black" /> In Process</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#15803D] border border-black" /> Done</span>
        </div>

      </div>

      {/* Empty State */}
      {cards.length === 0 && (
        <div className="bg-white border-2 border-black rounded-md p-12 text-center shadow-[4px_4px_0px_#000000]">
          <div className="w-16 h-16 bg-[#FAF5EE] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-[2px_2px_0px_#000000]">
            📋
          </div>
          <h3 className="text-lg font-bold text-black mb-1">No tasks matching filters</h3>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-4 font-semibold">
            Try adjusting search terms or resetting filters in the left sidebar.
          </p>
        </div>
      )}

      {/* KANBAN COLUMNS VIEW */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {COLUMNS.map((column) => {
            const columnCards = cards.filter((c) => c.status === column.id);

            return (
              <div
                key={column.id}
                className="bg-[#FAF5EE] border-2 border-black rounded-md p-4 shadow-[4px_4px_0px_#000000] flex flex-col min-h-[350px]"
              >
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black/10">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm text-black tracking-tight font-sans">
                      {column.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-black border border-black shadow-[1px_1px_0px_#000000] ${column.badgeColor}`}>
                      {columnCards.length}
                    </span>
                  </div>

                  <button
                    onClick={() => setQuickAddColumn(quickAddColumn === column.id ? null : column.id)}
                    className="p-1 rounded bg-white hover:bg-[#FF5B5B] hover:text-white border border-black transition-colors shadow-[1px_1px_0px_#000000] cursor-pointer"
                    title="Add task to this column"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Inline Quick Add Form */}
                {quickAddColumn === column.id && (
                  <form
                    onSubmit={(e) => handleQuickAddSubmit(column.id, e)}
                    className="mb-3 p-2.5 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000] animate-in fade-in"
                  >
                    <input
                      type="text"
                      autoFocus
                      required
                      placeholder="Enter task title..."
                      value={quickTitle}
                      onChange={(e) => setQuickTitle(e.target.value)}
                      className="w-full text-xs font-semibold text-black placeholder:text-neutral-500 focus:outline-none mb-2 bg-transparent"
                    />
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickAddColumn(null)}
                        className="px-2 py-1 text-[11px] font-bold text-neutral-600 hover:text-black"
                      >
                        Cancel
                      </button>
                      <Button type="submit" variant="primary" size="sm" className="h-7 text-xs font-bold px-3">
                        Add
                      </Button>
                    </div>
                  </form>
                )}

                {/* Cards List */}
                <div className="space-y-3 flex-1">
                  {columnCards.map((card) => {
                    const completedChecklist = card.checklist?.filter((item) => item.completed).length || 0;
                    const totalChecklist = card.checklist?.length || 0;

                    return (
                      <div
                        key={card.id}
                        className="bg-white border-2 border-black rounded p-3.5 shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer group relative"
                        onClick={() => onCardClick(card)}
                      >
                        
                        {/* Labels & Priority Row */}
                        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                          <div className="flex flex-wrap items-center gap-1">
                            {card.priority && (
                              <Badge variant={getPriorityVariant(card.priority)}>
                                {card.priority}
                              </Badge>
                            )}
                            {card.labels?.slice(0, 2).map((label, idx) => (
                              <Badge key={idx} variant={getLabelVariant(label)}>
                                {label}
                              </Badge>
                            ))}
                          </div>

                          {/* Delete on hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCard(card.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-rose-100 text-neutral-500 hover:text-rose-600 transition-opacity"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title */}
                        <h4 className="font-extrabold text-sm text-black group-hover:text-[#FF5B5B] transition-colors leading-snug mb-1.5 font-sans">
                          {card.title}
                        </h4>

                        {/* Description preview */}
                        {card.description && (
                          <p className="text-xs text-neutral-600 font-medium line-clamp-2 mb-3 leading-relaxed">
                            {card.description}
                          </p>
                        )}

                        {/* Checklist progress if any */}
                        {totalChecklist > 0 && (
                          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold text-neutral-700 bg-[#FAF5EE] px-2 py-1 rounded border border-black/20">
                            <CheckSquare className="w-3.5 h-3.5 text-[#10B981]" />
                            <span>{completedChecklist}/{totalChecklist} done</span>
                            <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden border border-black/10 ml-1">
                              <div
                                className="h-full bg-[#10B981]"
                                style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Bottom Row: Assignee & Stage Shift Buttons */}
                        <div className="pt-2 border-t border-black/10 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                          
                          {/* Assignee Avatar */}
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full border border-black bg-[#93C5FD] flex items-center justify-center text-[10px] font-black text-black">
                              {card.assignee ? card.assignee.substring(0, 2).toUpperCase() : 'UN'}
                            </div>
                            <span className="text-[11px] font-bold text-neutral-700 truncate max-w-[80px]">
                              {card.assignee || 'Unassigned'}
                            </span>
                          </div>

                          {/* Fast Move Buttons */}
                          <div className="flex items-center gap-1">
                            {column.id !== 'todo' && (
                              <button
                                onClick={() => {
                                  const prevIdx = COLUMNS.findIndex((c) => c.id === column.id) - 1;
                                  if (prevIdx >= 0) onMoveCard(card.id, COLUMNS[prevIdx].id);
                                }}
                                className="p-1 rounded bg-white hover:bg-[#FAF5EE] border border-black shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                                title="Move to previous stage"
                              >
                                <ArrowLeft className="w-3 h-3 text-black" />
                              </button>
                            )}

                            {column.id !== 'done' && (
                              <button
                                onClick={() => {
                                  const nextIdx = COLUMNS.findIndex((c) => c.id === column.id) + 1;
                                  if (nextIdx < COLUMNS.length) onMoveCard(card.id, COLUMNS[nextIdx].id);
                                }}
                                className="p-1 rounded bg-[#FF5B5B] text-white hover:bg-[#ff4646] border border-black shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                                title="Move to next stage"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Bottom Add button */}
                <button
                  onClick={() => setQuickAddColumn(column.id)}
                  className="mt-3 w-full py-1.5 bg-white/70 hover:bg-white border-2 border-dashed border-black/40 hover:border-black rounded text-xs font-bold text-neutral-700 hover:text-black flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add card
                </button>

              </div>
            );
          })}
        </div>
      ) : (
        /* SPRINT BACKLOG LIST VIEW */
        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onCardClick(card)}
              className="bg-[#FAF5EE] border-2 border-black rounded-md p-4 shadow-[4px_4px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full border border-black ${
                  card.status === 'done' ? 'bg-[#15803D]' : card.status === 'inProcess' ? 'bg-[#2563EB]' : 'bg-neutral-400'
                }`} />
                <div>
                  <h4 className="text-base font-bold text-black font-sans hover:text-[#FF5B5B] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium line-clamp-1">
                    {card.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Badge variant={getPriorityVariant(card.priority)}>{card.priority}</Badge>
                <span className="text-xs font-bold bg-white px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_#000000]">
                  {COLUMNS.find((c) => c.id === card.status)?.title}
                </span>
                <span className="text-xs font-bold text-neutral-700">
                  👤 {card.assignee || 'Unassigned'}
                </span>
                <Button variant="primary" size="sm" className="h-8 text-xs font-bold px-3">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
