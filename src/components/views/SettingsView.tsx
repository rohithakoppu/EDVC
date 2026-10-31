import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  RotateCcw,
  CheckCircle2,
  Save,
  Laptop
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentUser, resetDemoData } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [college, setCollege] = useState(currentUser.college);
  const [notifJobDone, setNotifJobDone] = useState(true);
  const [notifCredits, setNotifCredits] = useState(true);
  const [notifFaults, setNotifFaults] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo state (devices, jobs, credits) back to default prototype data?')) {
      resetDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
          Platform Preferences & Settings
        </h2>
        <p className="text-xs text-[#65756F] mt-0.5">
          Manage your campus affiliation, alerts, and demo prototype storage state.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-2xl bg-[#B8F0D2]/40 border border-[#18845B] text-[#18845B] flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {resetSuccess && (
        <div className="p-3 rounded-2xl bg-[#B8F0D2]/40 border border-[#18845B] text-[#18845B] flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Demo state reset to initial factory presets!</span>
        </div>
      )}

      {/* Profile & College Affiliation */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E6ECE7]">
          <User className="w-4 h-4 text-[#18845B]" />
          <h3 className="font-heading font-semibold text-sm text-[#20332D]">
            Campus Identity
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#20332D] mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-[#20332D] mb-1">University Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#20332D] mb-1">Institutional Department / College</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E6ECE7]">
          <Bell className="w-4 h-4 text-[#4267D5]" />
          <h3 className="font-heading font-semibold text-sm text-[#20332D]">
            Notification Preferences
          </h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] cursor-pointer">
            <div>
              <span className="font-medium text-[#20332D] block">Job Completion & Failover Alerts</span>
              <span className="text-[11px] text-[#65756F]">Alert me when a neural network finishes or recovers from a node drop.</span>
            </div>
            <input
              type="checkbox"
              checked={notifJobDone}
              onChange={(e) => setNotifJobDone(e.target.checked)}
              className="rounded text-[#18845B]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] cursor-pointer">
            <div>
              <span className="font-medium text-[#20332D] block">Credit Earnings Notifications</span>
              <span className="text-[11px] text-[#65756F]">Notify me when my contributed hardware earns Compute Credits.</span>
            </div>
            <input
              type="checkbox"
              checked={notifCredits}
              onChange={(e) => setNotifCredits(e.target.checked)}
              className="rounded text-[#18845B]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] cursor-pointer">
            <div>
              <span className="font-medium text-[#20332D] block">High Campus Demand Notice</span>
              <span className="text-[11px] text-[#65756F]">Send alert when student queue spikes and incentive credit multipliers activate.</span>
            </div>
            <input
              type="checkbox"
              checked={notifFaults}
              onChange={(e) => setNotifFaults(e.target.checked)}
              className="rounded text-[#18845B]"
            />
          </label>
        </div>
      </div>

      {/* Demo State Reset Box */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E6ECE7]">
          <RotateCcw className="w-4 h-4 text-[#D93838]" />
          <h3 className="font-heading font-semibold text-sm text-[#20332D]">
            Demo Environment Controls
          </h3>
        </div>

        <p className="text-[#65756F] leading-relaxed">
          Campus Grid saves your simulated jobs, newly registered hardware, credit transactions, and notifications in your browser's <code className="font-mono bg-[#FAFBF7] px-1.5 py-0.5 rounded border border-[#E6ECE7]">localStorage</code>. Resetting clears any modified state and restores the original demo cluster.
        </p>

        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold text-[#D93838] bg-[#FF8E8E]/10 border border-[#FF8E8E]/40 hover:bg-[#FF8E8E]/20 rounded-xl cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data to Initial Presets</span>
        </button>
      </div>
    </div>
  );
};
