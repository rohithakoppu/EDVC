import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Play,
  Server,
  Cpu,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const FaultRecoveryView: React.FC = () => {
  const {
    faultState,
    triggerFaultSimulation,
    resetFaultSimulation,
    devices,
    jobs,
    setCurrentView,
    setSelectedJobModal
  } = useApp();

  const failedDevice = devices.find((d) => d.id === faultState.failedDeviceId);
  const backupDevice = devices.find((d) => d.id === faultState.restoredDeviceId);
  const affectedJob = jobs.find((j) => j.id === faultState.jobId) || jobs[0];

  const steps = [
    {
      stage: 'failed',
      num: '01',
      title: 'Node Sudden Disconnection',
      desc: 'Worker node abruptly powers down or loses network socket. Heartbeat probe fails 3 consecutive times.',
      active: faultState.stage === 'failed' || faultState.stage === 'detecting' || faultState.stage === 'recovering' || faultState.stage === 'restored',
      current: faultState.stage === 'failed'
    },
    {
      stage: 'detecting',
      num: '02',
      title: 'Health Supervisor Quarantines Node',
      desc: 'Campus Grid supervisor quarantines the unreachable hardware. The active job state transitions to "Interrupted".',
      active: faultState.stage === 'detecting' || faultState.stage === 'recovering' || faultState.stage === 'restored',
      current: faultState.stage === 'detecting'
    },
    {
      stage: 'recovering',
      num: '03',
      title: 'Checkpoint Lookup & Failover Matching',
      desc: 'Supervisor inspects latest model weights checkpoint (Epoch 3) and queries the cluster for a compatible GPU replacement.',
      active: faultState.stage === 'recovering' || faultState.stage === 'restored',
      current: faultState.stage === 'recovering'
    },
    {
      stage: 'restored',
      num: '04',
      title: 'Seamless Workload Resumption',
      desc: 'Workload container is spawned on backup node. Model weights reload from checkpoint without loss of training progress.',
      active: faultState.stage === 'restored',
      current: faultState.stage === 'restored'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
            Fault Recovery & Auto-Failover Simulator
          </h2>
          <p className="text-xs text-[#65756F] mt-0.5">
            Test how Campus Grid handles sudden hardware disconnects, network drops, and automated checkpoint failovers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {faultState.active ? (
            <button
              onClick={resetFaultSimulation}
              className="px-4 py-2 text-xs font-semibold text-[#20332D] bg-white border border-[#E6ECE7] hover:bg-[#FAFBF7] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-[#65756F]" />
              <span>Reset Simulation</span>
            </button>
          ) : (
            <button
              onClick={triggerFaultSimulation}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D93838] hover:bg-[#b52a2a] rounded-xl cursor-pointer shadow-xs flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
              <span>Simulate Sudden Node Disconnect</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6ECE7]">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              faultState.active ? 'bg-[#FF8E8E] animate-ping' : 'bg-[#18845B]'
            }`} />
            <h3 className="font-heading font-bold text-base text-[#20332D]">
              Cluster Fault Supervisor Status: {faultState.active ? faultState.stage.toUpperCase() : 'NOMINAL'}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#65756F]">
            Automatic failover timeout: ~3.0s
          </span>
        </div>

        {/* Visual Failover Animation Topology */}
        <div className="p-6 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Source Device (Failed) */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
              faultState.active
                ? 'bg-[#FF8E8E]/15 border-[#FF8E8E] ring-2 ring-[#FF8E8E]/30'
                : 'bg-white border-[#E6ECE7]'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E6ECE7] flex items-center justify-center mx-auto text-[#D93838]">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-[#20332D] block">
                  {failedDevice?.name || 'Research Server 02'}
                </span>
                <span className="text-[11px] text-[#65756F] font-mono block">
                  80GB A100 Tensor Core
                </span>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                faultState.active ? 'bg-[#FF8E8E] text-[#901313]' : 'bg-[#B8F0D2] text-[#18845B]'
              }`}>
                {faultState.active ? 'SOCKET OFFLINE (FAULT)' : 'ONLINE'}
              </span>
            </div>

            {/* Middle Coordinator Animation */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#E6ECE7] shadow-xs text-[#18845B]">
                <Activity className={`w-5 h-5 ${faultState.active ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <span className="text-xs font-heading font-semibold text-[#20332D] block">
                  Checkpoint Migration
                </span>
                <span className="text-[10px] text-[#65756F] font-mono block">
                  {faultState.active ? 'Restoring Epoch 3 state...' : 'Heartbeats synchronized'}
                </span>
              </div>
              <div className="w-full bg-[#E6ECE7] h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    faultState.stage === 'restored' ? 'bg-[#18845B] w-full' :
                    faultState.stage === 'recovering' ? 'bg-[#4267D5] w-2/3' :
                    faultState.stage === 'detecting' ? 'bg-[#FFAD70] w-1/3' :
                    faultState.stage === 'failed' ? 'bg-[#FF8E8E] w-1/4' : 'bg-[#18845B] w-0'
                  }`}
                />
              </div>
            </div>

            {/* Destination Failover Device */}
            <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
              faultState.stage === 'restored'
                ? 'bg-[#B8F0D2]/30 border-[#18845B] ring-2 ring-[#18845B]/30'
                : 'bg-white border-[#E6ECE7]'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E6ECE7] flex items-center justify-center mx-auto text-[#18845B]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-[#20332D] block">
                  {backupDevice?.name || 'Lab Workstation 01'}
                </span>
                <span className="text-[11px] text-[#65756F] font-mono block">
                  24GB RTX 4090 (Failover Host)
                </span>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                faultState.stage === 'restored' ? 'bg-[#B8F0D2] text-[#18845B]' : 'bg-slate-100 text-slate-600'
              }`}>
                {faultState.stage === 'restored' ? 'EXECUTION RESUMED' : 'STANDBY BACKUP'}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Recovery Progression Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                st.current
                  ? 'bg-white border-[#18845B] shadow-sm ring-1 ring-[#18845B]/20'
                  : st.active
                  ? 'bg-white border-[#B8F0D2]'
                  : 'bg-[#FAFBF7] border-[#E6ECE7] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#18845B]">{st.num}</span>
                {st.active ? (
                  <CheckCircle2 className="w-4 h-4 text-[#18845B]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#E6ECE7]" />
                )}
              </div>
              <h4 className="font-heading font-semibold text-xs text-[#20332D]">
                {st.title}
              </h4>
              <p className="text-[11px] text-[#65756F] leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Console Event Feed */}
        <div className="p-4 bg-[#FAFBF7] border border-[#E6ECE7] rounded-2xl space-y-2 text-xs">
          <span className="font-mono font-semibold text-[#20332D] block">
            Cluster Telemetry Log Stream:
          </span>
          <p className="font-mono text-[11px] text-[#65756F] leading-relaxed">
            {faultState.message}
          </p>
        </div>
      </div>

      {/* Checkpointing Architecture Explanation */}
      <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 text-[#18845B]">
          <Info className="w-4 h-4" />
          <h3 className="font-heading font-bold text-sm text-[#20332D]">
            How Checkpointing Protects Academic Research
          </h3>
        </div>
        <p className="text-[#65756F] leading-relaxed">
          Because student laptops and lab workstations can be packed up or rebooted at any time, Campus Grid treats all worker nodes as ephemeral edge resources. Every active PyTorch training loop syncs model weights, optimizer states, and current batch index to distributed S3/MinIO storage at the end of each epoch. When a node failure is detected, the job is re-dispatched to an equivalent node and resumes from the last validated checkpoint with zero loss of training time.
        </p>
      </div>
    </div>
  );
};
