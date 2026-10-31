import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Laptop,
  UploadCloud,
  Compass,
  Cpu,
  Layers,
  Coins,
  ShieldAlert
} from 'lucide-react';

export const DemoGuideModal: React.FC = () => {
  const {
    isDemoTourOpen,
    closeDemoTour,
    demoTourStep,
    nextDemoTourStep,
    prevDemoTourStep,
    setCurrentView,
    triggerFaultSimulation
  } = useApp();

  if (!isDemoTourOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Connecting Idle Campus Devices',
      targetView: 'contribute',
      icon: Laptop,
      color: '#18845B',
      description:
        'University computer labs, research servers, and student workstations frequently sit idle overnight and between classes. Contributors declare their idle schedules and connect their hardware via the Campus Grid agent.',
      actionLabel: 'View Contributor Dashboard',
      takeaway: 'Key Innovation: Turns dorm laptops & empty lab PCs into shared compute without hardware purchases.'
    },
    {
      step: 2,
      title: 'Discovering & Matching Resources',
      targetView: 'explorer',
      icon: Compass,
      color: '#4267D5',
      description:
        'When a researcher or student needs computing power, the intelligent matching engine analyzes VRAM headroom, free RAM, CPU topology, and network bandwidth. It filters candidates and presents clear, transparent explanations.',
      actionLabel: 'Open Resource Explorer',
      takeaway: 'Key Innovation: Eliminates guessing which lab computer can fit a 24GB or 48GB PyTorch model.'
    },
    {
      step: 3,
      title: 'Submitting an AI/ML Workload',
      targetView: 'submit',
      icon: UploadCloud,
      color: '#65BDEB',
      description:
        'The student specifies training parameters, uploads dataset archives, and selects execution priorities. Workloads run within gVisor-isolated container sandboxes with zero host filesystem access.',
      actionLabel: 'View Workload Submission',
      takeaway: 'Key Innovation: Enterprise-grade sandboxing protects host student machines from arbitrary code execution.'
    },
    {
      step: 4,
      title: 'Tracking Live Job Progress & Logs',
      targetView: 'jobs',
      icon: Layers,
      color: '#B9A5F5',
      description:
        'Real-time streaming telemetry displays epoch loss, validation accuracy curves, hardware temperatures, and periodic model checkpoints. Users can cancel or resume runs at any time.',
      actionLabel: 'Inspect Active Workloads',
      takeaway: 'Key Innovation: Automated epoch checkpointing enables instant resumption if a machine is unplugged.'
    },
    {
      step: 5,
      title: 'Fault Recovery & Auto-Failover',
      targetView: 'fault_recovery',
      icon: ShieldAlert,
      color: '#FF8E8E',
      description:
        'What happens when a student packs up their laptop or a lab PC shuts down? The Coordinator prober detects missing heartbeats, quarantines the node, and automatically migrates the job to an idle backup node without losing trained weights.',
      actionLabel: 'Launch Recovery Simulator',
      takeaway: 'Key Innovation: Byzantine fault tolerance keeps student research on schedule even with volatile edge nodes.'
    },
    {
      step: 6,
      title: 'Compute Credit Economy',
      targetView: 'credits',
      icon: Coins,
      color: '#FFAD70',
      description:
        'Sharing idle compute earns Compute Credits at fair rates based on GPU VRAM. Contributors can then spend those credits when they have large deadline workloads, creating a self-sustaining academic compute ecosystem.',
      actionLabel: 'Review Credits Economy',
      takeaway: 'Key Innovation: Fair academic economy replaces costly commercial cloud GPU bills ($3–$6/hr).'
    }
  ];

  const current = steps[demoTourStep];
  const StepIcon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E6ECE7] rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header Strip */}
        <div className="p-6 border-b border-[#E6ECE7] flex items-center justify-between bg-[#FAFBF7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#18845B] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#B8F0D2]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#65756F] block">
                HACKATHON DEMO TOUR · STEP {current.step} OF 6
              </span>
              <h3 className="font-heading font-bold text-base text-[#20332D]">
                {current.title}
              </h3>
            </div>
          </div>
          <button
            onClick={closeDemoTour}
            className="p-1.5 rounded-lg text-[#65756F] hover:bg-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Step visual indicator */}
          <div className="flex items-center gap-1.5">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  idx === demoTourStep
                    ? 'bg-[#18845B]'
                    : idx < demoTourStep
                    ? 'bg-[#B8F0D2]'
                    : 'bg-[#E6ECE7]'
                }`}
              />
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
              style={{ backgroundColor: `${current.color}15`, color: current.color }}
            >
              <StepIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm text-[#20332D] leading-relaxed">
                {current.description}
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-[#E6ECE7] text-[11px] font-medium text-[#18845B]">
                {current.takeaway}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#E6ECE7] bg-[#FAFBF7] flex items-center justify-between">
          <button
            disabled={demoTourStep === 0}
            onClick={prevDemoTourStep}
            className="px-3 py-2 text-xs font-semibold text-[#65756F] hover:text-[#20332D] disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentView(current.targetView);
                if (current.targetView === 'fault_recovery' && demoTourStep === 4) {
                  // Let user see fault recovery view
                }
              }}
              className="px-3 py-2 text-xs font-semibold text-[#4267D5] bg-white border border-[#65BDEB]/50 rounded-xl hover:bg-[#FAFBF7] cursor-pointer shadow-xs"
            >
              {current.actionLabel}
            </button>

            {demoTourStep < steps.length - 1 ? (
              <button
                onClick={nextDemoTourStep}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={closeDemoTour}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span>Finish Tour</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
