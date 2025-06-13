import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Candidates from './pages/candidates/Candidates';
import CandidateDetails from './pages/candidates/CandidateDetails';
import Suppliers from './pages/suppliers/Suppliers';
import SupplierDetails from './pages/suppliers/SupplierDetails';
// import Communications from './pages/communications/Communications';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="candidates/:id" element={<CandidateDetails />} />
              {/* <Route path="communications" element={<Communications />} /> */}
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="suppliers/:id" element={<SupplierDetails />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
