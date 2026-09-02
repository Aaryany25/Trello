import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  CheckSquare, 
  Trash2, 
  Plus, 
  User, 
  Tag, 
  Clock, 
  MessageSquare, 
  Send,
  AlertCircle,
  FolderGit2
} from 'lucide-react';

export default function CardDetailModal({
  card,
  open,
  onClose,
  onUpdateCard,
  onDeleteCard
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('Medium');
  const [assignee, setAssignee] = useState('Aryan');
  const [checklist, setChecklist] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setDescription(card.description || '');
      setStatus(card.status || 'todo');
      setPriority(card.priority || 'Medium');
      setAssignee(card.assignee || 'Aryan');
      setChecklist(card.checklist || []);
      setComments(card.comments || []);
    }
  }, [card]);

  if (!card) return null;

  const handleSave = () => {
    onUpdateCard({
      ...card,
      title,
      description,
      status,
      priority,
      assignee,
      checklist,
      comments
    });
    onClose();
  };

  const toggleChecklistItem = (idx) => {
    const updated = checklist.map((item, i) =>
      i === idx ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
  };

  const addChecklistItem = (e) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    setChecklist([...checklist, { text: newChecklistText.trim(), completed: false }]);
    setNewChecklistText('');
  };

  const deleteChecklistItem = (idx) => {
    setChecklist(checklist.filter((_, i) => i !== idx));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      author: 'Aryan',
      text: newComment.trim(),
      time: 'Just now'
    };
    setComments([commentObj, ...comments]);
    setNewComment('');
  };

  const completedCount = checklist.filter((i) => i.completed).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="max-w-2xl">
        
        <DialogHeader>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#FF5B5B] bg-[#FF5B5B]/10 px-2 py-0.5 border border-[#FF5B5B] rounded">
              Issue #{card.id}
            </span>
            <button
              onClick={() => {
                onDeleteCard(card.id);
                onClose();
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer mr-6"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Task
            </button>
          </div>
          <DialogTitle>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-black bg-transparent border-b-2 border-black focus:outline-none pb-1"
            />
          </DialogTitle>
          <DialogDescription className="font-semibold text-neutral-700">
            Sprint Task Overview & Acceptance Criteria
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-xs font-semibold text-black">
          
          {/* Metadata Controls: Status, Priority, Assignee */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                Workflow Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-8 px-2 bg-[#FAF5EE] border-2 border-black rounded text-xs font-bold text-black focus:outline-none"
              >
                <option value="todo">To Do</option>
                <option value="inProcess">In Process</option>
                <option value="inReview">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-8 px-2 bg-[#FAF5EE] border-2 border-black rounded text-xs font-bold text-black focus:outline-none"
              >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Low">🌱 Low</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full h-8 px-2 bg-[#FAF5EE] border-2 border-black rounded text-xs font-bold text-black focus:outline-none"
              >
                <option value="Aryan">Aryan (Fullstack)</option>
                <option value="Avni">Avni (Frontend)</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
          </div>

          {/* Description field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add detailed task instructions, endpoints, or notes..."
              className="w-full p-3 bg-white border-2 border-black rounded text-xs font-semibold text-black placeholder:text-neutral-500 focus:outline-none shadow-[2px_2px_0px_#000000]"
            />
          </div>

          {/* Checklist Feature */}
          <div className="p-3.5 bg-white border-2 border-black rounded shadow-[2px_2px_0px_#000000] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black">
                <CheckSquare className="w-4 h-4 text-[#10B981]" />
                <span>Acceptance Checklist ({completedCount}/{checklist.length})</span>
              </div>
            </div>

            {/* Progress Bar */}
            {checklist.length > 0 && (
              <div className="w-full h-2 bg-[#FAF5EE] border border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10B981] transition-all duration-300"
                  style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                />
              </div>
            )}

            {/* Items */}
            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-1.5 bg-[#FAF5EE] rounded border border-black/20">
                  <div className="flex items-center gap-2 flex-1">
                    <Checkbox
                      id={`chk-${idx}`}
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(idx)}
                    />
                    <span className={`text-xs font-medium ${item.completed ? 'line-through text-neutral-400' : 'text-black'}`}>
                      {item.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteChecklistItem(idx)}
                    className="p-1 hover:text-rose-600 text-neutral-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add checklist item */}
            <form onSubmit={addChecklistItem} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Add new checklist item..."
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                className="flex-1 h-8 px-2.5 bg-[#FAF5EE] border-2 border-black rounded text-xs font-semibold focus:outline-none"
              />
              <Button type="submit" variant="secondary" size="sm" className="h-8 font-bold text-xs">
                Add
              </Button>
            </form>
          </div>

          {/* Activity / Comments Stream */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-black" /> Activity & Comments
            </label>

            <form onSubmit={handleAddComment} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Write a status update or comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 h-9 px-3 bg-white border-2 border-black rounded text-xs font-semibold focus:outline-none shadow-[2px_2px_0px_#000000]"
              />
              <Button type="submit" variant="primary" size="sm" className="h-9 font-bold">
                <Send className="w-3.5 h-3.5 mr-1" /> Post
              </Button>
            </form>

            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment.id} className="p-2.5 bg-white border-2 border-black rounded shadow-[1.5px_1.5px_0px_#000000] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-black">{comment.author}</span>
                    <span className="text-[10px] text-neutral-500 font-semibold">{comment.time}</span>
                  </div>
                  <p className="text-neutral-700 font-medium">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="font-bold">
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={handleSave} className="font-bold px-7">
            Save Changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
