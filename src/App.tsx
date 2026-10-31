import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DashboardLayout } from './components/DashboardLayout';
import { LandingView } from './components/views/LandingView';
import { OverviewDashboardView } from './components/views/OverviewDashboardView';
import { ComputeNetworkView } from './components/views/ComputeNetworkView';
import { ResourceExplorerView } from './components/views/ResourceExplorerView';
import { SubmitWorkloadView } from './components/views/SubmitWorkloadView';
import { MyJobsView } from './components/views/MyJobsView';
import { ResourceContributionView } from './components/views/ResourceContributionView';
import { ComputeCreditsView } from './components/views/ComputeCreditsView';
import { FaultRecoveryView } from './components/views/FaultRecoveryView';
import { SecurityPrivacyView } from './components/views/SecurityPrivacyView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { SettingsView } from './components/views/SettingsView';
import { DeviceDetailsModal } from './components/modals/DeviceDetailsModal';
import { JobDetailsModal } from './components/modals/JobDetailsModal';
import { AuthModal } from './components/modals/AuthModal';
import { DemoGuideModal } from './components/modals/DemoGuideModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView />;
      case 'dashboard':
        return <OverviewDashboardView />;
      case 'network':
        return <ComputeNetworkView />;
      case 'explorer':
        return <ResourceExplorerView />;
      case 'submit':
        return <SubmitWorkloadView />;
      case 'jobs':
        return <MyJobsView />;
      case 'contribute':
        return <ResourceContributionView />;
      case 'credits':
        return <ComputeCreditsView />;
      case 'fault_recovery':
        return <FaultRecoveryView />;
      case 'security':
        return <SecurityPrivacyView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewDashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-[#20332D]">
      {currentView === 'landing' ? (
        <div>
          <Navbar />
          <main>
            {renderActiveView()}
          </main>
        </div>
      ) : (
        <DashboardLayout>
          {renderActiveView()}
        </DashboardLayout>
      )}

      {/* Global Interactive Modals */}
      <DeviceDetailsModal />
      <JobDetailsModal />
      <AuthModal />
      <DemoGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
