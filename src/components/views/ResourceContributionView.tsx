import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Laptop,
  Cpu,
  Server,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Coins,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Power
} from 'lucide-react';
import { Device, DeviceType } from '../../types';

export const ResourceContributionView: React.FC = () => {
  const {
    devices,
    registerDevice,
    toggleDeviceSharing,
    currentUser,
    setSelectedDeviceModal
  } = useApp();

  const [isRegistering, setIsRegistering] = useState(false);
  const [devName, setDevName] = useState('My Research Laptop');
  const [devType, setDevType] = useState<DeviceType>('student_laptop');
  const [cpuModel, setCpuModel] = useState('Apple M3 Pro / AMD Ryzen 9');
  const [cpuCores, setCpuCores] = useState(12);
  const [gpuModel, setGpuModel] = useState('NVIDIA RTX 4070 / Apple 18-core');
  const [gpuVramGb, setGpuVramGb] = useState(16);
  const [ramGb, setRamGb] = useState(32);
  const [schedule, setSchedule] = useState('Overnight while charging (23:00 - 07:30)');
  const [bandwidthMbps, setBandwidthMbps] = useState(500);

  // Filter contributor devices (owned by current user or all laptops/contributed)
  const myDevices = devices.filter(
    (d) => d.ownerName.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]) || d.type === 'student_laptop'
  );

  const totalContributedHours = myDevices.reduce((sum, d) => sum + d.contributedHours, 0);
  const totalEarnedCredits = myDevices.reduce((sum, d) => sum + d.creditsEarned, 0);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerDevice({
      name: devName,
      type: devType,
      cpuModel,
      cpuCores,
      gpuModel,
      gpuVramGb,
      ramGb,
      scheduleDescription: schedule,
      networkBandwidthMbps: bandwidthMbps,
    });
    setIsRegistering(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
            Resource Contribution & Device Sharing
          </h2>
          <p className="text-xs text-[#65756F] mt-0.5">
            Share idle compute cycles from your laptop or lab workstation to earn Compute Credits.
          </p>
        </div>

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isRegistering ? 'Cancel' : 'Register New Device'}</span>
        </button>
      </div>

      {/* Contributor Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">MY CONTRIBUTED TIME</span>
            <Clock className="w-4 h-4 text-[#18845B]" />
          </div>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tabular-nums">
            {totalContributedHours} Hours
          </div>
          <span className="text-xs text-[#18845B] block font-medium">Idle sharing recorded</span>
        </div>

        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">CREDITS EARNED</span>
            <Coins className="w-4 h-4 text-[#FFAD70]" />
          </div>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tabular-nums">
            +{totalEarnedCredits} Credits
          </div>
          <span className="text-xs text-[#65756F] block">Redeemable for large GPU jobs</span>
        </div>

        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">ACTIVE SHARING NODES</span>
            <Laptop className="w-4 h-4 text-[#4267D5]" />
          </div>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tabular-nums">
            {myDevices.filter((d) => d.isAvailableForSharing).length} of {myDevices.length}
          </div>
          <span className="text-xs text-[#18845B] block font-medium">Ready for workload dispatch</span>
        </div>
      </div>

      {/* Registration Form Dropdown */}
      {isRegistering && (
        <div className="p-6 sm:p-8 bg-white border border-[#18845B]/40 rounded-3xl shadow-sm space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6ECE7]">
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-[#18845B]" />
              <h3 className="font-heading font-bold text-base text-[#20332D]">
                Register New Compute Node
              </h3>
            </div>
            <span className="text-xs text-[#65756F] font-mono">Step 1 of 1</span>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#20332D] mb-1">Device Nickname</label>
                <input
                  type="text"
                  required
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="e.g. Dorm RTX Workstation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#20332D] mb-1">Device Form Factor</label>
                <select
                  value={devType}
                  onChange={(e) => setDevType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden cursor-pointer"
                >
                  <option value="student_laptop">Student Laptop</option>
                  <option value="lab_workstation">Campus Lab Workstation</option>
                  <option value="computing_station">Department Computing Station</option>
                  <option value="research_server">Research Server Node</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-[#20332D] mb-1">GPU Accelerator Model</label>
                <input
                  type="text"
                  value={gpuModel}
                  onChange={(e) => setGpuModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-[#20332D] mb-1">GPU VRAM (GB)</label>
                <input
                  type="number"
                  min="4"
                  max="80"
                  value={gpuVramGb}
                  onChange={(e) => setGpuVramGb(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-[#20332D] mb-1">Total Host RAM (GB)</label>
                <input
                  type="number"
                  min="8"
                  max="256"
                  value={ramGb}
                  onChange={(e) => setRamGb(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#20332D] mb-1">Contribution Schedule & Idle Rules</label>
              <input
                type="text"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                placeholder="e.g. Mon-Fri 23:00 - 08:00 & whenever idle for 15+ minutes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="px-4 py-2 text-xs font-medium text-[#65756F] hover:text-[#20332D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs"
              >
                Register & Enable Node
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Contributor's Device List */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-base text-[#20332D]">
          My Registered Compute Nodes ({myDevices.length})
        </h3>

        <div className="space-y-3">
          {myDevices.map((device) => (
            <div
              key={device.id}
              className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#18845B]">
                    <Laptop className="w-6 h-6 text-[#FFAD70]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-base text-[#20332D]">
                        {device.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        device.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                        device.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#65756F] block mt-0.5">
                      {device.gpuModel} ({device.gpuVramGb}GB VRAM) · {device.cpuModel}
                    </span>
                  </div>
                </div>

                {/* Make Available Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDeviceSharing(device.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E6ECE7] hover:bg-[#FAFBF7] cursor-pointer text-xs"
                  >
                    <Power className={`w-4 h-4 ${device.isAvailableForSharing ? 'text-[#18845B]' : 'text-slate-400'}`} />
                    <span className="font-medium text-[#20332D]">
                      {device.isAvailableForSharing ? 'Sharing Active' : 'Sharing Paused'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Specs & Schedule strip */}
              <div className="p-3.5 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#65756F] block text-[11px]">Contributed</span>
                  <span className="font-mono font-semibold text-[#20332D]">{device.contributedHours} hrs</span>
                </div>
                <div>
                  <span className="text-[#65756F] block text-[11px]">Credits Generated</span>
                  <span className="font-mono font-semibold text-[#18845B]">+{device.creditsEarned} cr</span>
                </div>
                <div>
                  <span className="text-[#65756F] block text-[11px]">Earning Rate</span>
                  <span className="font-mono font-semibold text-[#4267D5]">{device.hourlyCreditRate} cr/hr</span>
                </div>
                <div>
                  <span className="text-[#65756F] block text-[11px]">Current Temp</span>
                  <span className="font-mono font-semibold text-[#20332D]">{device.temperatureC}°C</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#65756F] pt-1">
                <span>Declared Schedule: {device.scheduleDescription}</span>
                <button
                  onClick={() => setSelectedDeviceModal(device)}
                  className="text-[#18845B] hover:underline font-semibold cursor-pointer"
                >
                  Inspect Hardware Telemetry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prototype Reality Disclosure Box */}
      <div className="p-5 rounded-3xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2 text-xs">
        <div className="flex items-center gap-2 text-[#20332D] font-heading font-semibold">
          <Info className="w-4 h-4 text-[#18845B]" />
          <span>Interactive Prototype Simulation Notice</span>
        </div>
        <p className="text-[#65756F] leading-relaxed">
          In a production deployment of Campus Grid, resource contribution is mediated by an open-source background desktop agent (e.g., Linux/macOS daemon) running rootless containers (Docker/Podman with NVIDIA container runtime). In this interactive web prototype, device discovery and credit accrual are simulated in the browser.
        </p>
      </div>
    </div>
  );
};
