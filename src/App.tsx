import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuthContext } from './contexts/AuthContext'

// Layouts
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import DashboardLayout from './components/Layout/DashboardLayout'

// Public Pages
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Support from './pages/Support'
import TermsOfService from './pages/Legal/TermsOfService'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'

// Dashboard Pages
import ClientDashboard from './pages/Dashboard/ClientDashboard'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import InvestPage from './pages/Dashboard/Client/Invest'
import ReportsPage from './pages/Dashboard/Client/Reports'
import SettingsPage from './pages/Dashboard/Client/Settings'
import UserManagementPage from './pages/Dashboard/Admin/UserManagement'
import PlanManagementPage from './pages/Dashboard/Admin/PlanManagement'

// --- Components ---

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode
  requireAdmin?: boolean 
}> = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && user.user_metadata?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

const PublicLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-900">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)

const DashboardRouter: React.FC = () => {
  const { user } = useAuthContext()
  return user?.user_metadata?.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />
}

// --- Main App Component ---

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          {/* Auth Routes (no main layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Client Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardRouter />} />
            <Route path="invest" element={<InvestPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <DashboardLayout />
              </ProtectedRoute>
            } 
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="plans" element={<PlanManagementPage />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
