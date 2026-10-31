import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Cpu,
  Server,
  Laptop,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  HardDrive,
  Wifi,
  Thermometer,
  Layers
} from 'lucide-react';

export const DeviceDetailsModal: React.FC = () => {
  const { selectedDeviceModal, setSelectedDeviceModal, setCurrentView } = useApp();

  if (!selectedDeviceModal) return null;
  const d = selectedDeviceModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E6ECE7] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#E6ECE7] flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#18845B]">
              {d.type === 'research_server' || d.type === 'gpu_node' ? (
                <Server className="w-6 h-6 text-[#4267D5]" />
              ) : d.type === 'student_laptop' ? (
                <Laptop className="w-6 h-6 text-[#FFAD70]" />
              ) : (
                <Cpu className="w-6 h-6 text-[#18845B]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-[#20332D]">{d.name}</h3>
                <span className={`px-2 py-0.5 text-[11px] font-mono rounded-md uppercase font-medium ${
                  d.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                  d.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                  d.status === 'fault' ? 'bg-[#FF8E8E]/30 text-[#D93838]' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {d.status}
                </span>
              </div>
              <p className="text-xs text-[#65756F] mt-0.5">{d.department} · {d.campusLocation}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedDeviceModal(null)}
            className="p-1.5 rounded-lg text-[#65756F] hover:bg-[#FAFBF7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs">
          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7]">
              <span className="text-[#65756F] block text-[11px]">GPU VRAM</span>
              <span className="font-mono font-bold text-base text-[#20332D] block mt-0.5">
                {d.gpuVramGb} GB
              </span>
              <span className="text-[10px] text-[#65756F] truncate block">{d.gpuModel}</span>
            </div>

            <div className="p-3 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7]">
              <span className="text-[#65756F] block text-[11px]">Available RAM</span>
              <span className="font-mono font-bold text-base text-[#20332D] block mt-0.5">
                {d.ramAvailableGb} / {d.ramGb} GB
              </span>
              <span className="text-[10px] text-[#18845B] block">{Math.round((d.ramAvailableGb / d.ramGb) * 100)}% Free</span>
            </div>

            <div className="p-3 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7]">
              <span className="text-[#65756F] block text-[11px]">Compute Rate</span>
              <span className="font-mono font-bold text-base text-[#4267D5] block mt-0.5">
                {d.hourlyCreditRate} cr/hr
              </span>
              <span className="text-[10px] text-[#65756F] block">Earned {d.creditsEarned} cr</span>
            </div>

            <div className="p-3 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7]">
              <span className="text-[#65756F] block text-[11px]">Hardware Health</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Thermometer className="w-4 h-4 text-[#FFAD70]" />
                <span className="font-mono font-bold text-base text-[#20332D]">
                  {d.temperatureC}°C
                </span>
              </div>
              <span className="text-[10px] text-[#18845B] block">{d.uptimePct}% Uptime</span>
            </div>
          </div>

          {/* Full Specifications */}
          <div className="border border-[#E6ECE7] rounded-xl p-4 bg-white space-y-3">
            <h4 className="font-heading font-semibold text-sm text-[#20332D] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#18845B]" />
              System Architecture & Interfaces
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#65756F] block">Host Processor</span>
                <span className="font-mono font-medium text-[#20332D]">{d.cpuModel}</span>
              </div>
              <div>
                <span className="text-[#65756F] block">Dedicated Accelerator</span>
                <span className="font-mono font-medium text-[#20332D]">{d.gpuModel} ({d.gpuVramGb}GB)</span>
              </div>
              <div>
                <span className="text-[#65756F] block">Local NVMe Storage</span>
                <span className="font-mono font-medium text-[#20332D]">{d.storageGb} GB High-Speed Cache</span>
              </div>
              <div>
                <span className="text-[#65756F] block">Campus Network Bandwidth</span>
                <span className="font-mono font-medium text-[#20332D]">
                  {d.networkBandwidthMbps >= 1000
                    ? `${(d.networkBandwidthMbps / 1000).toFixed(1)} Gbps Dedicated Optical Fiber`
                    : `${d.networkBandwidthMbps} Mbps Campus Wi-Fi 6`}
                </span>
              </div>
              <div>
                <span className="text-[#65756F] block">Node Owner / Operator</span>
                <span className="text-[#20332D]">{d.ownerName} ({d.ownerRole})</span>
              </div>
              <div>
                <span className="text-[#65756F] block">Last Coordinator Heartbeat</span>
                <span className="font-mono text-[#18845B]">{d.lastHeartbeat}</span>
              </div>
            </div>
          </div>

          {/* Contribution Schedule */}
          <div className="border border-[#E6ECE7] rounded-xl p-4 bg-[#FAFBF7]">
            <span className="text-[#65756F] block font-medium">Declared Contribution Schedule</span>
            <p className="text-[#20332D] font-medium mt-1">{d.scheduleDescription}</p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-[#65756F]">
              <ShieldCheck className="w-4 h-4 text-[#18845B]" />
              <span>Containerized execution via gVisor sandbox. Zero access to host filesystem.</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E6ECE7] bg-[#FAFBF7] flex items-center justify-between">
          <div className="text-[11px] text-[#65756F] font-mono">
            Node ID: {d.id} · Verified Node
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDeviceModal(null)}
              className="px-4 py-2 text-xs font-medium text-[#65756F] hover:text-[#20332D] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                setSelectedDeviceModal(null);
                setCurrentView('submit');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer shadow-xs"
            >
              Submit Workload To Grid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
