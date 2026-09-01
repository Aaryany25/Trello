import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "TaskFlow completely transformed how our 20-person engineering team runs sprints. Switching from bulky Jira reduced our planning overhead by 60%.",
      author: "Alex Morgan",
      role: "VP of Engineering at FintechOS",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      stars: 5,
    },
    {
      quote: "The multi-workspace isolation is phenomenal. We manage our client boards, design backlogs, and internal bug queues without switching accounts.",
      author: "Samantha Hayes",
      role: "Head of Product at CloudScale",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
      stars: 5,
    },
    {
      quote: "Card drag-and-drop is butter-smooth, real-time sync is instant, and the UI is genuinely the cleanest agile tool we've ever tested.",
      author: "Darius Thorne",
      role: "Lead Fullstack Architect at NextGen AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by builders & product leaders
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            See why over 45,000 engineering teams choose TaskFlow for everyday sprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group"
            >
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-sm font-bold text-white">{item.author}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
