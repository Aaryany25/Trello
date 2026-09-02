import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function CreateCardModal({
  open,
  onClose,
  activeBoardId,
  onCardCreated
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('High');
  const [assignee, setAssignee] = useState('Aryan');
  const [label, setLabel] = useState('Frontend');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCard = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      board: activeBoardId,
      status: status,
      priority: priority,
      assignee: assignee,
      labels: [label],
      checklist: [
        { text: 'Initial scoping & research', completed: false },
        { text: 'Implementation & unit tests', completed: false }
      ],
      comments: []
    };

    onCardCreated(newCard);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5B5B]">
            Agile Issue
          </span>
          <DialogTitle className="text-2xl">
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Add a new card with priority, assignee, and initial checklist.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Task Title *
            </label>
            <Input
              required
              placeholder="e.g. Build Auth Middleware, Implement JWT, Design Dark Mode"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide technical context, requirements, or API payloads..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-black rounded text-xs font-semibold text-black placeholder:text-neutral-500 focus:outline-none shadow-[2px_2px_0px_#000000]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Column
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-2 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
              >
                <option value="todo">To Do</option>
                <option value="inProcess">In Process</option>
                <option value="inReview">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-10 px-2 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
              >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-black mb-1">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full h-10 px-2 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
              >
                <option value="Aryan">Aryan</option>
                <option value="Avni">Avni</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Primary Tag
            </label>
            <select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full h-10 px-2 bg-white border-2 border-black rounded text-xs font-bold text-black shadow-[2px_2px_0px_#000000]"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="UI/UX">UI/UX</option>
              <option value="High Priority">High Priority</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="font-bold">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="font-bold px-6">
              Create Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
