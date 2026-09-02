import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function CreateBoardModal({
  open,
  onClose,
  organizations,
  activeOrgId,
  onBoardCreated
}) {
  const [title, setTitle] = useState('');
  const [orgId, setOrgId] = useState(activeOrgId || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newBoard = {
      id: Date.now(),
      title: title.trim(),
      orgId: Number(orgId),
      organistions: Number(orgId)
    };

    onBoardCreated(newBoard);
    setTitle('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B]">
            Workspace Setup
          </span>
          <DialogTitle className="text-2xl">
            Create a New Kanban Board
          </DialogTitle>
          <DialogDescription>
            Boards represent sprint plans, feature epics, or project stages.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Board Title *
            </label>
            <Input
              required
              placeholder="e.g. Frontend Redesign, Q4 Sprint, API Roadmap"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Organization / Workspace
            </label>
            <select
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              className="w-full h-11 px-3 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.title} ({org.dec})
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="font-bold">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold px-6">
              Create Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
