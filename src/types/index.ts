export type DeviceType = 'lab_workstation' | 'research_server' | 'student_laptop' | 'gpu_node' | 'computing_station';

export type DeviceStatus = 'online' | 'busy' | 'offline' | 'fault';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  department: string;
  campusLocation: string;
  cpuModel: string;
  cpuCores: number;
  cpuUsagePct: number;
  gpuModel: string;
  gpuVramGb: number;
  gpuUsagePct: number;
  ramGb: number;
  ramAvailableGb: number;
  storageGb: number;
  status: DeviceStatus;
  utilizationPct: number;
  uptimePct: number;
  contributedHours: number;
  creditsEarned: number;
  hourlyCreditRate: number;
  ownerName: string;
  ownerRole: 'Lab Admin' | 'Student' | 'Researcher';
  isAvailableForSharing: boolean;
  scheduleDescription: string;
  networkBandwidthMbps: number;
  lastHeartbeat: string;
  activeJobId?: string;
  temperatureC: number;
  approvedByAdmin: boolean;
}

export type WorkloadType = 'Model Training' | 'Model Fine-Tuning' | 'Model Testing' | 'Data Processing';

export type JobStatus = 'Queued' | 'Allocating' | 'Running' | 'Completed' | 'Failed' | 'Interrupted';

export interface WorkloadJob {
  id: string;
  projectName: string;
  workloadName: string;
  description: string;
  workloadType: WorkloadType;
  requiredVramGb: number;
  requiredRamGb: number;
  requiredCores: number;
  estimatedHours: number;
  priority: 'Normal' | 'High' | 'Priority';
  status: JobStatus;
  progressPct: number;
  assignedDeviceId?: string;
  assignedDeviceName?: string;
  submissionTime: string;
  startedTime?: string;
  completedTime?: string;
  creditsCost: number;
  executionLogs: string[];
  checkpointEpoch: number;
  totalEpochs: number;
  datasetName: string;
  datasetSizeMb: number;
  lossMetric?: number;
  accuracyMetric?: number;
}

export type TransactionType = 'earned' | 'spent' | 'bonus' | 'refund';

export interface CreditTransaction {
  id: string;
  timestamp: string;
  type: TransactionType;
  amount: number;
  description: string;
  relatedJobId?: string;
  relatedDeviceId?: string;
}

export type UserRole = 'student' | 'contributor' | 'admin';

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  studentId?: string;
  role: UserRole;
  creditsBalance: number;
  contributedHours: number;
  jobsSubmittedCount: number;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionView?: string;
}

export interface MatchScoreResult {
  device: Device;
  score: number;
  rating: 'Excellent Match' | 'Good Match' | 'Not Suitable';
  reasons: string[];
  isEligible: boolean;
}
