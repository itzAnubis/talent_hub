import React, { useState } from 'react';
import { Send, Edit, Trash2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

interface CandidateNotesProps {
  candidateId: string;
}

const CandidateNotes: React.FC<CandidateNotesProps> = ({ candidateId }) => {
  const { notes, addNote, updateNote, deleteNote } = useData();
  const { currentUser } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  
  const candidateNotes = notes.filter(note => note.candidateId === candidateId);

  const handleSubmitNote = () => {
    if (!newNote.trim()) return;
    
    addNote({
      candidateId,
      content: newNote,
      createdBy: currentUser?.id || '',
      createdByName: currentUser?.name || 'Unknown User',
      createdAt: new Date().toISOString(),
    });
    
    setNewNote('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNote();
    }
  };

  const handleStartEditing = (note: { id: string; content: string }) => {
    setEditingNoteId(note.id as any);
    setEditedContent(note.content);
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editedContent.trim()) return;
    
    updateNote(noteId, {
      content: editedContent,
      updatedAt: new Date().toISOString(),
    });
    
    setEditingNoteId(null);
    setEditedContent('');
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditedContent('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {candidateNotes.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No notes yet. Add the first note about this candidate.
          </div>
        ) : (
          candidateNotes.map((note) => (
            <div key={note.id} className="bg-white border border-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium">
                    {note.createdByName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{note.createdByName}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleString()}
                      {note.updatedAt && ` (edited ${new Date(note.updatedAt).toLocaleString()})`}
                    </p>
                  </div>
                </div>
                
                {currentUser?.id === note.createdBy && (
                  <div className="flex items-center gap-1">
                    <button 
                      className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100"
                      onClick={() => handleStartEditing(note)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {editingNoteId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={3}
                    autoFocus
                  ></textarea>
                  <div className="flex justify-end gap-2">
                    <button 
                      className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md"
                      onClick={() => handleSaveEdit(note.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <textarea
          className="w-full p-4 border-b border-gray-200 min-h-[100px] text-gray-700 placeholder-gray-400 resize-none"
          placeholder="Add a note about this candidate..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="flex justify-between items-center px-4 py-2">
          <p className="text-xs text-gray-500">
            Use Shift+Enter for a new line
          </p>
          <button 
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
              newNote.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400'
            } transition`}
            onClick={handleSubmitNote}
            disabled={!newNote.trim()}
          >
            <Send className="h-3.5 w-3.5" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateNotes;