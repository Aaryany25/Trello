import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { MapPin, DollarSign, UploadCloud, CheckCircle2, Building, Sparkles } from 'lucide-react';

export default function ApplyModal({ job, open, onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    portfolio: '',
    resumeName: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitted) {
        onSubmitted(job, formData);
      }
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ fullName: '', email: '', portfolio: '', resumeName: '', note: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleReset}>
      <DialogContent onClose={handleReset}>
        
        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#10B981] text-white border-2 border-black rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#000000] animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black font-sans text-black">
              Application Submitted!
            </h3>
            <p className="text-sm font-medium text-neutral-700 max-w-md mx-auto">
              Your application for <span className="font-bold text-black">{job.title}</span> at <span className="font-bold text-black">{job.company}</span> has been forwarded to the hiring team.
            </p>
            <div className="p-3 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000] text-xs font-semibold text-neutral-800 text-left max-w-sm mx-auto space-y-1">
              <div><span className="text-neutral-500">Applicant:</span> {formData.fullName || 'Alex Designer'}</div>
              <div><span className="text-neutral-500">Email:</span> {formData.email || 'alex@example.com'}</div>
              <div><span className="text-neutral-500">Status:</span> Under Review</div>
            </div>
            <div className="pt-2">
              <Button onClick={handleReset} variant="primary" className="px-8 font-bold">
                Done & Back to Jobs
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B]">
                  Quick Apply
                </span>
              </div>
              <DialogTitle className="text-2xl">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription className="font-semibold text-neutral-800 flex flex-wrap items-center gap-3 pt-1">
                <span className="font-bold text-black">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-black" /> {job.location}
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">
                  {job.salaryText}
                </span>
              </DialogDescription>
            </DialogHeader>

            {/* Badges */}
            <div className="flex items-center gap-1.5 mb-5">
              {job.typeBadge && <Badge variant={job.typeBadge.variant}>{job.typeBadge.label}</Badge>}
              {job.levelBadge && <Badge variant={job.levelBadge.variant}>{job.levelBadge.label}</Badge>}
            </div>

            {/* Requirements brief */}
            <div className="mb-5 bg-white border-2 border-black rounded p-3 text-xs font-medium text-neutral-800 shadow-[2px_2px_0px_#000000] space-y-1">
              <div className="font-bold text-black uppercase tracking-wider text-[11px] mb-1">Job Highlights:</div>
              {job.bullets?.map((b, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-black font-bold">•</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Full Name *
                  </label>
                  <Input
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Portfolio / GitHub URL
                </label>
                <Input
                  type="url"
                  placeholder="https://myportfolio.design"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Attach Resume (PDF / DOCX)
                </label>
                <div className="relative border-2 border-dashed border-black rounded bg-white p-4 text-center cursor-pointer hover:bg-[#FFFDF9] shadow-[2px_2px_0px_#000000]">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-6 h-6 text-black mx-auto mb-1" />
                  <p className="text-xs font-bold text-black">
                    {formData.resumeName ? (
                      <span className="text-emerald-700">✓ {formData.resumeName}</span>
                    ) : (
                      <span>Click or drag your resume file here</span>
                    )}
                  </p>
                  <span className="text-[10px] text-neutral-500 font-semibold">Max size 10MB</span>
                </div>
              </div>

              {/* Note / Pitch */}
              <div>
                <label className="block text-xs font-bold text-black mb-1">
                  Why are you a great fit? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a short note about your relevant projects..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full bg-white px-3 py-2 text-xs font-semibold text-black border-2 border-black rounded placeholder:text-neutral-500 focus:outline-none shadow-[2px_2px_0px_#000000]"
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleReset}
                  className="font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="default"
                  disabled={isSubmitting}
                  className="font-bold px-7"
                >
                  {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                </Button>
              </DialogFooter>

            </form>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
