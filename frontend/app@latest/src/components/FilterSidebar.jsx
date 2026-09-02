import { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

export default function FilterSidebar({
  datePosted,
  setDatePosted,
  selectedJobTypes,
  setSelectedJobTypes,
  selectedSalaryRanges,
  setSelectedSalaryRanges,
  selectedWorkplaces,
  setSelectedWorkplaces,
  onResetFilters,
  hasActiveFilters
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleJobType = (type) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter((t) => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  const toggleSalary = (range) => {
    if (selectedSalaryRanges.includes(range)) {
      setSelectedSalaryRanges(selectedSalaryRanges.filter((r) => r !== range));
    } else {
      setSelectedSalaryRanges([...selectedSalaryRanges, range]);
    }
  };

  const toggleWorkplace = (wp) => {
    if (selectedWorkplaces.includes(wp)) {
      setSelectedWorkplaces(selectedWorkplaces.filter((w) => w !== wp));
    } else {
      setSelectedWorkplaces([...selectedWorkplaces, wp]);
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-[#FAF5EE] border-2 border-black rounded-md p-5 shadow-[4px_4px_0px_#000000]">
        
        {/* Header with collapse icon */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-black" />
            <h2 className="text-base font-black tracking-tight text-black font-sans">
              Filters
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
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-black" />
              ) : (
                <ChevronUp className="w-4 h-4 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Filter contents */}
        {!isCollapsed && (
          <div className="space-y-6">
            
            {/* Section: Date Posted */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                Date posted
              </label>
              <div className="relative">
                <select
                  value={datePosted}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="w-full h-10 px-3 py-1.5 bg-white border-2 border-black rounded text-xs font-bold text-black appearance-none focus:outline-none shadow-[2px_2px_0px_#000000] cursor-pointer"
                >
                  <option value="all">Any time</option>
                  <option value="24h">Past 24 hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Past Month</option>
                </select>
                <ChevronDown className="w-4 h-4 text-black absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Section: Job Type */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                Job type
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="type-fulltime"
                    checked={selectedJobTypes.includes('Full-time')}
                    onChange={() => toggleJobType('Full-time')}
                  />
                  <label htmlFor="type-fulltime" className="cursor-pointer select-none">
                    Full-time
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="type-parttime"
                    checked={selectedJobTypes.includes('Part-time')}
                    onChange={() => toggleJobType('Part-time')}
                  />
                  <label htmlFor="type-parttime" className="cursor-pointer select-none">
                    Part-time
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="type-intern"
                    checked={selectedJobTypes.includes('Intern')}
                    onChange={() => toggleJobType('Intern')}
                  />
                  <label htmlFor="type-intern" className="cursor-pointer select-none">
                    Intern
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="type-freelance"
                    checked={selectedJobTypes.includes('Freelance')}
                    onChange={() => toggleJobType('Freelance')}
                  />
                  <label htmlFor="type-freelance" className="cursor-pointer select-none">
                    Freelance
                  </label>
                </div>

              </div>
            </div>

            {/* Section: Salary Range */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                Salary Range
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sal-under1000"
                    checked={selectedSalaryRanges.includes('under1k')}
                    onChange={() => toggleSalary('under1k')}
                  />
                  <label htmlFor="sal-under1000" className="cursor-pointer select-none truncate">
                    Under $1000
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sal-1000-2000"
                    checked={selectedSalaryRanges.includes('1k-2k')}
                    onChange={() => toggleSalary('1k-2k')}
                  />
                  <label htmlFor="sal-1000-2000" className="cursor-pointer select-none truncate">
                    $1000-$2000
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sal-2000-5000"
                    checked={selectedSalaryRanges.includes('2k-5k')}
                    onChange={() => toggleSalary('2k-5k')}
                  />
                  <label htmlFor="sal-2000-5000" className="cursor-pointer select-none truncate">
                    $2000-$5000
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sal-over5000"
                    checked={selectedSalaryRanges.includes('over5k')}
                    onChange={() => toggleSalary('over5k')}
                  />
                  <label htmlFor="sal-over5000" className="cursor-pointer select-none truncate">
                    &gt; $5000
                  </label>
                </div>

              </div>
            </div>

            {/* Section: On site/Remote */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2.5">
                On site/Remote
              </label>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs font-semibold text-black">
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wp-onsite"
                    checked={selectedWorkplaces.includes('On-site')}
                    onChange={() => toggleWorkplace('On-site')}
                  />
                  <label htmlFor="wp-onsite" className="cursor-pointer select-none">
                    On-site
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wp-hybrid"
                    checked={selectedWorkplaces.includes('Hybrid')}
                    onChange={() => toggleWorkplace('Hybrid')}
                  />
                  <label htmlFor="wp-hybrid" className="cursor-pointer select-none">
                    Hybrid
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wp-remote"
                    checked={selectedWorkplaces.includes('Remote')}
                    onChange={() => toggleWorkplace('Remote')}
                  />
                  <label htmlFor="wp-remote" className="cursor-pointer select-none">
                    Remote
                  </label>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </aside>
  );
}
