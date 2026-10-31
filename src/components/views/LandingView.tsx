import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingHeroNetworkSvg } from '../LandingHeroNetworkSvg';
import {
  Cpu,
  Server,
  Laptop,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Coins,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setCurrentView, openAuth, startDemoTour, devices, jobs } = useApp();
  const [calculatorHours, setCalculatorHours] = useState(40);

  const totalHoursContributed = devices.reduce((sum, d) => sum + d.contributedHours, 0);
  const activeGpus = devices.filter((d) => d.status === 'online' || d.status === 'busy').length;
  const cloudCostDollars = Math.round(calculatorHours * 3.8); // standard commercial cloud GPU $3.80/hr

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Interactive Prototype Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6ECE7] text-xs font-mono text-[#18845B] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#18845B]" />
            <span>Campus Computing Network | Interactive Prototype</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#20332D] tracking-tight leading-[1.1] text-balance">
            Your Campus Has More Computing Power Than You Think.
          </h1>

          <p className="text-base sm:text-lg text-[#65756F] max-w-2xl mx-auto leading-relaxed text-balance">
            Connect unused computers. Share computing resources. Give every student and researcher access to powerful AI computing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] transition-all cursor-pointer shadow-sm flex items-center gap-2"
            >
              <span>Explore Network</span>
              <ArrowRight className="w-4 h-4 text-[#B8F0D2]" />
            </button>

            <button
              onClick={() => setCurrentView('contribute')}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#20332D] bg-white border border-[#E6ECE7] hover:bg-[#FAFBF7] hover:border-[#18845B]/40 transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Laptop className="w-4 h-4 text-[#4267D5]" />
              <span>Contribute Resources</span>
            </button>

            <button
              onClick={startDemoTour}
              className="px-5 py-3.5 rounded-xl text-sm font-semibold text-[#4267D5] bg-[#65BDEB]/15 border border-[#65BDEB]/30 hover:bg-[#65BDEB]/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#4267D5]" />
              <span>Judge Demo Tour (6 Steps)</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mt-10">
          <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs text-center">
            <span className="text-[11px] font-mono uppercase text-[#65756F] block">Connected Devices</span>
            <span className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] block mt-1">
              {devices.length} Nodes
            </span>
            <span className="text-[11px] text-[#18845B] block mt-0.5">Labs, Servers & Laptops</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs text-center">
            <span className="text-[11px] font-mono uppercase text-[#65756F] block">Available GPUs</span>
            <span className="font-heading font-bold text-2xl sm:text-3xl text-[#18845B] block mt-1">
              {activeGpus} Online
            </span>
            <span className="text-[11px] text-[#65756F] block mt-0.5">RTX 4090, A100, M2 Max</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs text-center">
            <span className="text-[11px] font-mono uppercase text-[#65756F] block">Active Workloads</span>
            <span className="font-heading font-bold text-2xl sm:text-3xl text-[#4267D5] block mt-1">
              {jobs.filter((j) => j.status === 'Running').length} Running
            </span>
            <span className="text-[11px] text-[#65756F] block mt-0.5">Vision, NLP & Bio-AI</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs text-center">
            <span className="text-[11px] font-mono uppercase text-[#65756F] block">Shared Compute Hours</span>
            <span className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] block mt-1 tabular-nums">
              {totalHoursContributed.toLocaleString()} hrs
            </span>
            <span className="text-[11px] text-[#18845B] block mt-0.5">Contributed to Date</span>
          </div>
        </div>

        {/* Hero Interactive Network Topology Visualization */}
        <div className="mt-8 max-w-5xl mx-auto">
          <LandingHeroNetworkSvg />
        </div>
      </section>

      {/* The Problem: Academic Compute Divide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF8E8E] font-semibold block">
                THE CHALLENGE
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tracking-tight">
                AI Students Are Priced Out While Campus Hardware Sits Idle.
              </h2>
              <p className="text-sm text-[#65756F] leading-relaxed">
                Training modern neural networks requires dedicated GPUs with high VRAM. Commercial cloud providers charge upwards of $3.50 to $6.00 per hour for an A100 or RTX 4090 instance—putting semester-long research out of reach for most undergraduates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1">
                  <span className="font-heading font-semibold text-[#D93838] block">High Cloud Expenses</span>
                  <p className="text-[#65756F]">Commercial cloud bills easily exceed student budgets within days of fine-tuning.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1">
                  <span className="font-heading font-semibold text-[#D93838] block">14+ Hours Idle Time</span>
                  <p className="text-[#65756F]">Computer labs and campus workstations sit powered on but completely unused overnight.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#E6ECE7] shadow-sm aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px]">
              <img
                src="/src/assets/images/campus_gpu_workstation_1793449274805.jpg"
                alt="University AI computer laboratory workstations"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                <p className="text-white text-xs font-medium">
                  University Computer Science Lab — Idle 60% of each 24-hour cycle
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution: Campus Grid Orchestrator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-[#E6ECE7] shadow-sm aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px]">
              <img
                src="/src/assets/images/server_rack_datacenter_1793449274832.jpg"
                alt="Campus high-performance computing servers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                <p className="text-white text-xs font-medium">
                  Campus Grid Mesh Coordinator uniting central racks with peripheral workstations
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#18845B] font-semibold block">
                THE SOLUTION
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tracking-tight">
                An Intelligent Mesh Connecting Campus Compute Resources.
              </h2>
              <p className="text-sm text-[#65756F] leading-relaxed">
                Campus Grid coordinates unused computing cycles across research servers, departmental lab PCs, and student laptops. Our intelligent scheduler matches jobs to right-sized GPUs, isolates workloads inside secure containers, and handles hardware disconnects with seamless checkpoint recovery.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-[#20332D]">
                  <CheckCircle2 className="w-4 h-4 text-[#18845B] shrink-0" />
                  <span>Right-sized GPU allocation based on exact VRAM and RAM requirements</span>
                </div>
                <div className="flex items-center gap-2 text-[#20332D]">
                  <CheckCircle2 className="w-4 h-4 text-[#18845B] shrink-0" />
                  <span>gVisor sandboxed container execution with zero access to host files</span>
                </div>
                <div className="flex items-center gap-2 text-[#20332D]">
                  <CheckCircle2 className="w-4 h-4 text-[#18845B] shrink-0" />
                  <span>Fair Compute Credit economy giving contributors priority access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (6 Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#4267D5] font-semibold block">
            HOW IT WORKS
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tracking-tight mt-1">
            Six Seamless Steps from Idle PC to Trained Model
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              step: '01',
              title: 'Connect a Device',
              desc: 'Laboratories or students register their machine, specify available hours, and set idle thresholds.',
              color: '#18845B',
              icon: Laptop
            },
            {
              step: '02',
              title: 'Discover Available Resources',
              desc: 'The mesh continually catalogs active VRAM, free RAM, and bandwidth across all campus nodes.',
              color: '#65BDEB',
              icon: Activity
            },
            {
              step: '03',
              title: 'Submit an AI Workload',
              desc: 'Upload PyTorch/TensorFlow scripts, attach datasets, and choose required GPU VRAM tiers.',
              color: '#4267D5',
              icon: Layers
            },
            {
              step: '04',
              title: 'Intelligent Matching',
              desc: 'Our scoring engine matches your job to an optimal host computer and provides transparent reasoning.',
              color: '#B9A5F5',
              icon: Cpu
            },
            {
              step: '05',
              title: 'Track Job & Checkpoints',
              desc: 'Monitor real-time training loss, validation accuracy, and automated model weight checkpoints.',
              color: '#FFAD70',
              icon: Clock
            },
            {
              step: '06',
              title: 'Earn or Spend Credits',
              desc: 'Contributors accumulate Compute Credits for every hour shared, redeeming them for their own heavy runs.',
              color: '#18845B',
              icon: Coins
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#E6ECE7] hover:border-[#18845B]/40 hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm" style={{ color: item.color }}>
                    {item.step}
                  </span>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-base text-[#20332D]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#65756F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Cost Savings Calculator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6ECE7]">
            <div>
              <span className="text-xs font-mono uppercase text-[#18845B] font-semibold block">
                IMPACT CALCULATOR
              </span>
              <h3 className="font-heading font-bold text-xl text-[#20332D]">
                Estimate Academic Cost Savings
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-[#FAFBF7] px-3 py-1.5 rounded-xl border border-[#E6ECE7]">
              <Sliders className="w-4 h-4 text-[#18845B]" />
              <span>Interactive Simulator</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-[#65756F]">Estimated Semester Compute Needed:</span>
              <span className="font-mono font-bold text-sm text-[#20332D]">{calculatorHours} Hours</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={calculatorHours}
              onChange={(e) => setCalculatorHours(Number(e.target.value))}
              className="w-full accent-[#18845B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#65756F]">
              <span>5 hrs (Quick Testing)</span>
              <span>100 hrs (Thesis Work)</span>
              <span>200 hrs (Full Research Group)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FF8E8E]/10 border border-[#FF8E8E]/30 space-y-1">
              <span className="text-xs text-[#65756F] block">Commercial Cloud Cost (AWS / Lambda / GCP)</span>
              <span className="font-heading font-bold text-2xl text-[#D93838] block tabular-nums">
                ${cloudCostDollars} USD
              </span>
              <span className="text-[11px] text-[#65756F] block">Based on standard $3.80/hr RTX 4090 / A100 rates</span>
            </div>

            <div className="p-4 rounded-xl bg-[#B8F0D2]/25 border border-[#18845B]/30 space-y-1">
              <span className="text-xs text-[#65756F] block">Campus Grid Net Cost</span>
              <span className="font-heading font-bold text-2xl text-[#18845B] block">
                $0 USD (100% Free via Credits)
              </span>
              <span className="text-[11px] text-[#18845B] block">
                Funded by campus academic grant + reciprocal sharing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E6ECE7] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#20332D] tracking-tight">
            Make Your Idle Computing Power Count.
          </h2>
          <p className="text-sm sm:text-base text-[#65756F] max-w-xl mx-auto leading-relaxed">
            Whether you manage an engineering laboratory or own an AI-capable laptop, join Campus Grid to accelerate student research across the university.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => openAuth('signup')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs"
            >
              Join the Network
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3 text-xs font-semibold text-[#20332D] bg-[#FAFBF7] border border-[#E6ECE7] hover:bg-white rounded-xl cursor-pointer"
            >
              Explore Live Console
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-[#E6ECE7] text-xs text-[#65756F] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-heading font-semibold text-[#20332D]">CAMPUS GRID</span>
          <span className="mx-2">·</span>
          <span>Shared AI Computing Network for Students & Researchers</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('security')} className="hover:text-[#20332D] cursor-pointer">
            Security & Privacy
          </button>
          <button onClick={() => setCurrentView('fault_recovery')} className="hover:text-[#20332D] cursor-pointer">
            Fault Recovery
          </button>
          <button onClick={() => setCurrentView('admin')} className="hover:text-[#20332D] cursor-pointer">
            Admin Console
          </button>
        </div>
      </footer>
    </div>
  );
};
