import React from 'react';
import { Mail, User, FileText, Calendar, UserCheck, UserX } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ActivityFeed: React.FC = () => {
  const { activities } = useData();
  
  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'status_change':
        return <User className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'hired':
        return <UserCheck className="h-4 w-4" />;
      case 'rejected':
        return <UserX className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  
  const getActivityColor = (type) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-600';
      case 'status_change':
        return 'bg-purple-100 text-purple-600';
      case 'document':
        return 'bg-amber-100 text-amber-600';
      case 'interview':
        return 'bg-indigo-100 text-indigo-600';
      case 'hired':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto p-4">
      {sortedActivities.map((activity) => (
        <div key={activity.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          <div>
            <div className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: activity.description }}></div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(activity.date).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;