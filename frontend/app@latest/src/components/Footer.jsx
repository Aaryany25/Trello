import { Trello, Github, Twitter, Linkedin, Disc as Discord, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Trello className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Task<span className="text-blue-500">Flow</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The modern agile board and sprint planning platform built for fast-moving engineering teams, indie builders, and product leaders.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.99% SLA)</span>
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Kanban Boards</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Sprint Backlogs</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Workspaces & Orgs</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Role Permissions</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Column: Resources */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Community Discord</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Column: Company */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers (We're Hiring!)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Overview</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <span>© {new Date().getFullYear()} TaskFlow Inc. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for high-performance builders.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Discord className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
