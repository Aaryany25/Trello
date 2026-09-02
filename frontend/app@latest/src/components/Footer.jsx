import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-black bg-white py-12 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b-2 border-black/10">
          
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white border-2 border-black rounded flex flex-col items-center justify-center font-black leading-none text-[#2563EB] shadow-[1.5px_1.5px_0px_#000000]">
                <div className="text-[9px]">LO</div>
                <div className="text-[9px]">GO</div>
              </div>
              <span className="font-black text-lg tracking-tight">
                Work<span className="text-[#FF5B5B]">Spot</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-neutral-600 leading-relaxed">
              The premier retro-modern job board connecting world-class talent with pioneering tech teams.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2 text-xs font-bold">
            <div className="text-black uppercase tracking-wider text-[11px] mb-2 font-black">For Job Seekers</div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Browse Design Jobs</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Browse Engineering Jobs</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Remote Jobs Directory</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Salary Calculator</a></div>
          </div>

          {/* Col 3 */}
          <div className="space-y-2 text-xs font-bold">
            <div className="text-black uppercase tracking-wider text-[11px] mb-2 font-black">For Employers</div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Post a Job Opening</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Talent Search</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Hiring Pricing</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Employer Branding</a></div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2 text-xs font-bold">
            <div className="text-black uppercase tracking-wider text-[11px] mb-2 font-black">About</div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">About Us</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Design Guidelines</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Terms & Privacy</a></div>
            <div><a href="#" className="text-neutral-600 hover:text-[#FF5B5B] transition-colors">Contact Support</a></div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-600">
          <div>
            © {new Date().getFullYear()} WorkSpot Inc. Built with Neo-Brutalist Design & Shadcn UI.
          </div>
          <div className="flex items-center gap-4 text-black">
            <a href="#" className="hover:text-[#FF5B5B] transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-[#FF5B5B] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[#FF5B5B] transition-colors">LinkedIn</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
