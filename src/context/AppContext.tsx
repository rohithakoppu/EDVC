import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Device,
  WorkloadJob,
  CreditTransaction,
  UserProfile,
  UserRole,
  NotificationItem
} from '../types';
import {
  INITIAL_DEVICES,
  INITIAL_JOBS,
  INITIAL_TRANSACTIONS,
  DEMO_PROFILES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { matchDevicesForWorkload } from '../utils/matching';

interface FaultSimulationState {
  active: boolean;
  stage: 'idle' | 'failed' | 'detecting' | 'recovering' | 'restored';
  failedDeviceId?: string;
  restoredDeviceId?: string;
  jobId?: string;
  message: string;
}

interface AppContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  devices: Device[];
  jobs: WorkloadJob[];
  transactions: CreditTransaction[];
  notifications: NotificationItem[];
  selectedDeviceModal: Device | null;
  setSelectedDeviceModal: (device: Device | null) => void;
  selectedJobModal: WorkloadJob | null;
  setSelectedJobModal: (job: WorkloadJob | null) => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  openAuth: (tab?: 'login' | 'signup') => void;
  closeAuth: () => void;
  isDemoTourOpen: boolean;
  demoTourStep: number;
  startDemoTour: () => void;
  nextDemoTourStep: () => void;
  prevDemoTourStep: () => void;
  closeDemoTour: () => void;
  faultState: FaultSimulationState;
  triggerFaultSimulation: () => void;
  resetFaultSimulation: () => void;
  submitWorkload: (
    data: {
      projectName: string;
      workloadName: string;
      description: string;
      workloadType: WorkloadJob['workloadType'];
      requiredVramGb: number;
      requiredRamGb: number;
      requiredCores: number;
      estimatedHours: number;
      priority: 'Normal' | 'High' | 'Priority';
      datasetName: string;
      datasetSizeMb: number;
    }
  ) => { success: boolean; job?: WorkloadJob; matchedDevice?: Device; message?: string };
  registerDevice: (device: Partial<Device>) => void;
  toggleDeviceSharing: (deviceId: string) => void;
  cancelJob: (jobId: string) => void;
  retryJob: (jobId: string) => void;
  claimDailyStipend: () => void;
  adminApproveDevice: (deviceId: string) => void;
  adminRejectDevice: (deviceId: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  resetDemoData: () => void;
  loginAsDemoRole: (role: UserRole) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  DEVICES: 'campus_grid_devices_v1',
  JOBS: 'campus_grid_jobs_v1',
  TRANSACTIONS: 'campus_grid_tx_v1',
  USER: 'campus_grid_user_v1',
  NOTIFICATIONS: 'campus_grid_notif_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_PROFILES.student;
  });

  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DEVICES;
  });

  const [jobs, setJobs] = useState<WorkloadJob[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_JOBS;
  });

  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [selectedDeviceModal, setSelectedDeviceModal] = useState<Device | null>(null);
  const [selectedJobModal, setSelectedJobModal] = useState<WorkloadJob | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(0);

  const [faultState, setFaultState] = useState<FaultSimulationState>({
    active: false,
    stage: 'idle',
    message: 'System nominal. All distributed nodes operating normally.'
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Simulated live job execution loop
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) => {
        let hasChanges = false;
        const updated = prevJobs.map((job) => {
          if (job.status === 'Running' && job.progressPct < 100) {
            hasChanges = true;
            const newProgress = Math.min(100, job.progressPct + 1);
            const currentEpoch = Math.min(
              job.totalEpochs,
              Math.floor((newProgress / 100) * job.totalEpochs) + 1
            );
            
            const newLogs = [...job.executionLogs];
            if (newProgress % 5 === 0 && newProgress < 100) {
              const loss = Math.max(0.04, (job.lossMetric ?? 0.5) * 0.98).toFixed(3);
              const acc = Math.min(99.5, (job.accuracyMetric ?? 80) + 0.3).toFixed(1);
              newLogs.push(
                `[${new Date().toLocaleTimeString()}] Epoch ${currentEpoch}/${job.totalEpochs} | Batch ${Math.floor(newProgress * 18)}/1800 | Loss: ${loss} | Acc: ${acc}%`
              );
            }

            if (newProgress === 100) {
              newLogs.push(
                `[${new Date().toLocaleTimeString()}] Training loop completed successfully! Checkpoint saved: ${job.id}-final.pt`
              );
              return {
                ...job,
                progressPct: 100,
                status: 'Completed' as const,
                completedTime: 'Just now',
                checkpointEpoch: job.totalEpochs,
                executionLogs: newLogs,
              };
            }

            return {
              ...job,
              progressPct: newProgress,
              checkpointEpoch: currentEpoch,
              executionLogs: newLogs,
            };
          }
          return job;
        });

        return hasChanges ? updated : prevJobs;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const switchRole = (role: UserRole) => {
    const profile = DEMO_PROFILES[role];
    if (profile) {
      setCurrentUser(profile);
      const notif: NotificationItem = {
        id: 'notif-' + Date.now(),
        timestamp: 'Just now',
        title: `Role Switched to ${profile.role.toUpperCase()}`,
        message: `Now viewing Campus Grid as ${profile.name} (${profile.college}).`,
        type: 'info',
        read: false
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const loginAsDemoRole = (role: UserRole) => {
    switchRole(role);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setCurrentUser(DEMO_PROFILES.student);
    setCurrentView('landing');
  };

  const openAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  const startDemoTour = () => {
    setIsDemoTourOpen(true);
    setDemoTourStep(0);
  };

  const nextDemoTourStep = () => {
    setDemoTourStep((prev) => Math.min(5, prev + 1));
  };

  const prevDemoTourStep = () => {
    setDemoTourStep((prev) => Math.max(0, prev - 1));
  };

  const closeDemoTour = () => {
    setIsDemoTourOpen(false);
  };

  // Submit Workload Logic
  const submitWorkload = (data: {
    projectName: string;
    workloadName: string;
    description: string;
    workloadType: WorkloadJob['workloadType'];
    requiredVramGb: number;
    requiredRamGb: number;
    requiredCores: number;
    estimatedHours: number;
    priority: 'Normal' | 'High' | 'Priority';
    datasetName: string;
    datasetSizeMb: number;
  }) => {
    const cost = Math.round(data.estimatedHours * 10 * (data.priority === 'Priority' ? 1.5 : 1));
    if (currentUser.creditsBalance < cost) {
      return {
        success: false,
        message: `Insufficient compute credits. You need ${cost} credits, but only have ${currentUser.creditsBalance}. Claim your daily campus stipend or share idle compute to earn more!`
      };
    }

    // Match device
    const matches = matchDevicesForWorkload(devices, {
      requiredVramGb: data.requiredVramGb,
      requiredRamGb: data.requiredRamGb,
      requiredCores: data.requiredCores,
      estimatedHours: data.estimatedHours,
      priority: data.priority,
    });

    const eligible = matches.find((m) => m.isEligible && m.device.status === 'online') || matches[0];

    const jobId = `CG-JOB-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedDevice = eligible?.device;

    const newJob: WorkloadJob = {
      id: jobId,
      projectName: data.projectName,
      workloadName: data.workloadName,
      description: data.description,
      workloadType: data.workloadType,
      requiredVramGb: data.requiredVramGb,
      requiredRamGb: data.requiredRamGb,
      requiredCores: data.requiredCores,
      estimatedHours: data.estimatedHours,
      priority: data.priority,
      status: 'Running',
      progressPct: 4,
      assignedDeviceId: matchedDevice?.id,
      assignedDeviceName: matchedDevice ? `${matchedDevice.name} (${matchedDevice.gpuModel})` : 'Campus Grid Virtual Pool',
      submissionTime: 'Just now',
      startedTime: 'Just now',
      creditsCost: cost,
      executionLogs: [
        `[${new Date().toLocaleTimeString()}] Workload created with Job ID: ${jobId}`,
        `[${new Date().toLocaleTimeString()}] Requirements: ${data.requiredVramGb}GB VRAM, ${data.requiredRamGb}GB RAM, ${data.requiredCores} Cores`,
        matchedDevice
          ? `[${new Date().toLocaleTimeString()}] Scheduler matched: ${matchedDevice.name} (Score: ${eligible?.score}/100 - ${eligible?.rating})`
          : `[${new Date().toLocaleTimeString()}] Allocating dynamic compute node...`,
        `[${new Date().toLocaleTimeString()}] Staging dataset: ${data.datasetName} (${data.datasetSizeMb} MB)...`,
        `[${new Date().toLocaleTimeString()}] Container isolation verified (gVisor sandbox active). Initializing CUDA streams...`
      ],
      checkpointEpoch: 1,
      totalEpochs: data.workloadType === 'Data Processing' ? 1 : 10,
      datasetName: data.datasetName,
      datasetSizeMb: data.datasetSizeMb,
      lossMetric: 1.84,
      accuracyMetric: 54.0
    };

    // Deduct credits
    setCurrentUser((prev) => ({
      ...prev,
      creditsBalance: prev.creditsBalance - cost,
      jobsSubmittedCount: prev.jobsSubmittedCount + 1,
    }));

    // Record transaction
    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      type: 'spent',
      amount: -cost,
      description: `Job ${jobId}: ${data.workloadName} (${data.estimatedHours} hrs)`,
      relatedJobId: jobId,
      relatedDeviceId: matchedDevice?.id,
    };

    // Update device status if matched
    if (matchedDevice) {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === matchedDevice.id
            ? { ...d, status: 'busy', activeJobId: jobId, utilizationPct: Math.min(95, d.utilizationPct + 45) }
            : d
        )
      );
    }

    setJobs((prev) => [newJob, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: 'Workload Allocated Successfully',
      message: `${data.workloadName} scheduled on ${matchedDevice?.name ?? 'Compute Node'}. Deducted ${cost} credits.`,
      type: 'success',
      read: false,
      actionView: 'jobs',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, job: newJob, matchedDevice };
  };

  const registerDevice = (data: Partial<Device>) => {
    const id = `dev-contrib-${Date.now().toString().slice(-4)}`;
    const newDev: Device = {
      id,
      name: data.name || 'Personal Workstation',
      type: data.type || 'student_laptop',
      department: data.department || currentUser.college,
      campusLocation: data.campusLocation || 'Campus Node',
      cpuModel: data.cpuModel || 'Apple M-Series / Intel Core i7',
      cpuCores: data.cpuCores || 8,
      cpuUsagePct: 15,
      gpuModel: data.gpuModel || 'Integrated / Dedicated GPU',
      gpuVramGb: data.gpuVramGb || 8,
      gpuUsagePct: 10,
      ramGb: data.ramGb || 16,
      ramAvailableGb: Math.round((data.ramGb || 16) * 0.75),
      storageGb: data.storageGb || 512,
      status: 'online',
      utilizationPct: 12,
      uptimePct: 99.1,
      contributedHours: 0,
      creditsEarned: 0,
      hourlyCreditRate: Math.max(5, Math.round((data.gpuVramGb || 8) * 0.8)),
      ownerName: currentUser.name,
      ownerRole: currentUser.role === 'admin' ? 'Lab Admin' : currentUser.role === 'contributor' ? 'Researcher' : 'Student',
      isAvailableForSharing: true,
      scheduleDescription: data.scheduleDescription || 'Available when idle (22:00 - 08:00)',
      networkBandwidthMbps: data.networkBandwidthMbps || 500,
      lastHeartbeat: 'Just now',
      temperatureC: 38,
      approvedByAdmin: currentUser.role === 'admin' ? true : false,
    };

    setDevices((prev) => [newDev, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title: 'New Device Registered',
      message: `${newDev.name} registered. ${newDev.approvedByAdmin ? 'Ready for compute sharing.' : 'Submitted for campus admin approval.'}`,
      type: 'info',
      read: false,
      actionView: 'contribute',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const toggleDeviceSharing = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          const nextState = !d.isAvailableForSharing;
          return {
            ...d,
            isAvailableForSharing: nextState,
            status: nextState ? 'online' : 'offline',
          };
        }
        return d;
      })
    );
  };

  const cancelJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const refund = Math.round(job.creditsCost * ((100 - job.progressPct) / 100));

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'Failed', progressPct: j.progressPct } : j))
    );

    if (refund > 0) {
      setCurrentUser((prev) => ({
        ...prev,
        creditsBalance: prev.creditsBalance + refund,
      }));
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          timestamp: 'Just now',
          type: 'refund',
          amount: refund,
          description: `Refund for cancelled job ${jobId}`,
          relatedJobId: jobId,
        },
        ...prev,
      ]);
    }

    if (job.assignedDeviceId) {
      setDevices((prev) =>
        prev.map((d) => (d.id === job.assignedDeviceId ? { ...d, status: 'online', activeJobId: undefined } : d))
      );
    }
  };

  const retryJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'Running',
            progressPct: Math.max(10, j.checkpointEpoch > 0 ? (j.checkpointEpoch / j.totalEpochs) * 100 : 0),
            executionLogs: [
              ...j.executionLogs,
              `[${new Date().toLocaleTimeString()}] Resuming workload from checkpoint Epoch ${j.checkpointEpoch}...`
            ]
          };
        }
        return j;
      })
    );
  };

  const claimDailyStipend = () => {
    const amount = 25;
    setCurrentUser((prev) => ({
      ...prev,
      creditsBalance: prev.creditsBalance + amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        timestamp: 'Just now',
        type: 'bonus',
        amount,
        description: 'Daily Academic AI Research Stipend',
      },
      ...prev,
    ]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Daily Stipend Claimed',
        message: `+${amount} Compute Credits added to your campus balance.`,
        type: 'success',
        read: false,
        actionView: 'credits',
      },
      ...prev,
    ]);
  };

  // Fault Recovery Simulation workflow
  const triggerFaultSimulation = () => {
    // Pick an active running job and its device
    const targetJob = jobs.find((j) => j.status === 'Running' && j.assignedDeviceId) || jobs[0];
    const failedDeviceId = targetJob.assignedDeviceId || 'dev-server-02';
    const failedDevice = devices.find((d) => d.id === failedDeviceId);

    // Find compatible recovery candidate
    const backupCandidates = devices.filter(
      (d) => d.id !== failedDeviceId && d.approvedByAdmin && d.isAvailableForSharing && d.status !== 'fault'
    );
    const backupDevice = backupCandidates[0] || devices[0];

    // Stage 1: Hardware crash / disconnect
    setFaultState({
      active: true,
      stage: 'failed',
      failedDeviceId,
      restoredDeviceId: backupDevice.id,
      jobId: targetJob.id,
      message: `Node Failure: ${failedDevice?.name || 'Device'} suddenly disconnected (Heartbeat missed).`
    });

    setDevices((prev) =>
      prev.map((d) => (d.id === failedDeviceId ? { ...d, status: 'fault', utilizationPct: 0 } : d))
    );

    setJobs((prev) =>
      prev.map((j) =>
        j.id === targetJob.id
          ? {
              ...j,
              status: 'Interrupted',
              executionLogs: [
                ...j.executionLogs,
                `[${new Date().toLocaleTimeString()}] WARNING: Lost heartbeat from worker node ${failedDevice?.name || failedDeviceId}. Network socket disconnected.`
              ]
            }
          : j
      )
    );

    // Stage 2: Fault detection
    setTimeout(() => {
      setFaultState((prev) => ({
        ...prev,
        stage: 'detecting',
        message: 'Campus Grid Fault Recovery Supervisor detected heartbeat loss. Quarantine active.'
      }));

      // Stage 3: Checkpoint recovery & reallocation
      setTimeout(() => {
        setFaultState((prev) => ({
          ...prev,
          stage: 'recovering',
          message: `Inspecting checkpoint Epoch ${targetJob.checkpointEpoch}. Matching replacement node with >= ${targetJob.requiredVramGb}GB VRAM... Found ${backupDevice.name}.`
        }));

        // Stage 4: Restored
        setTimeout(() => {
          setFaultState((prev) => ({
            ...prev,
            stage: 'restored',
            message: `Seamless recovery complete! Workload resumed on ${backupDevice.name} from checkpoint with zero model weight loss.`
          }));

          setJobs((prev) =>
            prev.map((j) =>
              j.id === targetJob.id
                ? {
                    ...j,
                    status: 'Running',
                    assignedDeviceId: backupDevice.id,
                    assignedDeviceName: `${backupDevice.name} (Failover Node)`,
                    executionLogs: [
                      ...j.executionLogs,
                      `[${new Date().toLocaleTimeString()}] AUTO-FAILOVER: Workload migrated to ${backupDevice.name}.`,
                      `[${new Date().toLocaleTimeString()}] State restored from Checkpoint Epoch ${j.checkpointEpoch}. Continuing training...`
                    ]
                  }
                : j
            )
          );

          setDevices((prev) =>
            prev.map((d) =>
              d.id === backupDevice.id
                ? { ...d, status: 'busy', activeJobId: targetJob.id, utilizationPct: Math.min(95, d.utilizationPct + 40) }
                : d
            )
          );

          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              timestamp: 'Just now',
              title: 'Fault Recovery Triggered',
              message: `Job ${targetJob.id} automatically recovered from ${failedDevice?.name} to ${backupDevice.name} without data loss.`,
              type: 'warning',
              read: false,
              actionView: 'jobs'
            },
            ...prev
          ]);
        }, 3000);
      }, 2500);
    }, 2000);
  };

  const resetFaultSimulation = () => {
    setFaultState({
      active: false,
      stage: 'idle',
      message: 'System nominal. All distributed nodes operating normally.'
    });
    // Restore devices
    setDevices(INITIAL_DEVICES);
  };

  const adminApproveDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, approvedByAdmin: true, status: 'online', isAvailableForSharing: true } : d))
    );
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Device Approved by Administrator',
        message: 'The submitted workstation has been verified and added to the active campus grid.',
        type: 'success',
        read: false,
        actionView: 'network'
      },
      ...prev
    ]);
  };

  const adminRejectDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        timestamp: 'Just now',
        title: 'Device Application Rejected',
        message: 'The submitted workstation did not pass verification requirements.',
        type: 'error',
        read: false,
        actionView: 'admin'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.DEVICES);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    setDevices(INITIAL_DEVICES);
    setJobs(INITIAL_JOBS);
    setTransactions(INITIAL_TRANSACTIONS);
    setCurrentUser(DEMO_PROFILES.student);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFaultState({
      active: false,
      stage: 'idle',
      message: 'System nominal. All distributed nodes operating normally.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        switchRole,
        devices,
        jobs,
        transactions,
        notifications,
        selectedDeviceModal,
        setSelectedDeviceModal,
        selectedJobModal,
        setSelectedJobModal,
        isAuthModalOpen,
        authModalTab,
        openAuth,
        closeAuth,
        isDemoTourOpen,
        demoTourStep,
        startDemoTour,
        nextDemoTourStep,
        prevDemoTourStep,
        closeDemoTour,
        faultState,
        triggerFaultSimulation,
        resetFaultSimulation,
        submitWorkload,
        registerDevice,
        toggleDeviceSharing,
        cancelJob,
        retryJob,
        claimDailyStipend,
        adminApproveDevice,
        adminRejectDevice,
        markNotificationRead,
        clearAllNotifications,
        resetDemoData,
        loginAsDemoRole,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
