import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Layers,
  Terminal,
  Clock,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Ban,
  Copy,
  Check
} from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const { selectedJobModal, setSelectedJobModal, cancelJob, retryJob } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedJobModal) return null;
  const j = selectedJobModal;

  const copyLogs = () => {
    navigator.clipboard.writeText(j.executionLogs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E6ECE7] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E6ECE7] flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#18845B]">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#18845B] bg-[#B8F0D2]/50 px-2 py-0.5 rounded-md border border-[#B8F0D2]">
                  {j.id}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#20332D]">{j.workloadName}</h3>
              </div>
              <p className="text-xs text-[#65756F] mt-0.5">{j.projectName} · {j.workloadType}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedJobModal(null)}
            className="p-1.5 rounded-lg text-[#65756F] hover:bg-[#FAFBF7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Status & Progress Bar */}
          <div className="p-4 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#65756F]">Execution Status:</span>
                <span className={`px-2 py-0.5 font-mono rounded font-semibold text-[11px] ${
                  j.status === 'Running' ? 'bg-[#B8F0D2] text-[#18845B] animate-pulse' :
                  j.status === 'Completed' ? 'bg-[#18845B] text-white' :
                  j.status === 'Interrupted' ? 'bg-[#FF8E8E] text-[#901313]' :
                  j.status === 'Failed' ? 'bg-[#FF8E8E]/30 text-[#D93838]' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {j.status}
                </span>
              </div>
              <div className="font-mono font-bold text-sm text-[#20332D] tabular-nums">
                {j.progressPct}% Complete
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#E6ECE7]">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  j.status === 'Completed' ? 'bg-[#18845B]' :
                  j.status === 'Interrupted' ? 'bg-[#FF8E8E]' :
                  'bg-[#18845B]'
                }`}
                style={{ width: `${j.progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#65756F]">
              <span>Epoch {j.checkpointEpoch} of {j.totalEpochs}</span>
              <span>Assigned Device: {j.assignedDeviceName || 'Pending Allocation'}</span>
            </div>
          </div>

          {/* Quick Specs & Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-[#E6ECE7] rounded-xl">
              <span className="text-[#65756F] block text-[11px]">VRAM Allocation</span>
              <span className="font-mono font-bold text-base text-[#20332D] block mt-0.5">
                {j.requiredVramGb} GB
              </span>
              <span className="text-[10px] text-[#65756F] block">{j.requiredRamGb}GB RAM · {j.requiredCores} Cores</span>
            </div>

            <div className="p-3 bg-white border border-[#E6ECE7] rounded-xl">
              <span className="text-[#65756F] block text-[11px]">Credits Cost</span>
              <span className="font-mono font-bold text-base text-[#4267D5] block mt-0.5">
                {j.creditsCost} cr
              </span>
              <span className="text-[10px] text-[#65756F] block">~{j.estimatedHours} hrs runtime</span>
            </div>

            <div className="p-3 bg-white border border-[#E6ECE7] rounded-xl">
              <span className="text-[#65756F] block text-[11px]">Current Loss</span>
              <span className="font-mono font-bold text-base text-[#18845B] block mt-0.5">
                {j.lossMetric ? j.lossMetric.toFixed(3) : 'N/A'}
              </span>
              <span className="text-[10px] text-[#65756F] block">Validation Loss</span>
            </div>

            <div className="p-3 bg-white border border-[#E6ECE7] rounded-xl">
              <span className="text-[#65756F] block text-[11px]">Accuracy</span>
              <span className="font-mono font-bold text-base text-[#20332D] block mt-0.5">
                {j.accuracyMetric ? `${j.accuracyMetric.toFixed(1)}%` : 'N/A'}
              </span>
              <span className="text-[10px] text-[#18845B] block">Top-1 Metric</span>
            </div>
          </div>

          {/* Execution Terminal Console */}
          <div className="border border-[#E6ECE7] rounded-xl overflow-hidden bg-[#FAFBF7]">
            <div className="px-4 py-2.5 bg-white border-b border-[#E6ECE7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#18845B]" />
                <span className="font-mono font-semibold text-xs text-[#20332D]">Real-Time Execution Logs</span>
              </div>
              <button
                onClick={copyLogs}
                className="flex items-center gap-1 text-[11px] text-[#65756F] hover:text-[#20332D] cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-[#18845B]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Logs'}</span>
              </button>
            </div>

            <div className="p-4 font-mono text-[11px] leading-relaxed text-[#20332D] max-h-56 overflow-y-auto space-y-1 bg-[#FAFBF7]">
              {j.executionLogs.map((line, idx) => (
                <div key={idx} className="hover:bg-black/5 px-1 py-0.5 rounded">
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Info */}
          <div className="p-3 bg-white border border-[#E6ECE7] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[#65756F] block text-[11px]">Staged Dataset</span>
              <span className="font-mono font-medium text-[#20332D]">{j.datasetName}</span>
            </div>
            <span className="font-mono text-xs text-[#65756F]">{j.datasetSizeMb} MB</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E6ECE7] bg-[#FAFBF7] flex items-center justify-between">
          <div className="text-[11px] text-[#65756F] font-mono">
            Submitted: {j.submissionTime}
          </div>
          <div className="flex items-center gap-2">
            {j.status === 'Running' && (
              <button
                onClick={() => {
                  cancelJob(j.id);
                  setSelectedJobModal(null);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-[#D93838] border border-[#FF8E8E] rounded-xl hover:bg-[#FF8E8E]/10 cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Cancel & Refund</span>
              </button>
            )}
            {(j.status === 'Failed' || j.status === 'Interrupted') && (
              <button
                onClick={() => {
                  retryJob(j.id);
                  setSelectedJobModal(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resume from Checkpoint</span>
              </button>
            )}
            <button
              onClick={() => setSelectedJobModal(null)}
              className="px-4 py-1.5 text-xs font-medium text-[#65756F] hover:text-[#20332D] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
