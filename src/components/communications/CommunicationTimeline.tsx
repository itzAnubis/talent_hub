import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Video, Plus, Send } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

interface CommunicationTimelineProps {
  candidateId: string;
}

const CommunicationTimeline: React.FC<CommunicationTimelineProps> = ({ candidateId }) => {
  const { communications, addCommunication } = useData();
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [newComm, setNewComm] = useState({
    type: 'email',
    subject: '',
    content: '',
  });
  
  // Filter communications for this candidate
  const candidateCommunications = communications
    .filter(comm => comm.candidateId === candidateId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-600';
      case 'call':
        return 'bg-green-100 text-green-600';
      case 'message':
        return 'bg-purple-100 text-purple-600';
      case 'video':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleNewCommunication = () => {
    if (!newComm.subject.trim() || !newComm.content.trim()) return;
    
    addCommunication({
      candidateId,
      type: newComm.type,
      subject: newComm.subject,
      content: newComm.content,
      date: new Date().toISOString(),
      sentBy: currentUser.id,
      sentByName: currentUser.name,
    });
    
    setNewComm({
      type: 'email',
      subject: '',
      content: '',
    });
    
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Communications History</h3>
        
        {!showForm && (
          <button 
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 transition"
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4" />
            New Communication
          </button>
        )}
      </div>
      
      {showForm && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={newComm.type}
                  onChange={(e) => setNewComm({...newComm, type: e.target.value})}
                >
                  <option value="email">Email</option>
                  <option value="call">Phone Call</option>
                  <option value="message">Message</option>
                  <option value="video">Video Call</option>
                </select>
              </div>
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Communication subject"
                  value={newComm.subject}
                  onChange={(e) => setNewComm({...newComm, subject: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Communication content..."
                rows={4}
                value={newComm.content}
                onChange={(e) => setNewComm({...newComm, content: e.target.value})}
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button 
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                onClick={handleNewCommunication}
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {candidateCommunications.length === 0 && !showForm ? (
        <div className="text-center py-6 text-gray-500">
          No communication records found. Add a new communication to start the conversation.
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 z-0"></div>
          
          {candidateCommunications.map((communication) => (
            <div key={communication.id} className="relative z-10 flex gap-4 mb-6 pb-6">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${getTypeColor(communication.type)}`}>
                {getTypeIcon(communication.type)}
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{communication.subject}</h4>
                    <p className="text-sm text-gray-500">
                      {communication.type === 'email' ? 'Sent by' : 'Recorded by'} {communication.sentByName}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(communication.date).toLocaleString()}
                  </span>
                </div>
                
                <div className="mt-2 p-4 bg-white border border-gray-100 rounded-md">
                  <p className="text-gray-700 whitespace-pre-wrap">{communication.content}</p>
                </div>
                
                {communication.type === 'call' && communication.duration && (
                  <div className="mt-2 text-sm text-gray-500">
                    Call duration: {communication.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunicationTimeline;