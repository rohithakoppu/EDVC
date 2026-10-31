import React, { useState } from 'react';
import { Cpu, Server, Laptop, Activity, Zap, ShieldCheck } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'hub' | 'server' | 'lab' | 'laptop';
  x: number;
  y: number;
  label: string;
  specs: string;
  status: 'active' | 'sharing' | 'idle';
  color: string;
  load: number;
}

export const LandingHeroNetworkSvg: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [pulseActive, setPulseActive] = useState(true);

  const hubNode: NetworkNode = {
    id: 'hub',
    name: 'Campus Grid Core Hub',
    type: 'hub',
    x: 400,
    y: 220,
    label: 'Campus Grid Coordinator',
    specs: 'Scheduler & Fault Recovery Engine',
    status: 'active',
    color: '#18845B',
    load: 46
  };

  const satelliteNodes: NetworkNode[] = [
    {
      id: 'node-1',
      name: 'Research Server 02',
      type: 'server',
      x: 170,
      y: 90,
      label: 'HPC Center (A100)',
      specs: '80GB VRAM · 128 Cores · 99.9% Uptime',
      status: 'active',
      color: '#4267D5',
      load: 82
    },
    {
      id: 'node-2',
      name: 'AI Lab Workstation 01',
      type: 'lab',
      x: 620,
      y: 95,
      label: 'CS Lab 315 (RTX 4090)',
      specs: '24GB VRAM · 24 Cores · 128GB RAM',
      status: 'sharing',
      color: '#18845B',
      load: 28
    },
    {
      id: 'node-3',
      name: 'Student Laptop 03',
      type: 'laptop',
      x: 670,
      y: 310,
      label: "Alex's Dorm Laptop",
      specs: '8GB RTX 4070 · Idle Sharing Mode',
      status: 'sharing',
      color: '#FFAD70',
      load: 14
    },
    {
      id: 'node-4',
      name: 'Robotics GPU Node 04',
      type: 'lab',
      x: 400,
      y: 380,
      label: 'Robotics Cluster',
      specs: 'Dual RTX 3090 (48GB) · 10Gbps Link',
      status: 'active',
      color: '#65BDEB',
      load: 22
    },
    {
      id: 'node-5',
      name: 'Graduate M2 Max',
      type: 'laptop',
      x: 130,
      y: 310,
      label: "Priya's M2 Max",
      specs: '64GB Unified Memory · Apple Silicon',
      status: 'sharing',
      color: '#B9A5F5',
      load: 18
    }
  ];

  return (
    <div className="relative w-full rounded-2xl bg-white border border-[#E6ECE7] shadow-sm p-4 md:p-6 overflow-hidden">
      {/* Header bar within visualization */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6ECE7] text-xs">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-[#20332D] flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#18845B]" />
            Live Campus Mesh Topology
          </span>
          <span className="text-[#65756F]">·</span>
          <span className="text-[#65756F]">Interactive Prototype Visualization</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPulseActive(!pulseActive)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#FAFBF7] border border-[#E6ECE7] rounded-lg text-[#20332D] hover:bg-[#FAFBF7]/80 cursor-pointer"
          >
            <Zap className={`w-3.5 h-3.5 ${pulseActive ? 'text-[#18845B]' : 'text-slate-400'}`} />
            {pulseActive ? 'Packet Stream Active' : 'Pause Stream'}
          </button>
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="relative w-full aspect-[16/9] max-h-[420px] select-none">
        <svg
          viewBox="0 0 800 440"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B8F0D2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAFBF7" stopOpacity="0" />
            </radialGradient>
            
            <linearGradient id="lineGradServer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4267D5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#18845B" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="lineGradLab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18845B" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#65BDEB" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="lineGradLaptop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAD70" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#18845B" stopOpacity="0.7" />
            </linearGradient>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#20332D" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Central Radial Aura */}
          <circle cx={hubNode.x} cy={hubNode.y} r="140" fill="url(#hubGlow)" />

          {/* Background campus grid lines */}
          <g opacity="0.12" stroke="#65756F" strokeWidth="0.8" strokeDasharray="4 4">
            <line x1="100" y1="50" x2="700" y2="50" />
            <line x1="100" y1="150" x2="700" y2="150" />
            <line x1="100" y1="250" x2="700" y2="250" />
            <line x1="100" y1="350" x2="700" y2="350" />
            <line x1="200" y1="30" x2="200" y2="400" />
            <line x1="400" y1="30" x2="400" y2="400" />
            <line x1="600" y1="30" x2="600" y2="400" />
          </g>

          {/* Connection Lines from Satellites to Hub */}
          {satelliteNodes.map((node) => {
            const isHovered = selectedNode?.id === node.id;
            const pathId = `path-${node.id}`;
            const pathD = `M ${node.x} ${node.y} Q ${(node.x + hubNode.x) / 2} ${(node.y + hubNode.y) / 2 - 20} ${hubNode.x} ${hubNode.y}`;

            return (
              <g key={node.id}>
                {/* Connecting Path */}
                <path
                  id={pathId}
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? node.color : '#E6ECE7'}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  strokeDasharray={node.status === 'sharing' ? '6 4' : 'none'}
                  className="transition-colors duration-200"
                />

                {/* Animated Moving Data Packets */}
                {pulseActive && (
                  <circle r="4" fill={node.color} opacity="0.9">
                    <animateMotion
                      dur={node.type === 'server' ? '2.4s' : node.type === 'lab' ? '3.2s' : '4s'}
                      repeatCount="indefinite"
                      path={pathD}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                )}
                {pulseActive && (
                  <circle r="3" fill="#18845B" opacity="0.7">
                    <animateMotion
                      dur="3.8s"
                      repeatCount="indefinite"
                      path={`M ${hubNode.x} ${hubNode.y} Q ${(node.x + hubNode.x) / 2} ${(node.y + hubNode.y) / 2 - 20} ${node.x} ${node.y}`}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Central Hub Node */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedNode(hubNode)}
            filter="url(#shadow)"
          >
            <circle
              cx={hubNode.x}
              cy={hubNode.y}
              r="44"
              fill="#FFFFFF"
              stroke="#18845B"
              strokeWidth="2.5"
            />
            <circle
              cx={hubNode.x}
              cy={hubNode.y}
              r="36"
              fill="#FAFBF7"
            />
            <foreignObject x={hubNode.x - 22} y={hubNode.y - 22} width="44" height="44">
              <div className="w-full h-full flex items-center justify-center text-[#18845B]">
                <Cpu className="w-6 h-6 animate-spin" style={{ animationDuration: '16s' }} />
              </div>
            </foreignObject>
            <text
              x={hubNode.x}
              y={hubNode.y + 60}
              textAnchor="middle"
              className="text-[12px] font-heading font-semibold fill-[#20332D]"
            >
              CAMPUS COORDINATOR
            </text>
            <text
              x={hubNode.x}
              y={hubNode.y + 75}
              textAnchor="middle"
              className="text-[10px] font-mono fill-[#18845B]"
            >
              8 Nodes · 99.8% Mesh Health
            </text>
          </g>

          {/* Satellite Nodes */}
          {satelliteNodes.map((node) => {
            const isHovered = selectedNode?.id === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setSelectedNode(node)}
                filter="url(#shadow)"
              >
                {/* Node Outer Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? '28' : '24'}
                  fill="#FFFFFF"
                  stroke={node.color}
                  strokeWidth={isHovered ? '2.5' : '1.8'}
                  className="transition-all duration-200"
                />

                {/* Node Icon inside */}
                <foreignObject x={node.x - 14} y={node.y - 14} width="28" height="28">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ color: node.color }}
                  >
                    {node.type === 'server' && <Server className="w-4 h-4" />}
                    {node.type === 'lab' && <Cpu className="w-4 h-4" />}
                    {node.type === 'laptop' && <Laptop className="w-4 h-4" />}
                  </div>
                </foreignObject>

                {/* Node Label Below */}
                <text
                  x={node.x}
                  y={node.y + 38}
                  textAnchor="middle"
                  className="text-[11px] font-heading font-medium fill-[#20332D]"
                >
                  {node.name}
                </text>
                <text
                  x={node.x}
                  y={node.y + 51}
                  textAnchor="middle"
                  className="text-[9.5px] font-mono fill-[#65756F]"
                >
                  {node.load}% Load
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Floating Inspector */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-[#E6ECE7] rounded-xl p-3 shadow-md max-w-[260px] text-xs transition-all animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E6ECE7]">
              <span className="font-heading font-semibold text-[#20332D]">{selectedNode.name}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedNode.color }}
              />
            </div>
            <p className="text-[#65756F] mt-1.5">{selectedNode.specs}</p>
            <div className="mt-2 pt-2 border-t border-[#E6ECE7] flex items-center justify-between text-[11px]">
              <span className="text-[#65756F]">Active Load</span>
              <span className="font-mono font-medium text-[#20332D]">{selectedNode.load}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom legend with meaningful colors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#E6ECE7] text-xs text-[#65756F]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#18845B]" />
          <span>Campus Labs (Available)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4267D5]" />
          <span>Research Servers (High Load)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFAD70]" />
          <span>Student Laptops (Idle Share)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B9A5F5]" />
          <span>Apple Silicon / Workstations</span>
        </div>
      </div>
    </div>
  );
};
