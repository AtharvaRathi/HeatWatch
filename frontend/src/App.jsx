import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';

// Layout
import Header from './components/Layout/Header';

// Pages
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import AlertsPage from './pages/AlertsPage';
import AdminPage from './pages/AdminPage';
import AdvisoryPage from './pages/AdvisoryPage';
import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PrivateRoute = ({ children, requireAdmin }) => {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/register" element={<RegisterPage />} /> */}
              
              {/* Protected Routes */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/history" element={
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              } />
              <Route path="/alerts" element={
                <PrivateRoute>
                  <AlertsPage />
                </PrivateRoute>
              } />
              <Route path="/advisory" element={<AdvisoryPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <PrivateRoute requireAdmin>
                  <AdminPage />
                </PrivateRoute>
              } />
              
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
