import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { matchDevicesForWorkload } from '../../utils/matching';
import {
  Compass,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

export const ResourceExplorerView: React.FC = () => {
  const { devices, setCurrentView, setSelectedDeviceModal } = useApp();

  const [requiredVramGb, setRequiredVramGb] = useState(16);
  const [requiredRamGb, setRequiredRamGb] = useState(32);
  const [requiredCores, setRequiredCores] = useState(8);
  const [estimatedHours, setEstimatedHours] = useState(4);
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Priority'>('Normal');

  // Compute actual matching results
  const matchResults = matchDevicesForWorkload(devices, {
    requiredVramGb,
    requiredRamGb,
    requiredCores,
    estimatedHours,
    priority
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
          Intelligent Resource Explorer & Matcher
        </h2>
        <p className="text-xs text-[#65756F] mt-0.5">
          Specify your model training requirements and our scheduler will identify compatible campus hardware with transparent reasoning.
        </p>
      </div>

      {/* Specification Input Panel */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E6ECE7]">
          <Sliders className="w-4 h-4 text-[#18845B]" />
          <h3 className="font-heading font-semibold text-sm text-[#20332D]">
            Define Model Requirements
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* VRAM Slider */}
          <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#65756F]">GPU VRAM</span>
              <span className="font-mono font-bold text-sm text-[#20332D]">{requiredVramGb} GB</span>
            </div>
            <input
              type="range"
              min="4"
              max="80"
              step="4"
              value={requiredVramGb}
              onChange={(e) => setRequiredVramGb(Number(e.target.value))}
              className="w-full accent-[#18845B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
              <span>8GB (Mobile)</span>
              <span>24GB (4090)</span>
              <span>80GB (A100)</span>
            </div>
          </div>

          {/* RAM Slider */}
          <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#65756F]">Host RAM</span>
              <span className="font-mono font-bold text-sm text-[#20332D]">{requiredRamGb} GB</span>
            </div>
            <input
              type="range"
              min="8"
              max="256"
              step="8"
              value={requiredRamGb}
              onChange={(e) => setRequiredRamGb(Number(e.target.value))}
              className="w-full accent-[#4267D5] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
              <span>16GB</span>
              <span>64GB</span>
              <span>256GB</span>
            </div>
          </div>

          {/* CPU Cores */}
          <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#65756F]">CPU Cores</span>
              <span className="font-mono font-bold text-sm text-[#20332D]">{requiredCores} Cores</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={requiredCores}
              onChange={(e) => setRequiredCores(Number(e.target.value))}
              className="w-full accent-[#65BDEB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
              <span>4 Cores</span>
              <span>16 Cores</span>
              <span>64 Cores</span>
            </div>
          </div>

          {/* Estimated Runtime */}
          <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#65756F]">Runtime Duration</span>
              <span className="font-mono font-bold text-sm text-[#20332D]">{estimatedHours} Hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              className="w-full accent-[#FFAD70] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
              <span>1 hr</span>
              <span>8 hrs</span>
              <span>24 hrs</span>
            </div>
          </div>
        </div>

        {/* Priority buttons */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#65756F]">Scheduling Priority:</span>
            {(['Normal', 'High', 'Priority'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  priority === p
                    ? 'bg-[#18845B] text-white shadow-xs'
                    : 'bg-[#FAFBF7] text-[#65756F] border border-[#E6ECE7]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <span className="text-[#65756F] font-mono text-[11px]">
            Est. Cost: ~{Math.round(estimatedHours * 10 * (priority === 'Priority' ? 1.5 : 1))} Credits
          </span>
        </div>
      </div>

      {/* Match Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-[#20332D]">
            Compatibility Ranking ({matchResults.length} Nodes Evaluated)
          </h3>
          <span className="text-xs text-[#65756F] font-mono">
            Evaluated against live cluster telemetry
          </span>
        </div>

        <div className="space-y-3">
          {matchResults.map((result) => {
            const d = result.device;
            const isExcellent = result.rating === 'Excellent Match';
            const isGood = result.rating === 'Good Match';
            const isUnsuitable = result.rating === 'Not Suitable';

            return (
              <div
                key={d.id}
                className={`bg-white border rounded-3xl p-5 shadow-xs transition-all ${
                  isExcellent
                    ? 'border-[#18845B]/60 ring-1 ring-[#18845B]/20'
                    : isGood
                    ? 'border-[#4267D5]/40'
                    : 'border-[#E6ECE7] opacity-80'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Device Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="font-heading font-bold text-base text-[#20332D]">
                        {d.name}
                      </h4>
                      <span className="text-xs text-[#65756F]">·</span>
                      <span className="text-xs text-[#65756F]">{d.department}</span>

                      {/* Match Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        isExcellent ? 'bg-[#B8F0D2] text-[#18845B]' :
                        isGood ? 'bg-[#65BDEB]/25 text-[#4267D5]' :
                        'bg-[#FF8E8E]/20 text-[#D93838]'
                      }`}>
                        {isExcellent && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {isGood && <Info className="w-3.5 h-3.5" />}
                        {isUnsuitable && <XCircle className="w-3.5 h-3.5" />}
                        <span>{result.rating} ({result.score}/100)</span>
                      </span>
                    </div>

                    {/* Hardware specs row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#65756F]">
                      <span className="text-[#20332D] font-semibold">
                        GPU: {d.gpuVramGb}GB ({d.gpuModel})
                      </span>
                      <span>·</span>
                      <span>Free RAM: {d.ramAvailableGb} GB</span>
                      <span>·</span>
                      <span>CPU: {d.cpuCores} Cores</span>
                      <span>·</span>
                      <span>Status: {d.status}</span>
                    </div>

                    {/* Transparent Explanations */}
                    <div className="space-y-1 pt-1">
                      {result.reasons.map((r, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#65756F]">
                          <span className={`font-mono text-sm leading-none ${isUnsuitable ? 'text-[#D93838]' : 'text-[#18845B]'}`}>
                            {isUnsuitable ? '×' : '✓'}
                          </span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedDeviceModal(d)}
                      className="px-3.5 py-2 text-xs font-medium text-[#65756F] hover:text-[#20332D] bg-[#FAFBF7] border border-[#E6ECE7] rounded-xl cursor-pointer"
                    >
                      Inspect Specs
                    </button>
                    {result.isEligible && (
                      <button
                        onClick={() => setCurrentView('submit')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <span>Target This Node</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
