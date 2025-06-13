import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-50 text-blue-600';
      case 'screening':
        return 'bg-purple-50 text-purple-600';
      case 'interviewing':
        return 'bg-amber-50 text-amber-600';
      case 'assessment':
        return 'bg-indigo-50 text-indigo-600';
      case 'offered':
        return 'bg-green-50 text-green-600';
      case 'hired':
        return 'bg-emerald-50 text-emerald-600';
      case 'rejected':
        return 'bg-red-50 text-red-600';
      case 'on hold':
        return 'bg-gray-50 text-gray-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;