import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldCheck, ShieldAlert, TrendingUp, Lock } from 'lucide-react';
import { SukukAsset, CryptoType } from '../types';

interface DashboardProps {
  assets: SukukAsset[];
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b']; // Green (PQC), Red (Legacy), Amber (Mixed)

const Dashboard: React.FC<DashboardProps> = ({ assets }) => {
  // Mock data for the chart
  const data = [
    { name: 'Jan', value: 40000, secure: 30000 },
    { name: 'Feb', value: 45000, secure: 35000 },
    { name: 'Mar', value: 42000, secure: 38000 },
    { name: 'Apr', value: 48000, secure: 48000 }, // Fully secured in April simulation
    { name: 'May', value: 55000, secure: 55000 },
    { name: 'Jun', value: 60000, secure: 60000 },
  ];

  const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0);
  const secureAssets = assets.filter(a => a.securityLevel !== CryptoType.LEGACY_RSA);
  const secureValue = secureAssets.reduce((acc, curr) => acc + curr.value, 0);
  const securityPercentage = Math.round((secureValue / totalValue) * 100) || 0;

  const pieData = [
    { name: 'Quantum Safe', value: secureValue },
    { name: 'Vulnerable', value: totalValue - secureValue },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Portfolio Card */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} className="text-emerald-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Portfolio Value</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</span>
            <span className="text-sm text-emerald-400 font-medium">+12.5%</span>
          </div>
          <div className="mt-4 text-xs text-slate-500">Updated: Real-time via Oracle</div>
        </div>

        {/* Security Score Card */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={64} className={securityPercentage === 100 ? "text-emerald-400" : "text-amber-400"} />
          </div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Quantum Immunity</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${securityPercentage === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {securityPercentage}%
            </span>
          </div>
          <div className="mt-4 text-xs text-slate-500 flex items-center gap-1">
             {securityPercentage < 100 ? (
               <span className="text-amber-400 flex items-center gap-1"><ShieldAlert size={12}/> Migration Recommended</span>
             ) : (
               <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck size={12}/> Fully Secured</span>
             )}
          </div>
        </div>

        {/* Threat Level Card */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lock size={64} className="text-purple-400" />
          </div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Harvest Threats</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-white">Blocked</span>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            0 Vulnerable Transactions detected.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Portfolio Growth vs. Security</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSecure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" name="Total Value" />
                <Area type="monotone" dataKey="secure" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSecure)" name="PQC Secured Value" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Pie */}
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-white font-semibold mb-4 w-full text-left">PQC Adoption Ratio</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-300">Quantum Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-300">Vulnerable (Legacy)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;