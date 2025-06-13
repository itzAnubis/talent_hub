import React, { useState } from 'react';
import { Download, Calendar, Filter, BarChart3, PieChart, LineChart, RefreshCw } from 'lucide-react';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('month');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="inline-flex p-1 bg-gray-100 rounded-md">
          <button
            className={`px-3 py-1.5 text-sm rounded-md ${
              timeframe === 'week' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('week')}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-md ${
              timeframe === 'month' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('month')}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-md ${
              timeframe === 'quarter' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('quarter')}
          >
            Quarterly
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-md ${
              timeframe === 'year' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('year')}
          >
            Yearly
          </button>
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-md"
            placeholder="Custom date range"
          />
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="border-b">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm relative whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="inline-block h-4 w-4 mr-1" />
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm relative whitespace-nowrap ${
                activeTab === 'sources' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('sources')}
            >
              <PieChart className="inline-block h-4 w-4 mr-1" />
              Recruitment Sources
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm relative whitespace-nowrap ${
                activeTab === 'pipeline' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('pipeline')}
            >
              <LineChart className="inline-block h-4 w-4 mr-1" />
              Hiring Pipeline
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm relative whitespace-nowrap ${
                activeTab === 'departments' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('departments')}
            >
              <BarChart3 className="inline-block h-4 w-4 mr-1" />
              Departments
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">
              {activeTab === 'overview' && 'Recruitment Overview'}
              {activeTab === 'sources' && 'Candidate Sources'}
              {activeTab === 'pipeline' && 'Hiring Pipeline Metrics'}
              {activeTab === 'departments' && 'Department Performance'}
            </h2>
            
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {activeTab === 'overview' && (
            <div className="text-center py-16">
              <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Report Visualization</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This is where the recruitment overview charts and metrics would be displayed.
              </p>
            </div>
          )}
          
          {activeTab === 'sources' && (
            <div className="text-center py-16">
              <div className="h-12 w-12 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Candidate Sources</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This is where the candidate source distribution charts would be displayed.
              </p>
            </div>
          )}
          
          {activeTab === 'pipeline' && (
            <div className="text-center py-16">
              <div className="h-12 w-12 mx-auto mb-4 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Hiring Pipeline</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This is where the hiring pipeline metrics and flow charts would be displayed.
              </p>
            </div>
          )}
          
          {activeTab === 'departments' && (
            <div className="text-center py-16">
              <div className="h-12 w-12 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Department Performance</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This is where the department hiring performance charts would be displayed.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Time to Hire</span>
                <span className="text-sm font-medium">28 days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Cost per Hire</span>
                <span className="text-sm font-medium">$4,200</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Offer Acceptance Rate</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Interview to Hire Ratio</span>
                <span className="text-sm font-medium">4:1</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-amber-500 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Time to Fill by Department</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Engineering</span>
                <span className="text-sm font-medium">35 days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Product</span>
                <span className="text-sm font-medium">28 days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Marketing</span>
                <span className="text-sm font-medium">25 days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Sales</span>
                <span className="text-sm font-medium">21 days</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Top Performing Job Boards</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">L</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">LinkedIn</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-600 font-medium">32%</span>
                  <span className="mx-1">of hires •</span>
                  <span>42 candidates</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-indigo-100 flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-bold">I</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">Indeed</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-600 font-medium">28%</span>
                  <span className="mx-1">of hires •</span>
                  <span>38 candidates</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">R</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">Referrals</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-600 font-medium">20%</span>
                  <span className="mx-1">of hires •</span>
                  <span>15 candidates</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center mr-3">
                <span className="text-amber-600 font-bold">G</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">Glassdoor</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="text-green-600 font-medium">12%</span>
                  <span className="mx-1">of hires •</span>
                  <span>24 candidates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;