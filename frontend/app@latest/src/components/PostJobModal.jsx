import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

export default function PostJobModal({ open, onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Seattle, WA, USA',
    jobType: 'Full-time',
    level: 'Mid Level',
    workplace: 'On-site',
    salaryMin: 1200,
    salaryMax: 1800,
    salaryText: '$1,200 - $1,800/mo',
    bullet1: 'Bachelor’s degree in Design or equivalent practical experience',
    bullet2: 'A portfolio that demonstrates refined digital product design'
  });

  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: `job-${Date.now()}`,
      title: formData.title,
      company: formData.company,
      location: formData.location,
      jobType: formData.jobType,
      workplace: formData.workplace,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      salaryText: formData.salaryText || `$${formData.salaryMin} - $${formData.salaryMax}/mo`,
      postedTime: 'Just now',
      postedDate: new Date().toISOString(),
      logo: '',
      typeBadge: {
        label: formData.jobType,
        variant: formData.jobType === 'Part-time' ? 'parttime' : 'fulltime'
      },
      levelBadge: {
        label: formData.level,
        variant: formData.level === 'Entry' ? 'entry' : 'midlevel'
      },
      bullets: [formData.bullet1, formData.bullet2].filter(Boolean)
    };

    onJobCreated(newJob);
    setCreated(true);
  };

  const handleClose = () => {
    setCreated(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose}>
        {created ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#10B981] text-white border-2 border-black rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000000]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black font-sans text-black">
              Job Posted Successfully!
            </h3>
            <p className="text-sm font-medium text-neutral-700 max-w-md mx-auto">
              Your new listing <span className="font-bold text-black">{formData.title}</span> is now published live on the board.
            </p>
            <div className="pt-2">
              <Button onClick={handleClose} variant="primary" className="px-8 font-bold">
                View Job on Board
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B]">
                Hiring Talent
              </span>
              <DialogTitle className="text-2xl">
                Post a New Job Opening
              </DialogTitle>
              <DialogDescription>
                Reach thousands of designers, developers, and product makers.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Job Title *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Company Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Stripe, Airbnb, Google"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Location *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Seattle, WA, USA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Job Type
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                    className="w-full h-11 px-3 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intern">Intern</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full h-11 px-3 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Workplace Mode
                  </label>
                  <select
                    value={formData.workplace}
                    onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                    className="w-full h-11 px-3 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Salary Range Description
                  </label>
                  <Input
                    placeholder="e.g. $1,500 - $2,500/mo"
                    value={formData.salaryText}
                    onChange={(e) => setFormData({ ...formData, salaryText: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Key Requirement 1
                </label>
                <Input
                  required
                  placeholder="e.g. 3+ years experience with modern React & Tailwind"
                  value={formData.bullet1}
                  onChange={(e) => setFormData({ ...formData, bullet1: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Key Requirement 2
                </label>
                <Input
                  placeholder="e.g. Strong eye for UI design & system architecture"
                  value={formData.bullet2}
                  onChange={(e) => setFormData({ ...formData, bullet2: e.target.value })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose} className="font-bold">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="font-bold px-7">
                  Publish Job
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
