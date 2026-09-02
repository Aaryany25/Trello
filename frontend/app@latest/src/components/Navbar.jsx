import { useState } from 'react';
import { Bell, PlusCircle, Kanban, Layers, Users, BarChart3, ChevronDown, Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar({
  boards,
  activeBoardId,
  setActiveBoardId,
  organizations,
  activeOrgId,
  setActiveOrgId,
  viewMode,
  setViewMode,
  onOpenCreateCard,
  onOpenCreateBoard
}) {
  const [boardDropdownOpen, setBoardDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const activeBoard = boards.find((b) => b.id === activeBoardId) || boards[0];
  const activeOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const views = [
    { id: 'board', label: 'Kanban Board', icon: Kanban },
    { id: 'list', label: 'Sprint Backlog', icon: Layers },
    { id: 'analytics', label: 'Team Analytics', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EE] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo + Workspace Selector */}
          <div className="flex items-center gap-6">
            
            {/* Neo-brutalist Trello Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-md flex flex-col items-center justify-center font-black leading-none text-[#2563EB] shadow-[2px_2px_0px_#000000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                <div className="flex tracking-tighter text-[11px] font-black">TR</div>
                <div className="flex tracking-tighter text-[11px] font-black">EL</div>
              </div>
              <span className="font-extrabold text-xl tracking-tight font-sans text-black hidden sm:inline-block">
                Task<span className="text-[#FF5B5B]">Flow</span>
              </span>
            </a>

            {/* Board Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setBoardDropdownOpen(!boardDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000] hover:bg-[#FAF5EE] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="text-neutral-500 font-semibold">{activeOrg?.title}:</span>
                <span className="text-black font-extrabold">{activeBoard?.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-black" />
              </button>

              {/* Dropdown Menu */}
              {boardDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border-2 border-black rounded-md p-2 shadow-[4px_4px_0px_#000000] z-50 text-xs">
                  <div className="px-2 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-500">
                    Switch Board
                  </div>
                  <div className="space-y-1 my-1">
                    {boards.map((board) => (
                      <button
                        key={board.id}
                        onClick={() => {
                          setActiveBoardId(board.id);
                          setBoardDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded font-bold transition-colors text-left ${
                          board.id === activeBoardId
                            ? 'bg-[#FF5B5B] text-white border border-black'
                            : 'hover:bg-[#FAF5EE] text-black'
                        }`}
                      >
                        <span>{board.title}</span>
                        {board.id === activeBoardId && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t-2 border-black/10 mt-2">
                    <button
                      onClick={() => {
                        setBoardDropdownOpen(false);
                        onOpenCreateBoard();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#FAF5EE] hover:bg-black hover:text-white border border-black rounded font-bold text-xs transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Create New Board
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* View Switcher Tabs */}
            <nav className="hidden lg:flex items-center space-x-2 bg-white border-2 border-black p-1 rounded-md shadow-[2px_2px_0px_#000000]">
              {views.map((v) => {
                const Icon = v.icon;
                const isActive = viewMode === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setViewMode(v.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FF5B5B] text-white shadow-[1px_1px_0px_#000000]'
                        : 'text-black hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            
            {/* Create Card Quick Button */}
            <Button
              onClick={onOpenCreateCard}
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#000000]"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center hover:bg-[#FAF5EE] shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-black" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF5B5B] rounded-full border border-black animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border-2 border-black rounded-md p-3 shadow-[4px_4px_0px_#000000] z-50 text-xs text-black">
                  <div className="font-bold border-b-2 border-black pb-2 mb-2 flex items-center justify-between">
                    <span>Sprint Activity</span>
                    <span className="text-[10px] bg-[#FF5B5B] text-white px-1.5 py-0.5 rounded font-bold">3 Updates</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-1.5 bg-[#FAF5EE] border border-black rounded">
                      <p className="font-semibold">Avni moved "Auth API" to Done</p>
                      <p className="text-neutral-500 text-[10px]">15 mins ago</p>
                    </div>
                    <div className="p-1.5 bg-[#FAF5EE] border border-black rounded">
                      <p className="font-semibold">Aryan created "Learn full stack"</p>
                      <p className="text-neutral-500 text-[10px]">2 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-[#93C5FD] flex items-center justify-center shadow-[2px_2px_0px_#000000] cursor-pointer" title="Aryan (Admin)">
              <span className="font-black text-sm select-none">AR</span>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
