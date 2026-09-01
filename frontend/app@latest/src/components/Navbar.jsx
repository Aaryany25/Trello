import { useState, useEffect } from 'react';
import { 
  Trello, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Layout, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight 
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Trello className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  Task<span className="text-blue-500">Flow</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                  v2.0
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <div className="relative">
              <button 
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productDropdownOpen && (
                <div 
                  onMouseLeave={() => setProductDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Layout className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Visual Kanban</div>
                      <div className="text-xs text-slate-400">Drag & drop agile sprint boards</div>
                    </div>
                  </a>
                  <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Workspaces & Orgs</div>
                      <div className="text-xs text-slate-400">Team hierarchies & role access</div>
                    </div>
                  </a>
                  <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Issue Tracking</div>
                      <div className="text-xs text-slate-400">Sub-tasks, checklists & tags</div>
                    </div>
                  </a>
                  <a href="#features" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/70 transition-colors">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Enterprise Security</div>
                      <div className="text-xs text-slate-400">JWT auth & data encryption</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a href="#workflow" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </button>
            <a 
              href="#pricing"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-br from-blue-600 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-[10px] group-hover:bg-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                Get Started Free
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            Features
          </a>
          <a 
            href="#workflow" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            How It Works
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <button className="w-full py-2.5 rounded-xl border border-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-850">
              Log in
            </button>
            <a 
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
