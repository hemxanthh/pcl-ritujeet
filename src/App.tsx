import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/admin/Dashboard';
import TestConnection from './pages/TestConnection';
import ProductManagement from './pages/admin/ProductManagement';
import ProductForm from './pages/admin/ProductForm';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Users from './pages/admin/Users';
import Orders from './pages/admin/Orders';

// Main App Component
const AppContent = () => {
  console.log('AppContent rendering...');
  const { user, isAdmin } = useAuth();
  console.log('Auth state:', { user, isAdmin });

  return (
    <CartProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-neutral-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/test" element={<TestConnection />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
              <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
              <Route path="/reset-password" element={user ? <Navigate to="/" /> : <ResetPassword />} />
              
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute adminOnly>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<ProductManagement />} />
                      <Route path="products/new" element={<ProductForm />} />
                      <Route path="products/edit/:id" element={<ProductForm />} />
                      <Route path="users" element={<Users />} />
                      <Route path="orders" element={<Orders />} />
                      {/* Add more admin routes here */}
                      <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

// App Wrapper with Providers
const App = () => {
  console.log('App component mounting...');
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;