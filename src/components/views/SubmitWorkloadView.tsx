import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UploadCloud,
  FileText,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Coins,
  ShieldCheck,
  ArrowRight,
  Database
} from 'lucide-react';
import { WorkloadType, WorkloadJob } from '../../types';

export const SubmitWorkloadView: React.FC = () => {
  const { currentUser, submitWorkload, setCurrentView, setSelectedJobModal } = useApp();

  const [projectName, setProjectName] = useState('Campus Vision Transformer');
  const [workloadName, setWorkloadName] = useState('ViT-B/16 Self-Attention Fine-Tune');
  const [description, setDescription] = useState('Fine-tuning vision transformer on campus drone aerial imagery dataset.');
  const [workloadType, setWorkloadType] = useState<WorkloadType>('Model Fine-Tuning');
  const [requiredVramGb, setRequiredVramGb] = useState(24);
  const [requiredRamGb, setRequiredRamGb] = useState(32);
  const [requiredCores, setRequiredCores] = useState(16);
  const [estimatedHours, setEstimatedHours] = useState(3);
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Priority'>('Normal');
  const [datasetName, setDatasetName] = useState('campus-aerial-tiles-2026.tar.gz');
  const [datasetSizeMb, setDatasetSizeMb] = useState(850);

  // Scheduling animation modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccessModal, setSubmissionSuccessModal] = useState<{
    job: WorkloadJob;
    deviceName: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const estimatedCredits = Math.round(
    estimatedHours * 10 * (priority === 'Priority' ? 1.5 : 1)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitWorkload({
        projectName,
        workloadName,
        description,
        workloadType,
        requiredVramGb,
        requiredRamGb,
        requiredCores,
        estimatedHours,
        priority,
        datasetName,
        datasetSizeMb
      });

      setIsSubmitting(false);

      if (res.success && res.job) {
        setSubmissionSuccessModal({
          job: res.job,
          deviceName: res.matchedDevice?.name || 'Distributed Campus Node'
        });
      } else {
        setErrorMessage(res.message || 'Workload submission failed.');
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
          Submit AI / ML Workload
        </h2>
        <p className="text-xs text-[#65756F] mt-0.5">
          Schedule training, fine-tuning, or inference jobs onto verified idle campus nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Submission Form */}
        <div className="lg:col-span-2 bg-white border border-[#E6ECE7] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-[#FF8E8E]/15 border border-[#FF8E8E] text-[#D93838] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-[#20332D] mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. BioBERT Clinical NLP"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#20332D] mb-1">Workload Name</label>
                <input
                  type="text"
                  required
                  value={workloadName}
                  onChange={(e) => setWorkloadName(e.target.value)}
                  placeholder="e.g. Transformer Epoch 1-5"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#20332D] mb-1">Workload Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly state training objective, hyperparameters, or target model architecture..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] focus:border-[#18845B] focus:outline-hidden resize-none"
              />
            </div>

            {/* Workload Type Selector */}
            <div>
              <label className="block font-medium text-[#20332D] mb-1.5">Workload Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Model Training', 'Model Fine-Tuning', 'Model Testing', 'Data Processing'] as WorkloadType[]).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setWorkloadType(type)}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                      workloadType === type
                        ? 'bg-[#18845B] text-white border-[#18845B] shadow-xs'
                        : 'bg-[#FAFBF7] border-[#E6ECE7] text-[#20332D] hover:border-[#18845B]/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Resource Requirements Sliders */}
            <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] space-y-4">
              <span className="font-heading font-semibold text-xs text-[#20332D] block">
                Required Compute Capacity
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#65756F]">GPU VRAM:</span>
                    <span className="font-mono font-semibold text-[#20332D]">{requiredVramGb} GB</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="80"
                    step="8"
                    value={requiredVramGb}
                    onChange={(e) => setRequiredVramGb(Number(e.target.value))}
                    className="w-full accent-[#18845B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
                    <span>8GB</span>
                    <span>24GB</span>
                    <span>80GB</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#65756F]">System RAM:</span>
                    <span className="font-mono font-semibold text-[#20332D]">{requiredRamGb} GB</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    step="16"
                    value={requiredRamGb}
                    onChange={(e) => setRequiredRamGb(Number(e.target.value))}
                    className="w-full accent-[#4267D5] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
                    <span>16GB</span>
                    <span>64GB</span>
                    <span>128GB</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#65756F]">Duration:</span>
                    <span className="font-mono font-semibold text-[#20332D]">{estimatedHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full accent-[#FFAD70] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#65756F] font-mono">
                    <span>1 hr</span>
                    <span>6 hrs</span>
                    <span>12 hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dataset Upload Area */}
            <div>
              <label className="block font-medium text-[#20332D] mb-1.5">Dataset Package & Checkpoints</label>
              <div className="border-2 border-dashed border-[#E6ECE7] rounded-2xl p-6 text-center bg-[#FAFBF7] hover:border-[#18845B]/60 transition-colors">
                <Database className="w-8 h-8 text-[#18845B] mx-auto mb-2 opacity-80" />
                <span className="font-heading font-medium text-xs text-[#20332D] block">
                  {datasetName} ({datasetSizeMb} MB)
                </span>
                <span className="text-[11px] text-[#65756F] block mt-1">
                  Supported formats: .tar.gz, .parquet, .pt, .jsonl, .zip
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDatasetName(`campus-dataset-${Date.now().toString().slice(-4)}.parquet`);
                    setDatasetSizeMb(Math.floor(200 + Math.random() * 800));
                  }}
                  className="mt-2 text-[11px] font-semibold text-[#18845B] hover:underline cursor-pointer"
                >
                  Simulate Picking Another Dataset File
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-2xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Scheduler Matching Optimal Hardware Node...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Workload to Campus Grid</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Side Summary & Security Info */}
        <div className="space-y-5">
          {/* Credit Estimation Card */}
          <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6ECE7]">
              <span className="font-heading font-semibold text-sm text-[#20332D]">Compute Billing</span>
              <Coins className="w-4 h-4 text-[#FFAD70]" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[#65756F]">
                <span>Rate per GPU hour</span>
                <span className="font-mono text-[#20332D]">10 credits</span>
              </div>
              <div className="flex justify-between text-[#65756F]">
                <span>Estimated duration</span>
                <span className="font-mono text-[#20332D]">{estimatedHours} hrs</span>
              </div>
              <div className="flex justify-between text-[#65756F]">
                <span>Scheduling tier</span>
                <span className="font-mono text-[#20332D]">{priority}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6ECE7] font-semibold text-sm text-[#20332D]">
                <span>Total Workload Cost</span>
                <span className="font-mono text-[#18845B]">{estimatedCredits} Credits</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAFBF7] border border-[#E6ECE7] text-[11px] text-[#65756F]">
              Your Balance: <strong className="font-mono text-[#20332D]">{currentUser.creditsBalance} Credits</strong>.
              {currentUser.creditsBalance < estimatedCredits && (
                <span className="text-[#D93838] block mt-1">
                  Warning: Insufficient credits. Claim daily stipend or share your device!
                </span>
              )}
            </div>
          </div>

          {/* Sandboxing & Privacy */}
          <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#18845B]">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-heading font-semibold text-sm text-[#20332D]">Isolation & Checkpointing</span>
            </div>
            <p className="text-[#65756F] leading-relaxed">
              Every job runs in an isolated gVisor sandbox container. Checkpoints are automatically synced to campus object storage every epoch for instant failover recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {submissionSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E6ECE7] rounded-3xl shadow-2xl max-w-md w-full p-6 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-[#B8F0D2] text-[#18845B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-bold text-lg text-[#20332D]">
              Workload Successfully Allocated!
            </h3>

            <p className="text-xs text-[#65756F] leading-relaxed">
              Your workload <strong className="text-[#20332D]">{submissionSuccessModal.job.workloadName}</strong> has been assigned to <strong className="text-[#18845B]">{submissionSuccessModal.deviceName}</strong>. Container spawned and training has begun.
            </p>

            <div className="p-3 bg-[#FAFBF7] rounded-2xl border border-[#E6ECE7] text-left text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[#65756F]">Job ID:</span>
                <span className="text-[#18845B] font-semibold">{submissionSuccessModal.job.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#65756F]">Credits Deducted:</span>
                <span className="text-[#20332D] font-semibold">{submissionSuccessModal.job.creditsCost} cr</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const j = submissionSuccessModal.job;
                  setSubmissionSuccessModal(null);
                  setSelectedJobModal(j);
                  setCurrentView('jobs');
                }}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#18845B] rounded-xl hover:bg-[#146e4b] cursor-pointer shadow-xs"
              >
                Track Live Progress
              </button>
              <button
                onClick={() => setSubmissionSuccessModal(null)}
                className="py-2.5 px-4 text-xs font-medium text-[#65756F] hover:text-[#20332D] cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
