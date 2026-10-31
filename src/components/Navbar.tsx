import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Menu, X, ArrowRight, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setCurrentView, openAuth, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Network', action: () => setCurrentView('network') },
    { label: 'Resource Matcher', action: () => setCurrentView('explorer') },
    { label: 'Fault Recovery', action: () => setCurrentView('fault_recovery') },
    { label: 'Credits Economy', action: () => setCurrentView('credits') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFBF7]/90 backdrop-blur-md border-b border-[#E6ECE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#18845B] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-[#B8F0D2]" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-[#20332D] tracking-tight whitespace-nowrap block">
                CAMPUS GRID
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#65756F]">
          {navLinks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (item.action) item.action();
                else if (item.href) {
                  const el = document.querySelector(item.href);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else setCurrentView('landing');
                }
              }}
              className="hover:text-[#18845B] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Console Entry */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#20332D] bg-white border border-[#E6ECE7] rounded-xl hover:bg-[#FAFBF7] hover:border-[#18845B]/40 transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            <span>Live Console</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#18845B]" />
          </button>

          <button
            onClick={() => openAuth('login')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5 text-[#B8F0D2]" />
            <span>Sign In / Demo</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#20332D] hover:bg-slate-100 rounded-lg cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E6ECE7] bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (item.action) item.action();
                }}
                className="text-left px-3 py-2 text-sm font-medium text-[#20332D] hover:bg-[#FAFBF7] rounded-lg cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E6ECE7] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('dashboard');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#20332D] bg-[#FAFBF7] border border-[#E6ECE7] rounded-xl"
            >
              Open Campus Grid Console
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuth('login');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#18845B] rounded-xl"
            >
              Sign In or Select Demo Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
