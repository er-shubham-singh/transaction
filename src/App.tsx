import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/reducers/rootReducer';
import { logout } from './store/actions/walletActions';
import React, { useState } from 'react';
import { CURRENCIES, format, convert } from './utils/currency';
import type { Currency } from './types';
import { addFunds, exchangeFunds } from './store/actions/walletActions';
import { Home, List, Wallet, LogOut, X } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useSelector((s: RootState) => s.wallet.session?.phone);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/app" className="font-semibold text-lg text-cyan-400">
            💼 Wallet
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <NavLink
              to="/app"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400 font-bold transition-colors duration-200'
                  : 'text-gray-400 hover:text-white transition-colors duration-200'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/transactions"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400 font-bold transition-colors duration-200'
                  : 'text-gray-400 hover:text-white transition-colors duration-200'
              }
            >
              Transactions
            </NavLink>
            <NavLink
              to="/app/withdraw"
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-400 font-bold transition-colors duration-200'
                  : 'text-gray-400 hover:text-white transition-colors duration-200'
              }
            >
              Withdraw
            </NavLink>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">{phone}</span>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
{/* Mobile Menu (Drawer) */}
<div
  className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-300 ${
    isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black bg-opacity-50"
    onClick={() => setIsMobileMenuOpen(false)}
  ></div>

  {/* Drawer */}
  <div
    className={`absolute top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ${
      isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
    } flex flex-col`}
  >
    {/* Header with Close Button */}
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <span className="text-cyan-400 font-semibold">Menu</span>
      <button
        className="text-gray-400 hover:text-white"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    {/* Menu Items */}
    <nav className="flex flex-col gap-4 text-sm p-6 flex-1">
      <NavLink
        to="/app"
        className={({ isActive }) =>
          `flex items-center gap-3 ${
            isActive
              ? "text-cyan-400 font-bold"
              : "text-gray-400 hover:text-white"
          } transition-colors duration-200`
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Home className="w-5 h-5" /> Dashboard
      </NavLink>
      <NavLink
        to="/app/transactions"
        className={({ isActive }) =>
          `flex items-center gap-3 ${
            isActive
              ? "text-cyan-400 font-bold"
              : "text-gray-400 hover:text-white"
          } transition-colors duration-200`
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <List className="w-5 h-5" /> Transactions
      </NavLink>
      <NavLink
        to="/app/withdraw"
        className={({ isActive }) =>
          `flex items-center gap-3 ${
            isActive
              ? "text-cyan-400 font-bold"
              : "text-gray-400 hover:text-white"
          } transition-colors duration-200`
        }
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Wallet className="w-5 h-5" /> Withdraw
      </NavLink>
      <span className="text-gray-400 mt-4">{phone}</span>
    </nav>

    {/* Logout pinned bottom */}
    <div className="p-6 border-t border-gray-700">
      <button
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" /> Logout
      </button>
    </div>
  </div>
</div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6 border-t border-gray-700 mt-8">
        LocalStorage • Redux • Demo
      </footer>
    </div>
  );
}