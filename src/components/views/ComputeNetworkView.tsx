import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Server,
  Cpu,
  Laptop,
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Activity,
  HardDrive,
  Wifi,
  Thermometer,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Device } from '../../types';

export const ComputeNetworkView: React.FC = () => {
  const { devices, setSelectedDeviceModal, setCurrentView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'high_gpu' | 'low_util' | 'student' | 'online'>('all');
  const [sortBy, setSortBy] = useState<'vram' | 'util' | 'ram'>('vram');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter logic
  const filteredDevices = devices
    .filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.gpuModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.department.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'high_gpu') return d.gpuVramGb >= 24;
      if (filterType === 'low_util') return d.utilizationPct < 40 && d.status === 'online';
      if (filterType === 'student') return d.type === 'student_laptop';
      if (filterType === 'online') return d.status === 'online';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'vram') return b.gpuVramGb - a.gpuVramGb;
      if (sortBy === 'util') return a.utilizationPct - b.utilizationPct;
      if (sortBy === 'ram') return b.ramAvailableGb - a.ramAvailableGb;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
            Campus Compute Nodes
          </h2>
          <p className="text-xs text-[#65756F] mt-0.5">
            Distributed GPU and CPU clusters across laboratories, datacenters, and student hardware
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('explorer')}
            className="px-3.5 py-2 text-xs font-semibold text-[#18845B] bg-white border border-[#B8F0D2] rounded-xl hover:bg-[#FAFBF7] cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Spec Matcher</span>
          </button>
          <button
            onClick={() => setCurrentView('contribute')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Register Device</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-[#E6ECE7] rounded-2xl shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#65756F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device name, GPU (e.g. RTX 4090, A100), or department..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-[#65756F]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] font-medium text-[#20332D] focus:outline-hidden cursor-pointer"
            >
              <option value="vram">Highest GPU VRAM</option>
              <option value="util">Lowest Utilization</option>
              <option value="ram">Highest Available RAM</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#FAFBF7] border border-[#E6ECE7] rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#18845B] shadow-xs' : 'text-[#65756F]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-[#18845B] shadow-xs' : 'text-[#65756F]'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips (Interactive Segmented Control Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#E6ECE7] text-xs">
          <span className="text-[11px] text-[#65756F] mr-1">Filter:</span>
          {[
            { id: 'all', label: 'All Connected' },
            { id: 'online', label: 'Online & Ready' },
            { id: 'high_gpu', label: 'High VRAM (≥24GB)' },
            { id: 'low_util', label: 'Low Utilization (<40%)' },
            { id: 'student', label: 'Student Laptops' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#18845B] text-white shadow-xs'
                  : 'bg-[#FAFBF7] text-[#65756F] border border-[#E6ECE7] hover:text-[#20332D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or List View of Devices */}
      {filteredDevices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E6ECE7] space-y-2">
          <p className="font-heading font-semibold text-base text-[#20332D]">No matching compute nodes found</p>
          <p className="text-xs text-[#65756F]">Try adjusting your search criteria or filter tags.</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterType('all'); }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-[#18845B] bg-[#FAFBF7] border border-[#B8F0D2] rounded-xl hover:bg-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              onClick={() => setSelectedDeviceModal(device)}
              className="bg-white border border-[#E6ECE7] rounded-3xl p-5 hover:border-[#18845B]/50 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-center justify-center text-[#18845B] group-hover:scale-105 transition-transform">
                      {device.type === 'student_laptop' ? (
                        <Laptop className="w-5 h-5 text-[#FFAD70]" />
                      ) : device.type === 'research_server' ? (
                        <Server className="w-5 h-5 text-[#4267D5]" />
                      ) : (
                        <Cpu className="w-5 h-5 text-[#18845B]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-sm text-[#20332D] group-hover:text-[#18845B] transition-colors">
                        {device.name}
                      </h3>
                      <span className="text-[11px] text-[#65756F] block truncate max-w-[170px]">
                        {device.department}
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold shrink-0 ${
                    device.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                    device.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                    device.status === 'fault' ? 'bg-[#FF8E8E]/30 text-[#D93838]' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {device.status}
                  </span>
                </div>

                {/* Hardware Highlights */}
                <div className="p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#65756F]">GPU Accelerator</span>
                    <span className="font-mono font-semibold text-[#20332D]">
                      {device.gpuVramGb} GB VRAM
                    </span>
                  </div>
                  <div className="text-[11px] text-[#65756F] truncate">
                    {device.gpuModel}
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#E6ECE7]/60">
                    <span className="text-[#65756F]">RAM: {device.ramAvailableGb}GB Free</span>
                    <span className="text-[#65756F]">{device.cpuCores} CPU Cores</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Utilization & Rates */}
              <div className="space-y-2 pt-2 border-t border-[#E6ECE7] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#65756F] text-[11px]">Utilization</span>
                  <span className="font-mono font-medium text-[#20332D]">{device.utilizationPct}%</span>
                </div>
                <div className="w-full bg-[#FAFBF7] h-1.5 rounded-full overflow-hidden border border-[#E6ECE7]">
                  <div
                    className={`h-full rounded-full ${
                      device.utilizationPct > 80 ? 'bg-[#FF8E8E]' :
                      device.utilizationPct > 50 ? 'bg-[#FFAD70]' :
                      'bg-[#18845B]'
                    }`}
                    style={{ width: `${device.utilizationPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#65756F] pt-1">
                  <span>Earn Rate: {device.hourlyCreditRate} cr/hr</span>
                  <span className="text-[#18845B] font-medium">{device.uptimePct}% uptime</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white border border-[#E6ECE7] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF7] border-b border-[#E6ECE7] text-[#65756F] font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">NODE NAME</th>
                  <th className="py-3 px-4">ACCELERATOR / VRAM</th>
                  <th className="py-3 px-4">RAM AVAILABLE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">LOAD</th>
                  <th className="py-3 px-4">RATE</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6ECE7]">
                {filteredDevices.map((device) => (
                  <tr
                    key={device.id}
                    onClick={() => setSelectedDeviceModal(device)}
                    className="hover:bg-[#FAFBF7] cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-heading font-medium text-[#20332D]">
                      <div className="flex items-center gap-2">
                        {device.type === 'student_laptop' ? <Laptop className="w-4 h-4 text-[#FFAD70]" /> : <Cpu className="w-4 h-4 text-[#18845B]" />}
                        <span>{device.name}</span>
                      </div>
                      <span className="text-[10px] text-[#65756F] block">{device.department}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-semibold text-[#20332D]">{device.gpuVramGb} GB</span>
                      <span className="text-[10px] text-[#65756F] block truncate max-w-[140px]">{device.gpuModel}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <span>{device.ramAvailableGb} / {device.ramGb} GB</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        device.status === 'online' ? 'bg-[#B8F0D2] text-[#18845B]' :
                        device.status === 'busy' ? 'bg-[#FFE49A] text-[#9A6200]' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      {device.utilizationPct}%
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#4267D5]">
                      {device.hourlyCreditRate} cr/hr
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeviceModal(device);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-[#18845B] hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
