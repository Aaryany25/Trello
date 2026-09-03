import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import BoardHero from './components/BoardHero';
import WorkspaceSidebar from './components/WorkspaceSidebar';
import KanbanBoard from './components/KanbanBoard';
import CardDetailModal from './components/CardDetailModal';
import CreateBoardModal from './components/CreateBoardModal';
import CreateCardModal from './components/CreateCardModal';
import CreateOrgModal from './components/CreateOrgModal';
import OrgMembersModal from './components/OrgMembersModal';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

const INITIAL_ORGS = [
  { id: 1, title: "Organization 1", dec: "Main workspace", admin: 1, amin: 1, members: ["Aryan", "Avni"] },
  { id: 2, title: "Organization 2", dec: "Secondary workspace", admin: 2, amin: 2, members: ["Avni"] }
];

const INITIAL_BOARDS = [
  { id: 1, title: "Aryan ", orgId: 1, organistions: 1 },
  { id: 2, title: "Sprint 2 - Core Engine", orgId: 1, organistions: 1 },
  { id: 3, title: "Backend API Roadmap", orgId: 2, organistions: 2 }
];

const INITIAL_CARDS = [
  {
    id: 1,
    board: 1,
    title: "Learn full stack development",
    description: "Cover frontend React with Tailwind, Express REST APIs, JWT authentication, and database schemas.",
    status: "inProcess",
    priority: "High",
    assignee: "Aryan",
    labels: ["Frontend", "Backend"],
    checklist: [
      { text: "Understand React State & Component Lifecycle", completed: true },
      { text: "Build Neo-Brutalist Shadcn UI Components", completed: true },
      { text: "Connect Express & MongoDB / Postgres Backend", completed: false },
      { text: "Deploy production build on cloud", completed: false }
    ],
    comments: [
      { id: 101, author: "Avni", text: "Looks great! Let me know if you need help with the CSS tokens.", time: "1 hour ago" }
    ]
  },
  {
    id: 2,
    board: 1,
    title: "Implement JWT Auth & /logout Endpoint",
    description: "Secure endpoints with Bearer token authentication and user session clearance in Express backend.",
    status: "done",
    priority: "High",
    assignee: "Aryan",
    labels: ["Backend", "High Priority"],
    checklist: [
      { text: "Generate signed JWT tokens upon login", completed: true },
      { text: "Write verifyToken auth middleware", completed: true },
      { text: "Create /logout route and controller handler", completed: true }
    ],
    comments: []
  },
  {
    id: 3,
    board: 1,
    title: "Design Neo-Brutalist UI Primitives",
    description: "Create Button, Badge, Input, Checkbox, Card, and Modal components with retro borders and offset shadows.",
    status: "done",
    priority: "Medium",
    assignee: "Avni",
    labels: ["UI/UX", "Frontend"],
    checklist: [
      { text: "Setup 2px solid black borders and 4px offset shadow", completed: true },
      { text: "Add hover translation and active press mechanics", completed: true }
    ],
    comments: []
  },
  {
    id: 4,
    board: 1,
    title: "Setup Database Relations & Models",
    description: "Define schemas for Users, Organizations, Boards, Columns, and Issues with relational foreign keys.",
    status: "inReview",
    priority: "High",
    assignee: "Aryan",
    labels: ["Database", "Backend"],
    checklist: [
      { text: "Design ER diagram for multi-tenancy", completed: true },
      { text: "Write migrations and seed script", completed: true },
      { text: "Add validation hooks", completed: false }
    ],
    comments: []
  },
  {
    id: 5,
    board: 1,
    title: "Multi-Workspace & Role Switcher",
    description: "Allow switching seamlessly between Organization 1 and Organization 2 with role access control.",
    status: "todo",
    priority: "Medium",
    assignee: "Avni",
    labels: ["Frontend"],
    checklist: [
      { text: "Build workspace dropdown selector", completed: true },
      { text: "Enforce admin permissions for board creation", completed: false }
    ],
    comments: []
  },
  {
    id: 6,
    board: 1,
    title: "Drag & Drop Column Reordering",
    description: "Enhance kanban boards with smooth drag-and-drop card movements and column state persistency.",
    status: "todo",
    priority: "Low",
    assignee: "Aryan",
    labels: ["Frontend", "UI/UX"],
    checklist: [
      { text: "Test touch and desktop pointer events", completed: false }
    ],
    comments: []
  },
  {
    id: 7,
    board: 2,
    title: "Core Performance Profiling",
    description: "Audit bundle size and reduce render latency for large sprint boards.",
    status: "inProcess",
    priority: "High",
    assignee: "Aryan",
    labels: ["Frontend"],
    checklist: [],
    comments: []
  }
];

