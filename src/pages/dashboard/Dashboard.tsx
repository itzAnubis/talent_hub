import React from 'react';
import { BarChart3, Users, Clock, UserCheck, Award } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import RecentCandidates from '../../components/dashboard/RecentCandidates';
import RecruitmentFunnel from '../../components/dashboard/RecruitmentFunnel';
import TimelineChart from '../../components/dashboard/TimelineChart';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import DepartmentMetrics from '../../components/dashboard/DepartmentMetrics';
import { useData } from '../../contexts/DataContext';

const Dashboard: React.FC = () => {
  const { stats, isLoading } = useData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Recruitment Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Candidates" 
          value={stats.totalCandidates} 
          change={stats.candidatesChange} 
          icon={<Users className="text-blue-500" />} 
        />
        <StatCard 
          title="Active Positions" 
          value={stats.activePositions} 
          change={stats.positionsChange} 
          icon={<Award className="text-purple-500" />} 
        />
        <StatCard 
          title="Time to Hire" 
          value={`${stats.timeToHire} days`} 
          change={stats.timeToHireChange} 
          icon={<Clock className="text-amber-500" />} 
          isDecreasePositive={true}
        />
        <StatCard 
          title="Hired This Month" 
          value={stats.hired} 
          change={stats.hiredChange} 
          icon={<UserCheck className="text-green-500" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recruitment Timeline</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Month</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Quarter</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Year</button>
            </div>
          </div>
          <TimelineChart />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recruitment Funnel</h2>
          <RecruitmentFunnel />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Recent Candidates</h2>
          </div>
          <RecentCandidates />
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Department Metrics</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">Positions</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Candidates</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Time to Hire</button>
          </div>
        </div>
        <DepartmentMetrics />
      </div>
    </div>
  );
};

export default Dashboard;