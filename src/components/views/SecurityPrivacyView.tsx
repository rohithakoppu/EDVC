import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  FileCheck,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';

export const SecurityPrivacyView: React.FC = () => {
  const [checklist, setChecklist] = useState({
    sandbox: true,
    fileIsolation: true,
    networkFirewall: true,
    ephemeralData: true,
    rbacAuth: true,
    auditLogging: true,
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
          Security, Isolation & Privacy Architecture
        </h2>
        <p className="text-xs text-[#65756F] mt-0.5">
          How Campus Grid isolates AI workloads, protects host filesystems, and guarantees student privacy.
        </p>
      </div>

      {/* 5-Step Security Pipeline Workflow */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="pb-3 border-b border-[#E6ECE7]">
          <h3 className="font-heading font-bold text-base text-[#20332D]">
            End-to-End Secure Workload Lifecycle
          </h3>
          <p className="text-xs text-[#65756F]">Every submitted neural network undergoes 5 stages of verification</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              num: '1',
              title: 'Student Submission',
              desc: 'Encrypted code & dataset staged with SHA-256 checksum verification.',
              icon: FileCheck,
              color: '#18845B'
            },
            {
              num: '2',
              title: 'Coordinator Validation',
              desc: 'Static AST scan flags unauthorized system calls (sockets, forks, host mounts).',
              icon: ShieldCheck,
              color: '#4267D5'
            },
            {
              num: '3',
              title: 'Contributor Rules',
              desc: 'Job matched only if within owner’s approved idle hours & thermal caps.',
              icon: UserCheck,
              color: '#65BDEB'
            },
            {
              num: '4',
              title: 'gVisor Sandboxing',
              desc: 'Executes inside rootless container with virtualized kernel & zero host disk access.',
              icon: Lock,
              color: '#B9A5F5'
            },
            {
              num: '5',
              title: 'Safe Artifact Delivery',
              desc: 'Model weights returned to student; temporary execution container shredded.',
              icon: CheckCircle2,
              color: '#18845B'
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs" style={{ color: step.color }}>
                    STAGE {step.num}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-xs text-[#20332D]">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#65756F] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Guarantees & Checklist Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Guarantees */}
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#20332D] pb-3 border-b border-[#E6ECE7]">
            Core Host Protection Guarantees
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1">
              <span className="font-heading font-semibold text-[#20332D] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#18845B]" />
                Zero Host File System Access
              </span>
              <p className="text-[#65756F]">
                Workloads run inside isolated containers with dedicated RAM and scratch storage. They cannot view your desktop, documents, browser history, or local SSH keys.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1">
              <span className="font-heading font-semibold text-[#20332D] flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#4267D5]" />
                Enforced Thermal & Resource Capping
              </span>
              <p className="text-[#65756F]">
                Contributors define maximum temperature limits (e.g. 75°C) and CPU cores. If host laptop detects keyboard activity or thermal spikes, workloads automatically pause.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-1">
              <span className="font-heading font-semibold text-[#20332D] flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#FFAD70]" />
                Instant Disconnect Control
              </span>
              <p className="text-[#65756F]">
                Device owners retain sovereign authority. Unplugging your laptop or toggling "Pause Sharing" immediately revokes compute access; your job migrates to backup nodes.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Security Controls Audit */}
        <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6ECE7]">
            <h3 className="font-heading font-bold text-base text-[#20332D]">
              Security Controls Audit Checklist
            </h3>
            <span className="text-[10px] font-mono text-[#18845B] bg-[#B8F0D2] px-2 py-0.5 rounded">
              All Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                key: 'sandbox',
                title: 'Rootless Container Sandbox (gVisor/Kata)',
                desc: 'Traps system calls at the hypervisor layer to prevent kernel exploits.'
              },
              {
                key: 'fileIsolation',
                title: 'Virtual Scratch Storage Shredding',
                desc: 'Temporary model training scratch space is overwritten with cryptographically random zeros.'
              },
              {
                key: 'networkFirewall',
                title: 'Egress Network Isolation',
                desc: 'Worker node containers are forbidden from initiating outbound connections to campus intranets.'
              },
              {
                key: 'ephemeralData',
                title: 'End-to-End TLS 1.3 Encryption',
                desc: 'All weight vectors and training dataset chunks are encrypted in transit with mTLS.'
              },
              {
                key: 'rbacAuth',
                title: 'Role-Based Campus Access Control (RBAC)',
                desc: 'Institutional identity verification prevents unauthorized external actors from running compute.'
              }
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] hover:bg-white cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={(checklist as any)[item.key]}
                  onChange={() =>
                    setChecklist((prev) => ({ ...prev, [item.key]: !(prev as any)[item.key] }))
                  }
                  className="mt-0.5 rounded border-[#E6ECE7] text-[#18845B] focus:ring-[#18845B]"
                />
                <div>
                  <span className="font-medium text-[#20332D] block">{item.title}</span>
                  <span className="text-[11px] text-[#65756F] leading-tight block mt-0.5">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Prototype Notice */}
      <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] text-xs text-[#65756F]">
        <p>
          <strong>Prototype Note:</strong> In production, Campus Grid builds upon standard open-source enterprise sandboxes like Google gVisor and Docker rootless execution mode. The controls rendered above demonstrate the architectural blueprint of our campus deployment.
        </p>
      </div>
    </div>
  );
};
