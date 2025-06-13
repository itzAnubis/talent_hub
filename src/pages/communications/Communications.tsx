import React, { useState } from 'react';
import { 
  Mail, MessageSquare, Phone, Video, Search, 
  Filter, Plus, ChevronDown, CalendarClock
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const Communications: React.FC = () => {
  const { communications, candidates } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort communications
  const filteredCommunications = communications
    .filter(comm => {
      const matchesSearch = searchQuery === '' ||
        comm.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCandidateName(comm.candidateId).toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || comm.type === filterType;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Helper function to get candidate name
  const getCandidateName = (candidateId) => {
    const candidate = candidates.find(c => c.id === parseInt(candidateId));
    return candidate ? candidate.name : 'Unknown Candidate';
  };

  // Helper function to get icon by type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'call':
        return <Phone className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  // Helper function to get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-600';
      case 'message':
        return 'bg-purple-100 text-purple-600';
      case 'call':
        return 'bg-green-100 text-green-600';
      case 'video':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Communications</h1>
        
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            <Plus className="h-4 w-4 mr-1" />
            New Communication
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
            <CalendarClock className="h-4 w-4 mr-1" />
            Schedule
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search communications..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                filterType === 'all' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
              }`}
              onClick={() => setFilterType('all')}
            >
              All Types
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                filterType === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
              }`}
              onClick={() => setFilterType('email')}
            >
              <Mail className="h-4 w-4 mr-1 inline" />
              Emails
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                filterType === 'call' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
              }`}
              onClick={() => setFilterType('call')}
            >
              <Phone className="h-4 w-4 mr-1 inline" />
              Calls
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                filterType === 'message' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
              }`}
              onClick={() => setFilterType('message')}
            >
              <MessageSquare className="h-4 w-4 mr-1 inline" />
              Messages
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm ${
                filterType === 'video' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'
              }`}
              onClick={() => setFilterType('video')}
            >
              <Video className="h-4 w-4 mr-1 inline" />
              Video Calls
            </button>
          </div>
        </div>
      )}

      {/* Communications list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredCommunications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No communications found. Adjust your filters or create a new communication.
          </div>
        ) : (
          filteredCommunications.map((communication) => (
            <div key={communication.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeColor(communication.type)}`}>
                  {getTypeIcon(communication.type)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-800">{communication.subject}</h3>
                        <span className="text-sm text-gray-500">with</span>
                        <span className="font-medium">{getCandidateName(communication.candidateId)}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {communication.type === 'email' ? 'Sent by' : 'Recorded by'} {communication.sentByName} • {new Date(communication.date).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                        {getTypeIcon(communication.type)}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-gray-700 line-clamp-2 whitespace-pre-line">{communication.content}</p>
                  </div>
                  
                  {communication.type === 'call' && communication.duration && (
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        Duration: {communication.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Communications;