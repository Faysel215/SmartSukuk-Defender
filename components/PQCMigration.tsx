import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, ArrowRight, Server, RefreshCw } from 'lucide-react';
import { SukukAsset, CryptoType } from '../types';

interface PQCMigrationProps {
  assets: SukukAsset[];
  onCompleteMigration: (id: string) => void;
}

const PQCMigration: React.FC<PQCMigrationProps> = ({ assets, onCompleteMigration }) => {
  const vulnerableAssets = assets.filter(a => a.securityLevel === CryptoType.LEGACY_RSA);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleMigration = () => {
    if (!selectedAsset) return;
    setMigrating(true);
    setLogs([]);
    
    const steps = [
      "Initiating Quantum-Resistant Handshake...",
      "Generating Ephemeral Keys (Kyber-1024)...",
      "Verifying Ownership Proof (Milkiyah)...",
      "Re-signing Contract with Dilithium-5...",
      "Invalidating Legacy RSA Keys...",
      "Confirming Block Finality...",
      "Migration Complete. Asset Secured."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          onCompleteMigration(selectedAsset);
          setMigrating(false);
          setSelectedAsset(null);
          setProgress(0);
        }, 1000);
      } else {
        setLogs(prev => [...prev, steps[currentStep]]);
        setProgress(((currentStep + 1) / steps.length) * 100);
        currentStep++;
      }
    }, 800);
  };

  if (vulnerableAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-slate-800 rounded-xl border border-emerald-500/20">
        <div className="w-24 h-24 bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={48} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-serif-header text-white mb-2">System Secure</h2>
        <p className="text-slate-400 max-w-md">
          All assets in your wallet are protected by Post-Quantum Cryptography (PQC). No immediate threats detected from Shor's algorithm.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Selection Panel */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif-header font-bold text-white mb-2">Security Upgrade Center</h2>
          <p className="text-slate-400 text-sm">Select vulnerable legacy assets to upgrade to Lattice-based cryptography.</p>
        </div>

        <div className="space-y-3">
          {vulnerableAssets.map(asset => (
            <div 
              key={asset.id}
              onClick={() => !migrating && setSelectedAsset(asset.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedAsset === asset.id ? 'border-emerald-500 bg-emerald-900/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white">{asset.name}</h4>
                  <span className="text-xs text-amber-500 font-mono">Current: {asset.securityLevel}</span>
                </div>
                {selectedAsset === asset.id && <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleMigration}
          disabled={!selectedAsset || migrating}
          className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
            !selectedAsset || migrating 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-emerald-900/20'
          }`}
        >
          {migrating ? <RefreshCw className="animate-spin" /> : <Lock />}
          {migrating ? 'Securing Asset...' : 'Execute PQC Migration'}
        </button>
      </div>

      {/* Visualization Panel */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Abstract Lattice Background */}
            <svg width="100%" height="100%">
                <pattern id="lattice" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#10b981" />
                    <line x1="2" y1="2" x2="42" y2="42" stroke="#10b981" strokeWidth="0.5" />
                    <line x1="42" y1="2" x2="2" y2="42" stroke="#10b981" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#lattice)" />
            </svg>
        </div>

        <h3 className="text-slate-300 font-mono text-sm mb-4 uppercase tracking-widest border-b border-slate-700 pb-2">
          Migration Terminal
        </h3>

        <div className="flex-1 font-mono text-xs space-y-2 overflow-y-auto max-h-[400px]">
          {!migrating && logs.length === 0 && (
            <div className="text-slate-500 flex flex-col items-center justify-center h-full opacity-50">
              <Server size={48} className="mb-4" />
              <p>Ready to secure assets against "Harvest Now, Decrypt Later" vectors.</p>
            </div>
          )}
          
          {logs.map((log, idx) => (
             <div key={idx} className="flex items-start gap-2 text-emerald-400 animate-fade-in">
               <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
               <span>{log}</span>
             </div>
          ))}
          {migrating && (
             <div className="h-1 w-full bg-slate-700 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
           <div className="flex justify-between text-xs text-slate-400">
              <span>Algorithm: Crystals-Dilithium</span>
              <span>NIST Level: 5 (AES-256 equivalent)</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PQCMigration;