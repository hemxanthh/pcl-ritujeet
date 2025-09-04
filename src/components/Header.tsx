import React, { useState, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign out');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-neutral-900 tracking-tight">
            VINTAGE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-neutral-900 border-b-2 border-neutral-900 pb-1' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/products"
              className={`text-sm font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-neutral-900 border-b-2 border-neutral-900 pb-1' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              SHOP
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-neutral-900 border-b-2 border-neutral-900 pb-1' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-neutral-900 border-b-2 border-neutral-900 pb-1' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <HeadlessMenu as="div" className="relative">
                <div>
                  <HeadlessMenu.Button className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </HeadlessMenu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <HeadlessMenu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user.email}</p>
                        {isAdmin && (
                          <p className="text-xs text-indigo-600 mt-0.5">Admin</p>
                        )}
                      </div>
                      
                      {isAdmin && (
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <Link
                              to="/admin"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm flex items-center space-x-2'
                              )}
                            >
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                        </HeadlessMenu.Item>
                      )}
                      
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm flex items-center space-x-2'
                            )}
                          >
                            <span>My Account</span>
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                      
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'w-full text-left px-4 py-2 text-sm flex items-center space-x-2'
                            )}
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  </HeadlessMenu.Items>
                </Transition>
              </HeadlessMenu>
            ) : (
              <Link 
                to="/login" 
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
            <Link to="/cart" className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;