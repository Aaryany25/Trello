import { useState } from 'react';
import { MapPin, Bookmark, BookmarkCheck, ArrowUpRight, Clock, DollarSign, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function JobList({ jobs, onApply, savedJobIds = [], onToggleSave }) {
  const [sortBy, setSortBy] = useState('relevant');

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === 'salary-high') return b.salaryMax - a.salaryMax;
    if (sortBy === 'salary-low') return a.salaryMin - b.salaryMin;
    if (sortBy === 'newest') return new Date(b.postedDate) - new Date(a.postedDate);
    return 0; // default relevant
  });

  return (
    <div className="flex-1 min-w-0">
      
      {/* Header bar: Total Jobs + Badge + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        
        {/* Total Jobs Counter matching inspiration */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black font-sans">
            Total Jobs
          </h2>
          <div className="px-3 py-1 bg-white border-2 border-black text-xs font-bold text-black shadow-[2px_2px_0px_#000000]">
            {jobs.length} job results
          </div>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-bold text-black">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-8 px-2.5 bg-white border-2 border-black rounded text-xs font-bold text-black focus:outline-none shadow-[2px_2px_0px_#000000] cursor-pointer"
          >
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </select>
        </div>

      </div>

      {/* Empty State */}
      {sortedJobs.length === 0 && (
        <div className="bg-white border-2 border-black rounded-md p-12 text-center shadow-[4px_4px_0px_#000000]">
          <div className="w-16 h-16 bg-[#FAF5EE] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-[2px_2px_0px_#000000]">
            🔍
          </div>
          <h3 className="text-lg font-bold text-black mb-1">No matching jobs found</h3>
          <p className="text-sm text-neutral-600 max-w-sm mx-auto mb-4">
            Try adjusting your search query, location, or clearing some filters to see more results.
          </p>
        </div>
      )}

      {/* Job Cards Feed */}
      <div className="space-y-5">
        {sortedJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-[#FAF5EE] border-2 border-black rounded-md p-5 sm:p-6 shadow-[4px_4px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all relative group"
            >
              
              {/* Top Row: Logo + Titles + Badges + Location */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                
                {/* Company Logo & Job Title */}
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Company Logo Container */}
                  <div className="w-12 h-12 rounded-full border-2 border-black bg-white flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000] overflow-hidden">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="font-bold text-sm text-black">${job.company.substring(0, 2).toUpperCase()}</span>`;
                        }}
                      />
                    ) : (
                      <span className="font-bold text-sm text-black">
                        {job.company.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-extrabold text-black font-sans hover:text-[#FF5B5B] transition-colors cursor-pointer"
                          onClick={() => onApply(job)}>
                        {job.title}
                      </h3>
                      
                      {/* Job Badges like inspiration image */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {job.typeBadge && (
                          <Badge variant={job.typeBadge.variant || 'fulltime'}>
                            {job.typeBadge.label}
                          </Badge>
                        )}
                        {job.levelBadge && (
                          <Badge variant={job.levelBadge.variant || 'midlevel'}>
                            {job.levelBadge.label}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-neutral-700 mt-0.5">
                      {job.company}
                    </p>
                  </div>
                </div>

                {/* Location Marker */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 self-start sm:self-center shrink-0">
                  <MapPin className="w-4 h-4 text-black" />
                  <span>{job.location}</span>
                </div>

              </div>

              {/* Middle: Bullet points */}
              <div className="my-4 text-xs sm:text-[13px] text-neutral-900 font-medium space-y-1.5 pl-1">
                {job.bullets?.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-black font-black text-sm leading-none">•</span>
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Bottom: Meta Info (Salary, Posted) & Apply Action */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/10">
                
                {/* Meta details */}
                <div className="flex items-center gap-3 text-xs font-bold text-neutral-700">
                  <span className="flex items-center gap-1 bg-white px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_#000000]">
                    💰 {job.salaryText}
                  </span>
                  <span className="flex items-center gap-1 text-neutral-600">
                    <Clock className="w-3.5 h-3.5" />
                    {job.postedTime}
                  </span>
                </div>

                {/* Actions: Bookmark & Apply Now */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSave(job.id)}
                    className={`p-2 rounded border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 ${
                      isSaved
                        ? 'bg-[#FF5B5B] text-white'
                        : 'bg-white text-black hover:bg-[#FAF5EE]'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save job'}
                    aria-label="Save job"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <Button
                    onClick={() => onApply(job)}
                    variant="primary"
                    size="sm"
                    className="h-9 px-5 text-xs font-bold shadow-[2.5px_2.5px_0px_#000000] active:shadow-[1px_1px_0px_#000000]"
                  >
                    Apply Now
                  </Button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
