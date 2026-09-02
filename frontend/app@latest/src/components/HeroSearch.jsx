import { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function HeroSearch({ searchQuery, setSearchQuery, locationQuery, setLocationQuery, onSearch }) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(locationQuery);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSearchQuery(localSearch);
    setLocationQuery(localLocation);
    if (onSearch) onSearch(localSearch, localLocation);
  };

  const trendingTags = ['Product Designer', 'UX Designer', 'Frontend', 'React', 'Seattle', 'Remote', 'Google'];

  return (
    <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black mb-3">
        Find your Dream Job
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-neutral-800 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
        Looking for jobs? Browse our latest job openings to view & apply to the best jobs today
      </p>

      {/* Search Bar Container */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
      >
        {/* Job Title / Keyword Input */}
        <div className="flex-1 relative flex items-center bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000] focus-within:shadow-[4px_4px_0px_#000000] transition-all">
          <Search className="w-5 h-5 text-black absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search Job title or Keyword"
            className="w-full h-12 pl-11 pr-4 bg-transparent text-sm font-semibold text-black placeholder:text-neutral-500 focus:outline-none"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch('');
                setSearchQuery('');
              }}
              className="mr-3 text-xs font-bold text-neutral-400 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className="sm:w-64 relative flex items-center bg-white border-2 border-black rounded-md shadow-[3px_3px_0px_#000000] focus-within:shadow-[4px_4px_0px_#000000] transition-all">
          <MapPin className="w-5 h-5 text-black absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            placeholder="Location"
            className="w-full h-12 pl-11 pr-4 bg-transparent text-sm font-semibold text-black placeholder:text-neutral-500 focus:outline-none"
          />
        </div>

        {/* Search CTA Button */}
        <Button
          type="submit"
          variant="primary"
          className="h-12 px-8 text-base font-bold shadow-[3px_3px_0px_#000000] active:shadow-[1px_1px_0px_#000000]"
        >
          Search
        </Button>
      </form>

      {/* Quick Trending Tags */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
        <span className="text-neutral-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5B5B]" />
          Popular:
        </span>
        {trendingTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setLocalSearch(tag);
              setSearchQuery(tag);
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF5EE] border-[1.5px] border-black rounded shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-neutral-900 cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

    </section>
  );
}
