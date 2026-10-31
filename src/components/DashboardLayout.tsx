import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Server,
  Compass,
  UploadCloud,
  Layers,
  Laptop,
  Coins,
  ShieldCheck,
  Activity,
  Settings,
  ShieldAlert,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  LogOut,
  ExternalLink,
  ChevronDown,
  Sparkles,
  RefreshCw,
  PlusCircle,
  Menu,
  X,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    currentView,
    setCurrentView,
    currentUser,
    switchRole,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    triggerFaultSimulation,
    startDemoTour,
    claimDailyStipend,
    logout,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'network', label: 'Compute Network', icon: Server, badge: '8 Nodes' },
    { id: 'explorer', label: 'Resource Explorer', icon: Compass },
    { id: 'submit', label: 'Submit a Job', icon: UploadCloud, highlight: true },
    { id: 'jobs', label: 'My Jobs', icon: Layers },
    { id: 'contribute', label: 'My Devices (Share)', icon: Laptop },
    { id: 'credits', label: 'Compute Credits', icon: Coins },
    { id: 'fault_recovery', label: 'Fault Recovery', icon: ShieldAlert, accent: 'coral' },
    { id: 'security', label: 'Security & Privacy', icon: ShieldCheck },
    { id: 'admin', label: 'Campus Admin', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getViewTitle = (id: string) => {
    switch (id) {
      case 'dashboard': return 'Campus Compute Overview';
      case 'network': return 'Connected Node Network';
      case 'explorer': return 'Intelligent Resource Explorer';
      case 'submit': return 'Submit AI/ML Workload';
      case 'jobs': return 'Workload Queue & Execution';
      case 'contribute': return 'Device Contribution & Sharing';
      case 'credits': return 'Compute Credits Economy';
      case 'fault_recovery': return 'Fault Recovery & Failover Simulator';
      case 'security': return 'Security Architecture & Controls';
      case 'admin': return 'Campus Administration & Node Approval';
      case 'settings': return 'Platform Preferences';
      default: return 'Campus Grid Console';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] flex flex-col md:flex-row text-[#20332D]">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E6ECE7] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg border border-[#E6ECE7] hover:bg-[#FAFBF7] cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setCurrentView('landing')}
            className="font-heading font-bold text-base text-[#18845B] flex items-center gap-1.5"
          >
            <span>CAMPUS GRID</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('credits')}
            className="px-2.5 py-1 text-xs font-mono font-medium bg-[#B8F0D2]/50 text-[#18845B] rounded-lg border border-[#B8F0D2] flex items-center gap-1"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>{currentUser.creditsBalance}</span>
          </button>
        </div>
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-white border-r border-[#E6ECE7] flex flex-col shrink-0 transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="p-5 border-b border-[#E6ECE7] flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('landing');
              setMobileSidebarOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#18845B] text-white flex items-center justify-center shadow-xs">
              <Server className="w-4 h-4 text-[#B8F0D2]" />
            </div>
            <div>
              <span className="font-heading font-bold text-base text-[#20332D] tracking-tight block">
                CAMPUS GRID
              </span>
              <span className="text-[11px] text-[#65756F] block">AI Compute Network</span>
            </div>
          </button>
        </div>

        {/* User Role Card inside sidebar */}
        <div className="px-4 py-3 border-b border-[#E6ECE7] bg-[#FAFBF7]/60">
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white border border-[#E6ECE7] hover:border-[#18845B]/40 text-left transition-all cursor-pointer shadow-xs"
            >
              <div className="truncate">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#65756F] block">
                  Active Persona
                </span>
                <span className="text-xs font-semibold text-[#20332D] capitalize truncate block">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-[#18845B] font-medium block capitalize">
                  {currentUser.role === 'student' ? 'Student Researcher' : currentUser.role === 'contributor' ? 'Hardware Contributor' : 'Campus Administrator'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#65756F] shrink-0" />
            </button>

            {/* Role switch dropdown */}
            {roleMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6ECE7] rounded-xl shadow-lg p-1.5 z-40 text-xs">
                <div className="px-2.5 py-1 text-[10px] font-mono text-[#65756F]">SWITCH DEMO ROLE</div>
                {(['student', 'contributor', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left cursor-pointer transition-colors ${
                      currentUser.role === r ? 'bg-[#FAFBF7] text-[#18845B] font-semibold' : 'text-[#20332D] hover:bg-[#FAFBF7]'
                    }`}
                  >
                    <span className="capitalize">{r === 'student' ? 'Student / Researcher' : r === 'contributor' ? 'Resource Contributor' : 'Campus Admin'}</span>
                    {currentUser.role === r && <UserCheck className="w-3.5 h-3.5 text-[#18845B]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#18845B] text-white shadow-xs'
                    : item.highlight
                    ? 'bg-[#FAFBF7] text-[#18845B] border border-[#B8F0D2] hover:bg-[#B8F0D2]/20'
                    : 'text-[#65756F] hover:text-[#20332D] hover:bg-[#FAFBF7]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.accent === 'coral' ? 'text-[#FF8E8E]' : 'text-[#65756F]'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#FAFBF7] border border-[#E6ECE7] text-[#65756F]">
                    {item.badge}
                  </span>
                )}
                {item.accent === 'coral' && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#FF8E8E]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom utility strip in sidebar */}
        <div className="p-3 border-t border-[#E6ECE7] space-y-2 bg-[#FAFBF7]/40">
          <button
            onClick={startDemoTour}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#4267D5] bg-white border border-[#65BDEB]/40 rounded-xl hover:bg-[#FAFBF7] transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4267D5]" />
            <span>Judge Demo Walkthrough</span>
          </button>

          <div className="flex items-center justify-between pt-1 text-xs text-[#65756F]">
            <button
              onClick={() => setCurrentView('landing')}
              className="hover:text-[#18845B] flex items-center gap-1 cursor-pointer"
            >
              <span>Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={logout}
              className="hover:text-[#FF8E8E] flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Viewport Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#FAFBF7]/90 backdrop-blur-md border-b border-[#E6ECE7] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Breadcrumb / Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-[#65756F]">
              <span>Campus Grid</span>
              <span>/</span>
              <span className="text-[#20332D] font-medium capitalize">{currentView}</span>
            </div>
            <h1 className="font-heading font-semibold text-base sm:text-lg text-[#20332D] tracking-tight">
              {getViewTitle(currentView)}
            </h1>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Fault Recovery Test Trigger */}
            <button
              onClick={triggerFaultSimulation}
              title="Test simulated node disconnect and auto-failover"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#20332D] bg-white border border-[#FF8E8E]/60 rounded-xl hover:bg-[#FF8E8E]/10 transition-all cursor-pointer shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#FF8E8E]" />
              <span>Simulate Node Failover</span>
            </button>

            {/* Credit Balance Badge */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E6ECE7] rounded-xl px-3 py-1.5 shadow-xs">
              <Coins className="w-4 h-4 text-[#FFAD70]" />
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-semibold text-xs sm:text-sm text-[#20332D] tabular-nums">
                  {currentUser.creditsBalance}
                </span>
                <span className="text-[10px] text-[#65756F]">Credits</span>
              </div>
              <button
                onClick={claimDailyStipend}
                title="Claim +25 Academic Stipend"
                className="ml-1 p-0.5 text-[#18845B] hover:text-[#146e4b] cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 bg-white border border-[#E6ECE7] rounded-xl hover:bg-[#FAFBF7] cursor-pointer shadow-xs"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4 text-[#65756F]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#18845B] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E6ECE7] rounded-2xl shadow-xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E6ECE7]">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-sm text-[#20332D]">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#B8F0D2] text-[#18845B]">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-[#65756F] hover:text-[#20332D] cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-[#E6ECE7] my-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-[#65756F]">
                        No active notifications.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            markNotificationRead(item.id);
                            if (item.actionView) setCurrentView(item.actionView);
                            setNotificationsOpen(false);
                          }}
                          className={`py-2.5 px-1.5 flex items-start gap-2.5 hover:bg-[#FAFBF7] cursor-pointer rounded-lg transition-colors ${
                            !item.read ? 'bg-[#FAFBF7]/60' : ''
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#18845B]" />}
                            {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#FFAD70]" />}
                            {item.type === 'error' && <ShieldAlert className="w-4 h-4 text-[#FF8E8E]" />}
                            {item.type === 'info' && <Info className="w-4 h-4 text-[#4267D5]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-medium text-[#20332D] truncate">{item.title}</span>
                              <span className="text-[10px] text-[#65756F] shrink-0 font-mono">{item.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-[#65756F] mt-0.5 line-clamp-2">{item.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Pill */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E6ECE7]">
              <div className="w-8 h-8 rounded-full bg-[#B8F0D2] text-[#18845B] font-heading font-bold text-xs flex items-center justify-center border border-[#18845B]/20">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