export default function App() {
  // Auth State
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Aryan",
    username: "aryan",
    token: "jwt-token-initial"
  });
  const [isAuthViewOpen, setIsAuthViewOpen] = useState(false);

  // Organization & Board State
  const [organizations, setOrganizations] = useState(INITIAL_ORGS);
  const [activeOrgId, setActiveOrgId] = useState(1);
  const [boards, setBoards] = useState(INITIAL_BOARDS);
  const [activeBoardId, setActiveBoardId] = useState(1);
  const [cards, setCards] = useState(INITIAL_CARDS);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeQuery, setAssigneeQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Modals
  const [selectedCardForDetail, setSelectedCardForDetail] = useState(null);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [isOrgMembersOpen, setIsOrgMembersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch board automatically if org changes
  const orgBoards = useMemo(() => {
    return boards.filter((b) => b.orgId === activeOrgId || b.organistions === activeOrgId);
  }, [boards, activeOrgId]);

  useEffect(() => {
    if (orgBoards.length > 0 && !orgBoards.some((b) => b.id === activeBoardId)) {
      setActiveBoardId(orgBoards[0].id);
    }
  }, [activeOrgId, orgBoards, activeBoardId]);

  const activeBoard = boards.find((b) => b.id === activeBoardId) || orgBoards[0] || boards[0];
  const activeOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  // Auth Handlers
  const handleLoginSuccess = (userObj, newOrgTitle) => {
    setCurrentUser(userObj);
    setIsAuthViewOpen(false);

    if (newOrgTitle) {
      const newOrg = {
        id: Date.now(),
        title: newOrgTitle,
        dec: "User personal workspace",
        admin: userObj.id,
        amin: userObj.id,
        members: [userObj.name]
      };
      const newBoard = {
        id: Date.now() + 1,
        title: "Sprint 1",
        orgId: newOrg.id,
        organistions: newOrg.id
      };
      setOrganizations([...organizations, newOrg]);
      setBoards([...boards, newBoard]);
      setActiveOrgId(newOrg.id);
      setActiveBoardId(newBoard.id);
    }

    showToast(`Welcome, ${userObj.name}! Logged in successfully.`);
  };

  const handleLogout = () => {
    // Call simulated backend /logout endpoint
    setCurrentUser(null);
    setIsAuthViewOpen(true);
    showToast('Logged out successfully (Endpoint: POST /logout)');
  };

  // Organization Handlers
  const handleOrgCreated = (newOrg, defaultBoard) => {
    setOrganizations([...organizations, newOrg]);
    if (defaultBoard) {
      setBoards([...boards, defaultBoard]);
      setActiveBoardId(defaultBoard.id);
    }
    setActiveOrgId(newOrg.id);
    showToast(`Organisation "${newOrg.title}" created successfully!`);
  };

  const handleAddOrgMember = (orgId, memberName) => {
    setOrganizations(
      organizations.map((org) => {
        if (org.id === orgId) {
          const currentMembers = org.members || [];
          if (!currentMembers.includes(memberName)) {
            return { ...org, members: [...currentMembers, memberName] };
          }
        }
        return org;
      })
    );
    showToast(`Added ${memberName} to ${activeOrg?.title}`);
  };

  // Card Operations
  const handleMoveCard = (cardId, newStatus) => {
    setCards(cards.map((c) => (c.id === cardId ? { ...c, status: newStatus } : c)));
    showToast(`Task moved to ${newStatus === 'inProcess' ? 'In Process' : newStatus === 'inReview' ? 'In Review' : newStatus.toUpperCase()}`);
  };

  const handleUpdateCard = (updatedCard) => {
    setCards(cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
    showToast('Task updated successfully');
  };

  const handleDeleteCard = (cardId) => {
    setCards(cards.filter((c) => c.id !== cardId));
    showToast('Task deleted');
  };

  const handleQuickAddCard = (columnId, title) => {
    const newCard = {
      id: Date.now(),
      board: activeBoardId,
      title,
      description: '',
      status: columnId,
      priority: 'Medium',
      assignee: currentUser?.name || 'Aryan',
      labels: ['Frontend'],
      checklist: [],
      comments: []
    };
    setCards([...cards, newCard]);
    showToast('New task added');
  };

  const handleCardCreated = (newCard) => {
    setCards([...cards, newCard]);
    showToast(`Task "${newCard.title}" created!`);
  };

  const handleBoardCreated = (newBoard) => {
    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
    showToast(`Board "${newBoard.title}" created!`);
  };

  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedPriorities([]);
    setSelectedAssignees([]);
    setSearchQuery('');
    setAssigneeQuery('');
    setActiveTag('');
    showToast('Filters cleared');
  };

  const hasActiveFilters =
    selectedStatuses.length > 0 ||
    selectedPriorities.length > 0 ||
    selectedAssignees.length > 0 ||
    searchQuery.trim() !== '' ||
    assigneeQuery.trim() !== '' ||
    activeTag !== '';

  // Filtered Cards Computation
  const boardCards = useMemo(() => {
    return cards.filter((c) => c.board === activeBoardId);
  }, [cards, activeBoardId]);

  const filteredCards = useMemo(() => {
    return boardCards.filter((card) => {
      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = card.title.toLowerCase().includes(q);
        const matchDesc = card.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }

      // Assignee query
      if (assigneeQuery.trim()) {
        const aq = assigneeQuery.toLowerCase();
        if (!card.assignee?.toLowerCase().includes(aq)) return false;
      }

      // Tag / Label filter
      if (activeTag) {
        if (activeTag === 'High Priority' && card.priority !== 'High') return false;
        if (activeTag === 'In Process' && card.status !== 'inProcess') return false;
        if (!['High Priority', 'In Process'].includes(activeTag)) {
          if (!card.labels?.includes(activeTag)) return false;
        }
      }

      // Status filters
      if (selectedStatuses.length > 0) {
        if (!selectedStatuses.includes(card.status)) return false;
      }

      // Priority filters
      if (selectedPriorities.length > 0) {
        if (!selectedPriorities.includes(card.priority)) return false;
      }

      // Assignee filters
      if (selectedAssignees.length > 0) {
        if (!selectedAssignees.includes(card.assignee)) return false;
      }

      return true;
    });
  }, [boardCards, searchQuery, assigneeQuery, activeTag, selectedStatuses, selectedPriorities, selectedAssignees]);

  const completedCardsCount = boardCards.filter((c) => c.status === 'done').length;

  // Render Auth View if active
  if (isAuthViewOpen && !currentUser) {
    return (
      <AuthPage
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={() => {
          setIsAuthViewOpen(false);
          showToast('Browsing as Guest');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#111111] flex flex-col font-sans selection:bg-[#FF5B5B] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-black px-4 py-3 rounded-md shadow-[4px_4px_0px_#000000] flex items-center gap-2 text-xs font-bold text-black animate-in slide-in-from-bottom-5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5B5B] border border-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        boards={orgBoards}
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
        organizations={organizations}
        activeOrgId={activeOrgId}
        setActiveOrgId={setActiveOrgId}
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentUser={currentUser}
        onOpenCreateCard={() => setIsCreateCardOpen(true)}
        onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
        onOpenCreateOrg={() => setIsCreateOrgOpen(true)}
        onOpenOrgMembers={() => setIsOrgMembersOpen(true)}
        onLogout={handleLogout}
        onOpenAuthPage={() => setIsAuthViewOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Board Hero Header */}
        <BoardHero
          boardTitle={activeBoard?.title}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          assigneeQuery={assigneeQuery}
          setAssigneeQuery={setAssigneeQuery}
          onOpenCreateCard={() => setIsCreateCardOpen(true)}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />

        {/* 2-Column Responsive Workspace: Sidebar + Kanban Board */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
          
          {/* Left: Workspaces & Filters Sidebar */}
          <WorkspaceSidebar
            organizations={organizations}
            activeOrgId={activeOrgId}
            setActiveOrgId={setActiveOrgId}
            onOpenCreateOrg={() => setIsCreateOrgOpen(true)}
            onOpenOrgMembers={() => setIsOrgMembersOpen(true)}
            boards={orgBoards}
            activeBoardId={activeBoardId}
            setActiveBoardId={setActiveBoardId}
            onOpenCreateBoard={() => setIsCreateBoardOpen(true)}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            selectedPriorities={selectedPriorities}
            setSelectedPriorities={setSelectedPriorities}
            selectedAssignees={selectedAssignees}
            setSelectedAssignees={setSelectedAssignees}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            totalCards={boardCards.length}
            completedCards={completedCardsCount}
          />

          {/* Right: Kanban Board & Feed */}
          <KanbanBoard
            cards={filteredCards}
            viewMode={viewMode}
            onCardClick={(card) => setSelectedCardForDetail(card)}
            onMoveCard={handleMoveCard}
            onDeleteCard={handleDeleteCard}
            onQuickAddCard={handleQuickAddCard}
          />

        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CardDetailModal
        card={selectedCardForDetail}
        open={!!selectedCardForDetail}
        onClose={() => setSelectedCardForDetail(null)}
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
      />

      <CreateCardModal
        open={isCreateCardOpen}
        onClose={() => setIsCreateCardOpen(false)}
        activeBoardId={activeBoardId}
        onCardCreated={handleCardCreated}
      />

      <CreateBoardModal
        open={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        organizations={organizations}
        activeOrgId={activeOrgId}
        onBoardCreated={handleBoardCreated}
      />

      <CreateOrgModal
        open={isCreateOrgOpen}
        onClose={() => setIsCreateOrgOpen(false)}
        currentUser={currentUser}
        onOrgCreated={handleOrgCreated}
      />

      <OrgMembersModal
        open={isOrgMembersOpen}
        onClose={() => setIsOrgMembersOpen(false)}
        activeOrg={activeOrg}
        onAddMember={handleAddOrgMember}
      />

    </div>
  );
}
