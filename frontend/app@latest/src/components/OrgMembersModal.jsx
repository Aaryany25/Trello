import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Users, UserPlus, Shield, Check, Trash2 } from 'lucide-react';

export default function OrgMembersModal({
  open,
  onClose,
  activeOrg,
  onAddMember
}) {
  const [newMemberName, setNewMemberName] = useState('');

  if (!activeOrg) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    onAddMember(activeOrg.id, newMemberName.trim());
    setNewMemberName('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B] flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Team Management
          </span>
          <DialogTitle className="text-2xl">
            {activeOrg.title} Members
          </DialogTitle>
          <DialogDescription>
            Manage team members and invite collaborators to this organisation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          
          {/* Invite Form */}
          <form onSubmit={handleAdd} className="flex items-center gap-2">
            <Input
              placeholder="Enter name or username (e.g. Avni, Rahul)..."
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="h-10 text-xs font-bold"
            />
            <Button type="submit" variant="primary" className="h-10 text-xs font-bold px-4 shrink-0">
              <UserPlus className="w-3.5 h-3.5 mr-1" /> Add Member
            </Button>
          </form>

          {/* Members List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <div className="text-[11px] font-black uppercase tracking-wider text-neutral-500">
              Active Members ({activeOrg.members?.length || 1})
            </div>
            
            {activeOrg.members?.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000] text-xs font-bold"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-black bg-[#93C5FD] flex items-center justify-center font-black text-xs">
                    {typeof member === 'string' ? member.substring(0, 2).toUpperCase() : `M${idx + 1}`}
                  </div>
                  <div>
                    <p className="text-black leading-tight">
                      {typeof member === 'string' ? member : `Member #${member}`}
                    </p>
                    <p className="text-[10px] text-neutral-500 font-semibold">
                      {idx === 0 ? 'Organisation Admin' : 'Active Collaborator'}
                    </p>
                  </div>
                </div>

                {idx === 0 ? (
                  <span className="flex items-center gap-1 text-[10px] bg-[#10B981] text-white px-2 py-0.5 rounded border border-black font-extrabold">
                    <Shield className="w-3 h-3" /> Admin
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#FAF5EE] text-black px-2 py-0.5 rounded border border-black font-bold">
                    Member
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="font-bold">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
