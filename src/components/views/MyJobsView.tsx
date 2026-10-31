import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Search,
  Filter,
  Clock,
  Play,
  RotateCcw,
  Ban,
  Terminal,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { JobStatus, WorkloadJob } from '../../types';

export const MyJobsView: React.FC = () => {
  const { jobs, setSelectedJobModal, setCurrentView, cancelJob, retryJob } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | JobStatus>('All');

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.workloadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'All' && j.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
            My AI Workloads
          </h2>
          <p className="text-xs text-[#65756F] mt-0.5">
            Monitor real-time training progress, telemetry checkpoints, and execution logs across campus nodes.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('submit')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>New Workload</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border border-[#E6ECE7] rounded-2xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#65756F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Job ID, project name, or model architecture..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-[#65756F] mr-1">Status:</span>
            {(['All', 'Running', 'Completed', 'Queued', 'Interrupted', 'Failed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  statusFilter === s
                    ? 'bg-[#18845B] text-white shadow-xs'
                    : 'bg-[#FAFBF7] text-[#65756F] border border-[#E6ECE7] hover:text-[#20332D]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Table / Card List */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E6ECE7] space-y-2">
          <Layers className="w-10 h-10 text-[#65756F] mx-auto opacity-40" />
          <p className="font-heading font-semibold text-base text-[#20332D]">No workloads match your filter</p>
          <p className="text-xs text-[#65756F]">Submit a job to dispatch compute to the campus network.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJobModal(job)}
              className="bg-white border border-[#E6ECE7] rounded-3xl p-5 hover:border-[#18845B]/50 hover:shadow-xs transition-all cursor-pointer space-y-4 group"
            >
              {/* Row Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#18845B] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#18845B] bg-[#B8F0D2]/50 px-2 py-0.5 rounded border border-[#B8F0D2]">
                        {job.id}
                      </span>
                      <h3 className="font-heading font-bold text-sm text-[#20332D] group-hover:text-[#18845B] transition-colors">
                        {job.workloadName}
                      </h3>
                      <span className="text-xs text-[#65756F] hidden sm:inline">· {job.projectName}</span>
                    </div>
                    <span className="text-[11px] text-[#65756F] block mt-0.5">
                      {job.workloadType} · Assigned to {job.assignedDeviceName || 'Queued in Campus Pool'}
                    </span>
                  </div>
                </div>

                {/* Status + Credits */}
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="font-mono text-xs text-[#4267D5] font-semibold">
                    {job.creditsCost} Credits
                  </span>

                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-semibold ${
                    job.status === 'Running' ? 'bg-[#B8F0D2] text-[#18845B] animate-pulse' :
                    job.status === 'Completed' ? 'bg-[#18845B] text-white' :
                    job.status === 'Interrupted' ? 'bg-[#FF8E8E] text-[#901313]' :
                    job.status === 'Failed' ? 'bg-[#FF8E8E]/30 text-[#D93838]' :
                    'bg-[#FFE49A] text-[#9A6200]'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar & Epoch Status */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#65756F]">
                  <span>Progress: {job.progressPct}% (Epoch {job.checkpointEpoch}/{job.totalEpochs})</span>
                  {job.lossMetric && (
                    <span className="font-mono text-[#20332D]">Loss: {job.lossMetric.toFixed(3)} · Acc: {job.accuracyMetric}%</span>
                  )}
                </div>

                <div className="w-full bg-[#FAFBF7] h-2 rounded-full overflow-hidden border border-[#E6ECE7]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      job.status === 'Completed' ? 'bg-[#18845B]' :
                      job.status === 'Interrupted' ? 'bg-[#FF8E8E]' :
                      'bg-[#18845B]'
                    }`}
                    style={{ width: `${job.progressPct}%` }}
                  />
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6ECE7] text-xs text-[#65756F]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submitted {job.submissionTime}</span>
                  <span>·</span>
                  <span>{job.datasetName} ({job.datasetSizeMb} MB)</span>
                </div>

                <div className="flex items-center gap-2">
                  {job.status === 'Running' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelJob(job.id);
                      }}
                      className="px-2.5 py-1 text-xs text-[#D93838] hover:bg-[#FF8E8E]/15 rounded-lg border border-[#FF8E8E]/40 cursor-pointer"
                    >
                      Cancel Job
                    </button>
                  )}

                  {(job.status === 'Failed' || job.status === 'Interrupted') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        retryJob(job.id);
                      }}
                      className="px-2.5 py-1 text-xs text-[#18845B] hover:bg-[#B8F0D2]/30 rounded-lg border border-[#B8F0D2] font-semibold cursor-pointer"
                    >
                      Resume Checkpoint
                    </button>
                  )}

                  <span className="text-[#18845B] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Logs & Telemetry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
