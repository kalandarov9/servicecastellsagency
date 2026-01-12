
import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { fetchBoardTasks } from '../services/mondayService';
import { CheckCircle2, Circle, Clock, Calendar, DollarSign, Wallet, Server } from 'lucide-react';

interface ProgressViewProps {
  boardId?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = 'bg-[#F3F3F1] text-gray-600 border border-gray-200';
  let Icon = Circle;

  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes('done') || normalizedStatus.includes('готово')) {
    colorClass = 'bg-[#111111] text-white border border-[#111111]';
    Icon = CheckCircle2;
  } else if (normalizedStatus.includes('working') || normalizedStatus.includes('в работе') || normalizedStatus.includes('review')) {
    colorClass = 'bg-white text-[#111111] border border-[#111111]';
    Icon = Clock;
  }

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${colorClass}`}>
      <Icon size={10} />
      {status}
    </span>
  );
};

const PaymentBadge = ({ amount, status }: { amount: number, status: 'Paid' | 'Pending' }) => {
    const isPaid = status === 'Paid';
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    return (
        <div className="flex flex-col items-end">
            <span className={`text-base font-serif font-bold ${isPaid ? 'text-[#111111]' : 'text-gray-400'}`}>
                {formatter.format(amount)}
            </span>
            <span className={`text-[9px] uppercase tracking-widest flex items-center gap-1 ${isPaid ? 'text-[#10B981]' : 'text-gray-400'}`}>
                {isPaid ? <CheckCircle2 size={10} /> : <Circle size={10} />}
                {status}
            </span>
        </div>
    );
};

export const ProgressView: React.FC<ProgressViewProps> = ({ boardId = '123456' }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchBoardTasks(boardId);
      setTasks(data);
      setLoading(false);
    };
    loadData();
  }, [boardId]);

  // Financial Calculations
  const totalBudget = tasks.reduce((sum, task) => sum + (task.payment?.amount || 0), 0);
  const paidAmount = tasks.reduce((sum, task) => sum + (task.payment?.status === 'Paid' ? task.payment.amount : 0), 0);
  const remainingAmount = totalBudget - paidAmount;
  
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Financial Overview & Deployment Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 border border-[#E5E5E0] flex flex-col justify-between h-32 rounded-xl">
            <div className="flex items-center gap-2 text-gray-400">
                <Wallet size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Total Budget</span>
            </div>
            <span className="text-3xl font-serif font-bold text-[#111111]">{formatter.format(totalBudget)}</span>
        </div>
        <div className="bg-[#111111] p-6 border border-[#111111] flex flex-col justify-between h-32 text-white rounded-xl">
            <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Total Paid</span>
            </div>
            <span className="text-3xl font-serif font-bold text-white">{formatter.format(paidAmount)}</span>
        </div>
        <div className="bg-white p-6 border border-[#E5E5E0] flex flex-col justify-between h-32 rounded-xl">
            <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Remaining</span>
            </div>
            <span className="text-3xl font-serif font-bold text-gray-400">{formatter.format(remainingAmount)}</span>
        </div>
        <div className="bg-emerald-50 p-6 border border-emerald-100 flex flex-col justify-between h-32 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-600/60">
                <Server size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Deployment</span>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-emerald-700">Vercel Ready</span>
                <span className="text-[9px] text-emerald-600 uppercase tracking-widest font-bold">CI/CD Active</span>
            </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E0] shadow-sm rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-8 border-b border-[#E5E5E0] bg-[#FAFAFA]">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-[#111111] font-serif">Roadmap & Payments</h2>
                <div className="text-xs font-mono text-gray-400 px-2 py-1 border border-[#E5E5E0] bg-white rounded-md">
                    PROJECT ID: {boardId}
                </div>
            </div>
            <p className="text-gray-500 font-light text-sm">Track development phases and milestone payments.</p>
        </div>

        {/* Task List */}
        <div className="px-8 py-4">
          {loading ? (
            <div className="space-y-4 py-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-[#F3F3F1] animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-[#E5E5E0]">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 hover:bg-[#FAFAFA] transition-colors -mx-4 px-4 rounded-lg"
                >
                  {/* Left: Task Info */}
                  <div className="flex items-start gap-5 mb-4 sm:mb-0 flex-1">
                     <div className="w-6 text-xs font-mono text-gray-300 pt-1.5">
                         {task.id.padStart(2, '0')}
                     </div>
                     <div>
                         <h3 className="font-medium text-[#111111] text-base mb-1.5 font-serif">{task.name}</h3>
                         <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                            <span className="flex items-center gap-1">
                                <Calendar size={10} />
                                {task.date}
                            </span>
                         </div>
                     </div>
                  </div>
                  
                  {/* Right: Status & Payment */}
                  <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                      {task.payment && (
                          <div className="text-right">
                              <PaymentBadge amount={task.payment.amount} status={task.payment.status} />
                          </div>
                      )}
                      <div className="w-px h-8 bg-[#E5E5E0] hidden sm:block"></div>
                      <StatusBadge status={task.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-4 border-t border-[#E5E5E0] bg-[#FAFAFA] text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Automated Deployment via Vercel Edge Network
            </p>
        </div>

      </div>
    </div>
  );
};
