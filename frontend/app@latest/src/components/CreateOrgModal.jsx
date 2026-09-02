import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Building2, Users } from 'lucide-react';

export default function CreateOrgModal({
  open,
  onClose,
  currentUser,
  onOrgCreated
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [initialBoardName, setInitialBoardName] = useState('Main Sprint Board');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newOrg = {
      id: Date.now(),
      title: title.trim(),
      dec: description.trim() || 'Workspace',
      admin: currentUser?.id || 1,
      amin: currentUser?.id || 1,
      members: [currentUser?.name || 'Aryan']
    };

    const defaultBoard = {
      id: Date.now() + 1,
      title: initialBoardName.trim() || 'Main Sprint Board',
      orgId: newOrg.id,
      organistions: newOrg.id
    };

    onOrgCreated(newOrg, defaultBoard);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B] flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> Workspace Management
          </span>
          <DialogTitle className="text-2xl">
            Create a New Organisation
          </DialogTitle>
          <DialogDescription>
            Organisations group boards, teams, and sprint backlogs together under one umbrella.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Organisation Title *
            </label>
            <Input
              required
              placeholder="e.g. Design Studio, Platform Engineering, Acme Corp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Description / Workspace Purpose
            </label>
            <Input
              placeholder="e.g. Client work & marketing roadmaps"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Default First Board Name
            </label>
            <Input
              placeholder="e.g. Q4 Sprint Planning"
              value={initialBoardName}
              onChange={(e) => setInitialBoardName(e.target.value)}
            />
          </div>

          <div className="p-3 bg-white border-2 border-black rounded text-xs font-semibold text-neutral-700 shadow-[2px_2px_0px_#000000]">
            <span className="text-black font-bold">Admin:</span> {currentUser?.name || 'Aryan'} (You will be set as the Organisation Admin)
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="font-bold">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold px-6">
              Create Organisation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
