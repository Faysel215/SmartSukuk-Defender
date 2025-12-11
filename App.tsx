import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import PQCMigration from './components/PQCMigration';
import AIAdvisor from './components/AIAdvisor';
import { View, SukukAsset, CryptoType, SukukType } from './types';

// Mock Initial Data
const INITIAL_ASSETS: SukukAsset[] = [
  {
    id: 'SK-2024-001',
    name: 'Green Energy Sukuk I',
    type: SukukType.IJARAH,
    value: 50000,
    securityLevel: CryptoType.LEGACY_RSA,
    issueDate: '2023-01-15',
    maturityDate: '2028-01-15',
    ownershipProof: 'rsa_sig_8f7a9d2...' // Shortened
  },
  {
    id: 'SK-2024-002',
    name: 'Infrastructure Dev Sukuk',
    type: SukukType.MUDARABAH,
    value: 75000,
    securityLevel: CryptoType.PQC_KYBER,
    issueDate: '2024-03-10',
    maturityDate: '2029-03-10',
    ownershipProof: 'pqc_dilithium_5x9...' // Shortened
  },
  {
    id: 'SK-2024-003',
    name: 'Tech Ventures Sukuk',
    type: SukukType.MURABAHAH,
    value: 25000,
    securityLevel: CryptoType.LEGACY_RSA,
    issueDate: '2022-11-05',
    maturityDate: '2025-11-05',
    ownershipProof: 'rsa_sig_3b2c1a0...'
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [assets, setAssets] = useState<SukukAsset[]>(INITIAL_ASSETS);

  const handleMigration = (id: string) => {
    // Navigate to migration view with context if needed, 
    // for simplicity, just switch view and user picks from list
    setCurrentView(View.MIGRATION);
  };

  const completeMigration = (id: string) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id === id) {
        return {
          ...asset,
          securityLevel: CryptoType.PQC_DILITHIUM,
          ownershipProof: `pqc_dilithium_${Math.random().toString(36).substring(7)}` // Simulate new signature
        };
      }
      return asset;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard assets={assets} />;
      case View.WALLET:
        return <Wallet assets={assets} onMigrate={handleMigration} />;
      case View.MIGRATION:
        return <PQCMigration assets={assets} onCompleteMigration={completeMigration} />;
      case View.ADVISOR:
        return <AIAdvisor />;
      default:
        return <Dashboard assets={assets} />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;