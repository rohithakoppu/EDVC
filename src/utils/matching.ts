import { Device, MatchScoreResult } from '../types';

export interface MatchingRequirements {
  requiredVramGb: number;
  requiredRamGb: number;
  requiredCores: number;
  estimatedHours: number;
  priority?: 'Normal' | 'High' | 'Priority';
}

export function matchDevicesForWorkload(
  devices: Device[],
  reqs: MatchingRequirements
): MatchScoreResult[] {
  return devices.map((device) => {
    const reasons: string[] = [];
    let isEligible = true;
    let score = 100;

    // Check availability & admin approval
    if (!device.approvedByAdmin) {
      isEligible = false;
      score = 0;
      reasons.push('Device is currently pending campus administrator verification.');
      return { device, score: 0, rating: 'Not Suitable' as const, reasons, isEligible };
    }

    if (!device.isAvailableForSharing) {
      isEligible = false;
      score = 0;
      reasons.push('Contributor has currently paused compute sharing for this node.');
      return { device, score: 0, rating: 'Not Suitable' as const, reasons, isEligible };
    }

    if (device.status === 'fault') {
      isEligible = false;
      score = 0;
      reasons.push('Hardware telemetry detected a fault or network disconnection.');
      return { device, score: 0, rating: 'Not Suitable' as const, reasons, isEligible };
    }

    // VRAM Check
    if (device.gpuVramGb < reqs.requiredVramGb) {
      isEligible = false;
      score -= 50;
      reasons.push(
        `Insufficient GPU VRAM: has ${device.gpuVramGb} GB, while your workload requires ${reqs.requiredVramGb} GB.`
      );
    } else {
      const vramDelta = device.gpuVramGb - reqs.requiredVramGb;
      if (vramDelta >= 0 && vramDelta <= 16) {
        score += 15; // Optimal right-sizing
        reasons.push(`Optimal GPU fit: ${device.gpuVramGb} GB VRAM provides ample buffer without oversized allocation.`);
      } else {
        // Very large GPU for small job, slightly penalize efficiency unless high priority
        if (reqs.requiredVramGb <= 8 && device.gpuVramGb >= 48) {
          score -= 10;
          reasons.push(`High capacity ${device.gpuVramGb} GB card is reserved primarily for heavy transformer training.`);
        } else {
          reasons.push(`Meets GPU requirement: ${device.gpuVramGb} GB VRAM available.`);
        }
      }
    }

    // RAM Check
    if (device.ramAvailableGb < reqs.requiredRamGb) {
      isEligible = false;
      score -= 30;
      reasons.push(
        `Insufficient available system RAM: only ${device.ramAvailableGb} GB free (needs ${reqs.requiredRamGb} GB).`
      );
    } else {
      reasons.push(`Adequate host memory: ${device.ramAvailableGb} GB free RAM.`);
    }

    // CPU Cores Check
    if (device.cpuCores < reqs.requiredCores) {
      isEligible = false;
      score -= 20;
      reasons.push(`CPU core count (${device.cpuCores}) is below requested parallelism (${reqs.requiredCores} cores).`);
    }

    // Utilization penalty if busy
    if (device.status === 'busy') {
      score -= 35;
      reasons.push(`Device is currently executing another active job (${device.utilizationPct}% utilization).`);
    } else {
      score += 10;
      reasons.push(`Idle and immediately ready to accept incoming workload.`);
    }

    // Uptime & Bandwidth bonuses
    if (device.uptimePct >= 98) {
      score += 5;
    }
    if (device.networkBandwidthMbps >= 1000) {
      score += 5;
      reasons.push(`High-speed campus fiber link (${(device.networkBandwidthMbps / 1000).toFixed(1)} Gbps) ensures rapid dataset staging.`);
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    let rating: 'Excellent Match' | 'Good Match' | 'Not Suitable' = 'Not Suitable';
    if (isEligible && score >= 75) {
      rating = 'Excellent Match';
    } else if (isEligible && score >= 50) {
      rating = 'Good Match';
    } else {
      rating = 'Not Suitable';
    }

    return {
      device,
      score,
      rating,
      reasons,
      isEligible
    };
  }).sort((a, b) => b.score - a.score);
}
