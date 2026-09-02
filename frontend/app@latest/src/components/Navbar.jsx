import { useState } from 'react';
import { 
  Bell, 
  PlusCircle, 
  Kanban, 
  Layers, 
  Users, 
  BarChart3, 
  ChevronDown, 
  Check, 
  Building2, 
  LogOut, 
  LogIn, 
  UserCheck, 
  ShieldCheck,
  UserPlus
} from 'lucide-react';
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
  currentUser,
  onOpenCreateCard,
  onOpenCreateBoard,
  onOpenCreateOrg,
  onOpenOrgMembers,
  onLogout,
  onOpenAuthPage
}) {
  const [boardDropdownOpen, setBoardDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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
          
          {/* Left: Brand Logo + Workspace & Board Selector */}
          <div className="flex items-center gap-5 sm:gap-6">
            
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
                <span className="text-neutral-500 font-semibold truncate max-w-[100px] sm:max-w-[130px]">{activeOrg?.title}:</span>
                <span className="text-black font-extrabold truncate max-w-[100px] sm:max-w-[140px]">{activeBoard?.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-black shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {boardDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white border-2 border-black rounded-md p-2.5 shadow-[4px_4px_0px_#000000] z-50 text-xs animate-in fade-in">
                  
                  {/* Org switcher section */}
                  <div className="flex items-center justify-between px-1 mb-1.5 pb-1.5 border-b border-black/10">
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#FF5B5B]" /> Workspace
                    </span>
                    <button
                      onClick={() => {
                        setBoardDropdownOpen(false);
                        onOpenCreateOrg();
                      }}
                      className="text-[10px] font-extrabold text-[#2563EB] hover:underline"
                    >
                      + New Org
                    </button>
                  </div>

                  <div className="space-y-1 mb-3">
                    {organizations.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => {
                          setActiveOrgId(org.id);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs font-bold transition-colors text-left ${
                          org.id === activeOrgId
                            ? 'bg-[#FAF5EE] border border-black text-black'
                            : 'hover:bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        <span className="truncate">{org.title}</span>
                        {org.id === activeOrgId && <span className="text-[10px] bg-[#10B981] text-white px-1.5 py-0.2 rounded font-bold">Active</span>}
                      </button>
                    ))}
                  </div>

                  {/* Boards in this Org */}
                  <div className="px-1 text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                    Boards in {activeOrg?.title}
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
                        <span className="truncate">{board.title}</span>
                        {board.id === activeBoardId && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t-2 border-black/10 mt-2 grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        setBoardDropdownOpen(false);
                        onOpenCreateBoard();
                      }}
                      className="flex items-center justify-center gap-1 py-1.5 bg-[#FAF5EE] hover:bg-black hover:text-white border border-black rounded font-bold text-[11px] transition-colors"
                    >
                      <PlusCircle className="w-3 h-3" />
                      New Board
                    </button>
                    <button
                      onClick={() => {
                        setBoardDropdownOpen(false);
                        onOpenOrgMembers();
                      }}
                      className="flex items-center justify-center gap-1 py-1.5 bg-[#FAF5EE] hover:bg-black hover:text-white border border-black rounded font-bold text-[11px] transition-colors"
                    >
                      <Users className="w-3 h-3" />
                      Members
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
          <div className="flex items-center gap-2.5 sm:gap-3">
            
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

            {/* User Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-[#93C5FD] flex items-center justify-center shadow-[2px_2px_0px_#000000] cursor-pointer hover:rotate-3 transition-transform"
                title={`${currentUser?.name || 'User'} Profile`}
              >
                <span className="font-black text-xs select-none">
                  {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'AR'}
                </span>
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black rounded-md p-3 shadow-[4px_4px_0px_#000000] z-50 text-xs animate-in fade-in text-black">
                  
                  {/* User Profile Details */}
                  <div className="pb-2.5 border-b-2 border-black/10 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-black bg-[#93C5FD] flex items-center justify-center font-black text-xs">
                        {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'AR'}
                      </div>
                      <div>
                        <p className="font-black text-sm">{currentUser?.name || 'Aryan'}</p>
                        <p className="text-[11px] text-neutral-500 font-semibold">@{currentUser?.username || 'aryan'}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] bg-[#FAF5EE] border border-black rounded px-2 py-0.5 font-bold flex items-center justify-between">
                      <span>Org: {activeOrg?.title}</span>
                      <span className="text-[#10B981]">Online</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1 font-bold">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCreateOrg();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-[#FAF5EE] flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      + Add New Organisation
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenOrgMembers();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-[#FAF5EE] flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-[#10B981]" />
                      Manage Org Members
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuthPage();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-[#FAF5EE] flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-neutral-600" />
                      Switch Account / Sign In
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-2 border-t-2 border-black/10 mt-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-2 py-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-black flex items-center justify-between transition-colors cursor-pointer border border-rose-300"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" /> Log Out
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold">POST /logout</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
