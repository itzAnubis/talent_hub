import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BarChart, Settings, 
  LogOut, Menu, X, Bell, Search, Truck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Candidates', icon: Users, href: '/dashboard/candidates' },
    { name: 'Suppliers', icon: Truck, href: '/dashboard/suppliers' },

    // { name: 'Communications', icon: MessageSquare, href: '/dashboard/communications' },
    { name: 'Reports', icon: BarChart, href: '/dashboard/reports' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'New candidate application',
      description: 'John Smith applied for Senior Developer position',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Interview scheduled',
      description: 'Technical interview with Emily Brown tomorrow at 2:00 PM',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Candidate assessment completed',
      description: 'Michael Johnson completed the technical assessment',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 4,
      title: 'New position opened',
      description: 'Marketing department opened a new Social Media Manager position',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/dashboard" className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <span className="ml-2 text-lg font-bold text-gray-800">TalentHub</span>
            </Link>
            
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  end={item.href === '/dashboard'}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                {/* Search */}
                <div className="hidden md:block ml-4">
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                {/* Notifications dropdown */}
                <div className="relative ml-3">
                  <button
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative"
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setUserMenuOpen(false);
                    }}
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                    )}
                  </button>
                  
                  {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-2 px-3 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <a
                            key={notification.id}
                            href="#"
                            className={`block px-4 py-3 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex justify-between">
                              <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                          </a>
                        ))}
                      </div>
                      <div className="py-2 px-3 border-t border-gray-100">
                        <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Profile dropdown */}
                <div className="relative ml-3">
                  <button
                    className="flex items-center gap-2 text-sm rounded-full focus:outline-none"
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setNotificationsOpen(false);
                    }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      {currentUser?.name?.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-800">{currentUser?.name}</div>
                      <div className="text-xs text-gray-500">{currentUser?.role}</div>
                    </div>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;