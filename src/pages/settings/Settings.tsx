import React, { useState } from 'react';
import { UserCog, Shield, Users, Building, Database, Mail, Briefcase, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Settings</h2>
            </div>
            <nav className="p-2">
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <UserCog className="h-5 w-5 mr-3" />
                Profile
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <Shield className="h-5 w-5 mr-3" />
                Security
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('users')}
              >
                <Users className="h-5 w-5 mr-3" />
                Users & Permissions
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'company' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('company')}
              >
                <Building className="h-5 w-5 mr-3" />
                Company
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'data' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('data')}
              >
                <Database className="h-5 w-5 mr-3" />
                Data Management
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'email' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('email')}
              >
                <Mail className="h-5 w-5 mr-3" />
                Email Templates
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'departments' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('departments')}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                Departments & Roles
              </button>
              <button
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                  activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="Admin User"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue="admin@example.com"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="timezone" className="text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-07:00) Mountain Time</option>
                      <option>(GMT-06:00) Central Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT) Greenwich Mean Time</option>
                      <option>(GMT+01:00) Central European Time</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700">
                      Receive email notifications
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 mb-1">Protect your account with 2FA</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
                        Enable
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <div>
                          <p className="text-gray-800 font-medium">Current session</p>
                          <p className="text-sm text-gray-600">
                            Last active: Just now
                          </p>
                          <p className="text-xs text-gray-500">
                            Mac OS • Chrome • New York, USA
                          </p>
                        </div>
                      </div>
                      
                      <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                        Sign out of all sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'profile' && activeTab !== 'security' && (
              <div className="text-center py-16">
                <div className="h-12 w-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  {activeTab === 'users' && <Users className="h-6 w-6" />}
                  {activeTab === 'company' && <Building className="h-6 w-6" />}
                  {activeTab === 'data' && <Database className="h-6 w-6" />}
                  {activeTab === 'email' && <Mail className="h-6 w-6" />}
                  {activeTab === 'departments' && <Briefcase className="h-6 w-6" />}
                  {activeTab === 'notifications' && <Bell className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {activeTab === 'users' && 'Users & Permissions'}
                  {activeTab === 'company' && 'Company Settings'}
                  {activeTab === 'data' && 'Data Management'}
                  {activeTab === 'email' && 'Email Templates'}
                  {activeTab === 'departments' && 'Departments & Roles'}
                  {activeTab === 'notifications' && 'Notification Preferences'}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  This section would contain the settings for {activeTab === 'users' && 'managing users and their permissions'}
                  {activeTab === 'company' && 'company information and branding'}
                  {activeTab === 'data' && 'data import/export and storage options'}
                  {activeTab === 'email' && 'customizable email templates for different communication types'}
                  {activeTab === 'departments' && 'configuring departments, roles, and hiring workflows'}
                  {activeTab === 'notifications' && 'configuring notification preferences and alerts'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;