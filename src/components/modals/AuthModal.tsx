import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Shield, GraduationCap, Laptop, Sparkles, Check, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuth, authModalTab, loginAsDemoRole, currentUser } = useApp();
  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('School of Computing & Engineering');
  const [studentId, setStudentId] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your university email and password.');
      return;
    }
    // Perform simulated login
    loginAsDemoRole(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E6ECE7] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Modal Top */}
        <div className="p-6 pb-4 border-b border-[#E6ECE7] flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#20332D]">
              {tab === 'login' ? 'Sign In to Campus Grid' : 'Register Campus Account'}
            </h3>
            <p className="text-xs text-[#65756F] mt-0.5">
              Access university GPU clusters, laboratories, and student compute nodes.
            </p>
          </div>
          <button
            onClick={closeAuth}
            className="p-1.5 rounded-lg text-[#65756F] hover:bg-[#FAFBF7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Judge Quick Access Strip */}
        <div className="p-4 bg-[#FAFBF7] border-b border-[#E6ECE7]">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#18845B]" />
            <span className="font-heading font-semibold text-xs text-[#20332D]">
              One-Click Demo Entry for Judges:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => loginAsDemoRole('student')}
              className="p-2.5 rounded-xl bg-white border border-[#E6ECE7] hover:border-[#18845B] hover:shadow-xs transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-[#18845B]">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="font-heading font-semibold text-[11px]">Student</span>
              </div>
              <span className="text-[10px] text-[#65756F] block mt-0.5 truncate">Maya Lin</span>
            </button>

            <button
              onClick={() => loginAsDemoRole('contributor')}
              className="p-2.5 rounded-xl bg-white border border-[#E6ECE7] hover:border-[#4267D5] hover:shadow-xs transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-[#4267D5]">
                <Laptop className="w-3.5 h-3.5" />
                <span className="font-heading font-semibold text-[11px]">Contributor</span>
              </div>
              <span className="text-[10px] text-[#65756F] block mt-0.5 truncate">Prof. Vance</span>
            </button>

            <button
              onClick={() => loginAsDemoRole('admin')}
              className="p-2.5 rounded-xl bg-white border border-[#E6ECE7] hover:border-[#FFAD70] hover:shadow-xs transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-[#FFAD70]">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-heading font-semibold text-[11px]">Admin</span>
              </div>
              <span className="text-[10px] text-[#65756F] block mt-0.5 truncate">Dean Sterling</span>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 flex border-b border-[#E6ECE7] gap-4">
          <button
            onClick={() => setTab('login')}
            className={`pb-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              tab === 'login' ? 'border-[#18845B] text-[#18845B]' : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            Sign In with Email
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`pb-2.5 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              tab === 'signup' ? 'border-[#18845B] text-[#18845B]' : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-[#FF8E8E]/20 border border-[#FF8E8E] text-[#D93838]">
              {errorMsg}
            </div>
          )}

          {tab === 'signup' && (
            <div>
              <label className="block font-medium text-[#20332D] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3 py-2 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-[#20332D] mb-1">University Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@university.edu"
              className="w-full px-3 py-2 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-medium text-[#20332D] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
            />
          </div>

          {tab === 'signup' && (
            <>
              <div>
                <label className="block font-medium text-[#20332D] mb-1">College or Department</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#20332D] mb-1">Primary Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['student', 'contributor', 'admin'] as UserRole[]).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setSelectedRole(r)}
                      className={`py-1.5 px-2 rounded-lg border text-center capitalize cursor-pointer ${
                        selectedRole === r ? 'bg-[#18845B] text-white border-[#18845B]' : 'bg-[#FAFBF7] border-[#E6ECE7] text-[#20332D]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[#65756F]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#E6ECE7] text-[#18845B]"
              />
              <span>Remember demo session</span>
            </label>
            <span className="text-[11px] text-[#65756F]">Simulated auth</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2"
          >
            <span>{tab === 'login' ? 'Sign In to Network' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
