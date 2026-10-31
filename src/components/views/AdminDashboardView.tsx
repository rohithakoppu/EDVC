import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Server,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Layers,
  Search,
  Filter,
  Eye,
  Trash2,
  Check
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    devices,
    jobs,
    adminApproveDevice,
    adminRejectDevice,
    setSelectedDeviceModal,
    setSelectedJobModal,
    cancelJob
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pending' | 'devices' | 'jobs' | 'audit'>('pending');

  const pendingDevices = devices.filter((d) => !d.approvedByAdmin);
  const approvedDevices = devices.filter((d) => d.approvedByAdmin);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#18845B] text-white font-semibold">
              ADMINISTRATIVE ACCESS
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
              Campus Infrastructure Directorate
            </h2>
          </div>
          <p className="text-xs text-[#65756F] mt-0.5">
            Supervise campus node onboarding, security quarantines, cluster utilization, and academic access privileges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#18845B] bg-[#B8F0D2] px-3 py-1.5 rounded-xl border border-[#B8F0D2] font-semibold">
            Cluster Policy: ACTIVE
          </span>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <span className="text-xs font-mono text-[#65756F]">PENDING APPROVALS</span>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#D93838] tabular-nums">
            {pendingDevices.length} Nodes
          </div>
          <span className="text-xs text-[#65756F]">Awaiting hardware audit</span>
        </div>

        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <span className="text-xs font-mono text-[#65756F]">VERIFIED CLUSTER</span>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#18845B] tabular-nums">
            {approvedDevices.length} Nodes
          </div>
          <span className="text-xs text-[#18845B]">Online across 6 departments</span>
        </div>

        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <span className="text-xs font-mono text-[#65756F]">ACTIVE RESEARCH JOBS</span>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#4267D5] tabular-nums">
            {jobs.filter((j) => j.status === 'Running').length}
          </div>
          <span className="text-xs text-[#65756F]">{jobs.length} Total Submissions</span>
        </div>

        <div className="p-5 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-1">
          <span className="text-xs font-mono text-[#65756F]">REGISTERED RESEARCHERS</span>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-[#20332D] tabular-nums">
            184
          </div>
          <span className="text-xs text-[#18845B]">Zero security violations</span>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl shadow-xs overflow-hidden">
        <div className="flex border-b border-[#E6ECE7] px-6 pt-3 gap-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 border-b-2 cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pending'
                ? 'border-[#18845B] text-[#18845B]'
                : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            <span>Node Approval Queue</span>
            {pendingDevices.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#FF8E8E] text-white text-[10px] font-mono">
                {pendingDevices.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-3 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'devices'
                ? 'border-[#18845B] text-[#18845B]'
                : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            All Cluster Hardware ({devices.length})
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'jobs'
                ? 'border-[#18845B] text-[#18845B]'
                : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            Global Workload Monitor ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 border-b-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-[#18845B] text-[#18845B]'
                : 'border-transparent text-[#65756F] hover:text-[#20332D]'
            }`}
          >
            Security Audit Logs
          </button>
        </div>

        {/* Tab 1: Pending Device Approvals */}
        {activeTab === 'pending' && (
          <div className="p-6 space-y-4">
            {pendingDevices.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#65756F] space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#18845B] mx-auto" />
                <p className="font-heading font-semibold text-sm text-[#20332D]">No nodes awaiting verification</p>
                <p>All registered campus workstations and laboratories have been vetted.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingDevices.map((dev) => (
                  <div
                    key={dev.id}
                    className="p-4 bg-[#FAFBF7] border border-[#E6ECE7] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-[#20332D]">{dev.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                          Awaiting Approval
                        </span>
                      </div>
                      <span className="text-[#65756F] block mt-0.5">
                        {dev.department} · {dev.campusLocation}
                      </span>
                      <span className="font-mono text-[11px] text-[#20332D] block mt-1">
                        Specs: {dev.gpuModel} ({dev.gpuVramGb}GB VRAM), {dev.ramGb}GB RAM, {dev.cpuCores} Cores
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setSelectedDeviceModal(dev)}
                        className="px-3 py-1.5 text-xs font-medium text-[#65756F] hover:text-[#20332D] bg-white border border-[#E6ECE7] rounded-xl cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => adminRejectDevice(dev.id)}
                        className="px-3 py-1.5 text-xs font-medium text-[#D93838] hover:bg-[#FF8E8E]/10 border border-[#FF8E8E] rounded-xl cursor-pointer"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => adminApproveDevice(dev.id)}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify & Add to Mesh</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Hardware */}
        {activeTab === 'devices' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBF7] border-b border-[#E6ECE7] text-[#65756F] font-mono text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">NODE</th>
                    <th className="py-2.5 px-3">DEPARTMENT</th>
                    <th className="py-2.5 px-3">GPU ACCELERATOR</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">LOAD</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6ECE7]">
                  {devices.map((d) => (
                    <tr key={d.id} className="hover:bg-[#FAFBF7]">
                      <td className="py-3 px-3 font-semibold text-[#20332D]">{d.name}</td>
                      <td className="py-3 px-3 text-[#65756F]">{d.department}</td>
                      <td className="py-3 px-3 font-mono">{d.gpuModel} ({d.gpuVramGb}GB)</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          d.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                          d.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                          d.status === 'fault' ? 'bg-[#FF8E8E] text-[#901313]' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono">{d.utilizationPct}%</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedDeviceModal(d)}
                          className="text-[#18845B] hover:underline font-semibold cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Global Workload Monitor */}
        {activeTab === 'jobs' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBF7] border-b border-[#E6ECE7] text-[#65756F] font-mono text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">JOB ID</th>
                    <th className="py-2.5 px-3">WORKLOAD NAME</th>
                    <th className="py-2.5 px-3">TYPE</th>
                    <th className="py-2.5 px-3">ASSIGNED HOST</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">ADMIN CONTROL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6ECE7]">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-[#FAFBF7]">
                      <td className="py-3 px-3 font-mono font-semibold text-[#18845B]">{j.id}</td>
                      <td className="py-3 px-3 font-medium text-[#20332D]">{j.workloadName}</td>
                      <td className="py-3 px-3 text-[#65756F]">{j.workloadType}</td>
                      <td className="py-3 px-3 text-[#65756F] truncate max-w-[150px]">{j.assignedDeviceName || 'Queued'}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          j.status === 'Running' ? 'bg-[#B8F0D2] text-[#18845B]' :
                          j.status === 'Completed' ? 'bg-[#18845B] text-white' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {j.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {j.status === 'Running' ? (
                          <button
                            onClick={() => cancelJob(j.id)}
                            className="px-2.5 py-1 text-[11px] text-[#D93838] hover:bg-[#FF8E8E]/10 border border-[#FF8E8E] rounded-lg cursor-pointer"
                          >
                            Terminate
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedJobModal(j)}
                            className="text-[#18845B] hover:underline font-semibold cursor-pointer"
                          >
                            Inspect
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Security Audit Logs */}
        {activeTab === 'audit' && (
          <div className="p-6 font-mono text-xs space-y-2">
            {[
              { time: '05:18:22', text: 'Coordinator probe: 8/8 nodes heartbeat healthy. Average latency 14ms.' },
              { time: '04:45:10', text: 'Rootless container CG-JOB-8421 memory barrier verified. No privileged sys_admin calls.' },
              { time: '03:12:00', text: 'TLS certificate rotation executed for campus cluster mesh endpoint.' },
              { time: '01:05:40', text: 'Automatic backup snapshot of model checkpoint ledger completed to MinIO S3 bucket.' }
            ].map((log, i) => (
              <div key={i} className="p-3 bg-[#FAFBF7] rounded-xl border border-[#E6ECE7] text-[#65756F] flex items-center gap-3">
                <span className="text-[#18845B] font-semibold shrink-0">[{log.time}]</span>
                <span className="text-[#20332D]">{log.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
