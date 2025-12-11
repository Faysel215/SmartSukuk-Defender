import React from 'react';
import { Shield, ShieldAlert, FileText, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { SukukAsset, CryptoType, SukukType } from '../types';

interface WalletProps {
  assets: SukukAsset[];
  onMigrate: (id: string) => void;
}

const Wallet: React.FC<WalletProps> = ({ assets, onMigrate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif-header font-bold text-white">Digital Sukuk Vault</h2>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <ArrowDownLeft size={18} /> Receive Asset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assets.map((asset) => (
          <div 
            key={asset.id} 
            className={`p-6 rounded-xl border ${asset.securityLevel === CryptoType.LEGACY_RSA ? 'border-amber-500/50 bg-amber-950/10' : 'border-emerald-500/30 bg-slate-800'} transition-all hover:shadow-lg`}
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${asset.securityLevel === CryptoType.LEGACY_RSA ? 'bg-amber-900/30 text-amber-500' : 'bg-emerald-900/30 text-emerald-400'}`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{asset.name}</h3>
                  <p className="text-sm text-slate-400">{asset.type}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
                      ID: {asset.id.substring(0, 8)}...
                    </span>
                    <span className="text-xs text-slate-500">| Maturity: {asset.maturityDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2">
                <span className="text-2xl font-bold text-white">${asset.value.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                   {asset.securityLevel === CryptoType.LEGACY_RSA ? (
                     <>
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          <ShieldAlert size={12} /> {asset.securityLevel}
                        </span>
                        <button 
                          onClick={() => onMigrate(asset.id)}
                          className="text-xs bg-amber-600 hover:bg-amber-500 text-white px-2 py-1 rounded transition-colors"
                        >
                          Upgrade Security
                        </button>
                     </>
                   ) : (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Shield size={12} /> {asset.securityLevel}
                      </span>
                   )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap gap-4">
               <div className="text-xs text-slate-400">
                 <span className="block text-slate-500 uppercase text-[10px] tracking-wider mb-1">Ownership Proof (Milkiyah) Hash</span>
                 <span className="font-mono break-all">{asset.ownershipProof}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;