import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  Server,
  Laptop,
  Layers,
  Coins,
  Activity,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OverviewDashboardView: React.FC = () => {
  const {
    devices,
    jobs,
    currentUser,
    setCurrentView,
    setSelectedJobModal,
    setSelectedDeviceModal,
    claimDailyStipend,
    triggerFaultSimulation,
    faultState
  } = useApp();

  const totalVramGb = devices.reduce((sum, d) => sum + d.gpuVramGb, 0);
  const onlineDevices = devices.filter((d) => d.status === 'online');
  const busyDevices = devices.filter((d) => d.status === 'busy');
  const runningJobs = jobs.filter((j) => j.status === 'Running');
  const avgUtilization = Math.round(
    devices.reduce((sum, d) => sum + d.utilizationPct, 0) / (devices.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if Fault Simulation Active */}
      {faultState.active && (
        <div className="p-4 rounded-2xl bg-[#FF8E8E]/15 border border-[#FF8E8E]/40 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D93838] shrink-0" />
            <div>
              <span className="font-heading font-semibold text-xs text-[#20332D] block">
                Fault Recovery Simulation Active: {faultState.stage.toUpperCase()}
              </span>
              <span className="text-xs text-[#65756F]">{faultState.message}</span>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('fault_recovery')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#D93838] rounded-xl hover:bg-[#b52a2a] cursor-pointer shrink-0"
          >
            Open Simulator
          </button>
        </div>
      )}

      {/* Overview Top 6 KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Widget 1 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">AVAILABLE VRAM</span>
            <Cpu className="w-4 h-4 text-[#18845B]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {totalVramGb} GB
          </div>
          <span className="text-[10px] text-[#18845B] block font-medium">Distributed AI Pool</span>
        </div>

        {/* Widget 2 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">CONNECTED NODES</span>
            <Server className="w-4 h-4 text-[#4267D5]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {devices.length}
          </div>
          <span className="text-[10px] text-[#65756F] block">
            {onlineDevices.length} Ready · {busyDevices.length} Busy
          </span>
        </div>

        {/* Widget 3 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">ACTIVE JOBS</span>
            <Layers className="w-4 h-4 text-[#65BDEB]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {runningJobs.length}
          </div>
          <span className="text-[10px] text-[#18845B] block font-medium">
            {jobs.filter((j) => j.status === 'Completed').length} Completed
          </span>
        </div>

        {/* Widget 4 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">COMPUTE CREDITS</span>
            <Coins className="w-4 h-4 text-[#FFAD70]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {currentUser.creditsBalance}
          </div>
          <button
            onClick={claimDailyStipend}
            className="text-[10px] text-[#18845B] hover:underline font-medium block cursor-pointer"
          >
            + Claim +25 Stipend
          </button>
        </div>

        {/* Widget 5 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">CLUSTER LOAD</span>
            <Activity className="w-4 h-4 text-[#B9A5F5]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {avgUtilization}%
          </div>
          <div className="w-full bg-[#FAFBF7] h-1.5 rounded-full overflow-hidden border border-[#E6ECE7]">
            <div className="bg-[#18845B] h-full rounded-full" style={{ width: `${avgUtilization}%` }} />
          </div>
        </div>

        {/* Widget 6 */}
        <div className="p-4 bg-white rounded-2xl border border-[#E6ECE7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-[11px] font-mono">SHARED TIME</span>
            <Clock className="w-4 h-4 text-[#18845B]" />
          </div>
          <div className="font-heading font-bold text-2xl text-[#20332D] tabular-nums">
            {devices.reduce((s, d) => s + d.contributedHours, 0)} hrs
          </div>
          <span className="text-[10px] text-[#18845B] block font-medium">Reciprocal Economy</span>
        </div>
      </div>

      {/* 2-Column Split: Resource Utilization Chart + Node Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 24-Hour Cluster Telemetry Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E6ECE7]">
            <div>
              <h2 className="font-heading font-bold text-base text-[#20332D]">
                24-Hour Campus Computing Utilization
              </h2>
              <p className="text-xs text-[#65756F]">Real-time telemetry aggregated across university subnets</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#18845B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18845B]" />
                Actual GPU Load
              </span>
              <span className="flex items-center gap-1.5 text-[#65756F]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6ECE7]" />
                Idle Capacity
              </span>
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="relative w-full aspect-[21/9] min-h-[200px]">
            <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8F0D2" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FAFBF7" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="40" y1="30" x2="580" y2="30" stroke="#E6ECE7" strokeDasharray="3 3" />
              <line x1="40" y1="80" x2="580" y2="80" stroke="#E6ECE7" strokeDasharray="3 3" />
              <line x1="40" y1="130" x2="580" y2="130" stroke="#E6ECE7" strokeDasharray="3 3" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="#E6ECE7" />

              {/* Y-Axis Labels */}
              <text x="30" y="34" textAnchor="end" className="text-[9px] font-mono fill-[#65756F]">100%</text>
              <text x="30" y="84" textAnchor="end" className="text-[9px] font-mono fill-[#65756F]">66%</text>
              <text x="30" y="134" textAnchor="end" className="text-[9px] font-mono fill-[#65756F]">33%</text>
              <text x="30" y="184" textAnchor="end" className="text-[9px] font-mono fill-[#65756F]">0%</text>

              {/* Area Fill */}
              <path
                d="M 40 160 Q 100 140, 160 110 T 280 65 T 380 90 T 480 50 T 580 80 L 580 180 L 40 180 Z"
                fill="url(#chartGradient)"
              />

              {/* Area Line */}
              <path
                d="M 40 160 Q 100 140, 160 110 T 280 65 T 380 90 T 480 50 T 580 80"
                fill="none"
                stroke="#18845B"
                strokeWidth="2.5"
              />

              {/* Interactive Data Points */}
              {[
                { x: 40, y: 160, time: '00:00', load: '18%' },
                { x: 160, y: 110, time: '06:00', load: '45%' },
                { x: 280, y: 65, time: '12:00', load: '78%' },
                { x: 380, y: 90, time: '16:00', load: '58%' },
                { x: 480, y: 50, time: '20:00', load: '85%' },
                { x: 580, y: 80, time: 'Now', load: `${avgUtilization}%` },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#18845B" strokeWidth="2" />
                  <text x={pt.x} y="195" textAnchor="middle" className="text-[9px] font-mono fill-[#65756F]">
                    {pt.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#65756F]">
            <span>Peak Campus Activity: 20:00 – 02:00 (Student Night Research Cycles)</span>
            <span className="font-mono text-[#18845B] font-medium">Coordinator Latency: ~14ms</span>
          </div>
        </div>

        {/* Quick Launch & Node Status */}
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6ECE7]">
              <h2 className="font-heading font-bold text-base text-[#20332D]">Quick Actions</h2>
              <span className="text-[10px] font-mono text-[#18845B]">One-Click</span>
            </div>

            <button
              onClick={() => setCurrentView('submit')}
              className="w-full p-3 rounded-2xl bg-[#18845B] text-white hover:bg-[#146e4b] transition-all text-left flex items-center justify-between cursor-pointer shadow-xs group"
            >
              <div>
                <span className="font-heading font-semibold text-xs block">Submit AI Workload</span>
                <span className="text-[11px] text-[#B8F0D2] block">Queue PyTorch/TF training job</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentView('explorer')}
              className="w-full p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] hover:border-[#18845B] transition-all text-left flex items-center justify-between cursor-pointer group"
            >
              <div>
                <span className="font-heading font-semibold text-xs text-[#20332D] block">Resource Explorer</span>
                <span className="text-[11px] text-[#65756F] block">Match VRAM & RAM specs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#65756F] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentView('contribute')}
              className="w-full p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] hover:border-[#4267D5] transition-all text-left flex items-center justify-between cursor-pointer group"
            >
              <div>
                <span className="font-heading font-semibold text-xs text-[#20332D] block">Register Workstation</span>
                <span className="text-[11px] text-[#65756F] block">Share idle GPU to earn credits</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#65756F] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#20332D] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#18845B]" />
                Zero Host File Access
              </span>
              <span className="font-mono text-[10px] text-[#18845B]">Sandboxed</span>
            </div>
            <p className="text-[11px] text-[#65756F] leading-tight">
              Workloads execute in ephemeral micro-VM containers. Your personal files remain untouched.
            </p>
          </div>
        </div>
      </div>

      {/* Active Workload Queue + Connected Device Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Workloads */}
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6ECE7]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#18845B]" />
              <h2 className="font-heading font-bold text-base text-[#20332D]">Active Campus Workloads</h2>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="text-xs text-[#18845B] hover:underline font-medium cursor-pointer"
            >
              View all ({jobs.length})
            </button>
          </div>

          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJobModal(job)}
                className="p-3.5 rounded-2xl border border-[#E6ECE7] hover:border-[#18845B]/50 hover:bg-[#FAFBF7] transition-all cursor-pointer space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-[#18845B] bg-[#B8F0D2]/50 px-2 py-0.5 rounded border border-[#B8F0D2]">
                      {job.id}
                    </span>
                    <span className="font-heading font-semibold text-[#20332D] truncate max-w-[180px]">
                      {job.workloadName}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                    job.status === 'Running' ? 'bg-[#B8F0D2] text-[#18845B]' :
                    job.status === 'Completed' ? 'bg-[#18845B] text-white' :
                    job.status === 'Interrupted' ? 'bg-[#FF8E8E] text-[#901313]' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#FAFBF7] h-2 rounded-full overflow-hidden border border-[#E6ECE7]">
                  <div
                    className="bg-[#18845B] h-full rounded-full transition-all duration-300"
                    style={{ width: `${job.progressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#65756F]">
                  <span>{job.requiredVramGb}GB VRAM · {job.datasetName}</span>
                  <span className="font-mono font-medium text-[#20332D]">{job.progressPct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Device Snapshot */}
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6ECE7]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#4267D5]" />
              <h2 className="font-heading font-bold text-base text-[#20332D]">High-Capacity Nodes</h2>
            </div>
            <button
              onClick={() => setCurrentView('network')}
              className="text-xs text-[#18845B] hover:underline font-medium cursor-pointer"
            >
              Browse Network ({devices.length})
            </button>
          </div>

          <div className="space-y-3">
            {devices.slice(0, 3).map((device) => (
              <div
                key={device.id}
                onClick={() => setSelectedDeviceModal(device)}
                className="p-3.5 rounded-2xl border border-[#E6ECE7] hover:border-[#4267D5]/50 hover:bg-[#FAFBF7] transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#4267D5]">
                    {device.type === 'student_laptop' ? <Laptop className="w-5 h-5 text-[#FFAD70]" /> : <Cpu className="w-5 h-5 text-[#4267D5]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-[#20332D]">{device.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FAFBF7] border border-[#E6ECE7] text-[#65756F]">
                        {device.gpuVramGb}GB VRAM
                      </span>
                    </div>
                    <span className="text-[11px] text-[#65756F] block mt-0.5">{device.gpuModel}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                    device.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                    device.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {device.status}
                  </span>
                  <span className="text-[10px] font-mono text-[#65756F] block mt-1">
                    {device.utilizationPct}% Load
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
