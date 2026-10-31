import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  PlusCircle,
  Info
} from 'lucide-react';
import { TransactionType } from '../../types';

export const ComputeCreditsView: React.FC = () => {
  const { currentUser, transactions, claimDailyStipend } = useApp();
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');

  const earnedTotal = transactions
    .filter((t) => t.type === 'earned' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0);

  const spentTotal = Math.abs(
    transactions
      .filter((t) => t.type === 'spent')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const filteredTx = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#20332D]">
            Compute Credits & Academic Economy
          </h2>
          <p className="text-xs text-[#65756F] mt-0.5">
            Internal reciprocal credit ledger for scheduling workloads, sharing hardware, and academic research grants.
          </p>
        </div>

        <button
          onClick={claimDailyStipend}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#18845B] hover:bg-[#146e4b] rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Gift className="w-4 h-4 text-[#B8F0D2]" />
          <span>Claim Daily Stipend (+25 cr)</span>
        </button>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">CURRENT BALANCE</span>
            <Coins className="w-5 h-5 text-[#FFAD70]" />
          </div>
          <div className="font-heading font-bold text-3xl sm:text-4xl text-[#18845B] tabular-nums">
            {currentUser.creditsBalance}
          </div>
          <span className="text-xs text-[#65756F] block">
            Equivalent to ~{(currentUser.creditsBalance / 10).toFixed(1)} hrs RTX 4090 compute
          </span>
        </div>

        <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">TOTAL CREDITS EARNED</span>
            <ArrowUpRight className="w-5 h-5 text-[#18845B]" />
          </div>
          <div className="font-heading font-bold text-3xl sm:text-4xl text-[#20332D] tabular-nums">
            +{earnedTotal}
          </div>
          <span className="text-xs text-[#18845B] block font-medium">
            From device contributions & campus research grant
          </span>
        </div>

        <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#65756F]">
            <span className="text-xs font-mono uppercase">TOTAL CREDITS SPENT</span>
            <ArrowDownRight className="w-5 h-5 text-[#FF8E8E]" />
          </div>
          <div className="font-heading font-bold text-3xl sm:text-4xl text-[#20332D] tabular-nums">
            {spentTotal}
          </div>
          <span className="text-xs text-[#65756F] block">
            Used across {currentUser.jobsSubmittedCount} AI training runs
          </span>
        </div>
      </div>

      {/* Earn vs Spend Ratio Bar */}
      <div className="p-6 bg-white border border-[#E6ECE7] rounded-3xl shadow-xs space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-heading font-semibold text-sm text-[#20332D]">
            Reciprocal Campus Economy Ratio
          </span>
          <span className="font-mono text-[#65756F]">
            Earned: {earnedTotal} cr / Spent: {spentTotal} cr
          </span>
        </div>

        <div className="w-full bg-[#FAFBF7] h-3 rounded-full overflow-hidden border border-[#E6ECE7] flex">
          <div
            className="bg-[#18845B] h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (earnedTotal / ((earnedTotal + spentTotal) || 1)) * 100)}%` }}
            title="Credits Earned"
          />
          <div
            className="bg-[#FFAD70] h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (spentTotal / ((earnedTotal + spentTotal) || 1)) * 100)}%` }}
            title="Credits Spent"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#65756F]">
          <span className="flex items-center gap-1.5 text-[#18845B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18845B]" />
            Earned via Sharing Idle Hardware ({Math.round((earnedTotal / ((earnedTotal + spentTotal) || 1)) * 100)}%)
          </span>
          <span className="flex items-center gap-1.5 text-[#FFAD70]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFAD70]" />
            Spent on Model Training ({Math.round((spentTotal / ((earnedTotal + spentTotal) || 1)) * 100)}%)
          </span>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="bg-white border border-[#E6ECE7] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6ECE7]">
          <div>
            <h3 className="font-heading font-bold text-base text-[#20332D]">
              Credits Transaction Ledger
            </h3>
            <p className="text-xs text-[#65756F]">Auditable record of all credit flows</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] text-[#65756F] mr-1">Filter:</span>
            {(['all', 'earned', 'spent', 'bonus', 'refund'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize cursor-pointer transition-colors ${
                  filterType === type
                    ? 'bg-[#18845B] text-white shadow-xs'
                    : 'bg-[#FAFBF7] text-[#65756F] border border-[#E6ECE7] hover:text-[#20332D]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#E6ECE7]">
          {filteredTx.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  tx.type === 'earned' ? 'bg-[#B8F0D2] text-[#18845B]' :
                  tx.type === 'bonus' ? 'bg-[#65BDEB]/20 text-[#4267D5]' :
                  tx.type === 'refund' ? 'bg-[#FFE49A]/30 text-[#9A6200]' :
                  'bg-[#FF8E8E]/20 text-[#D93838]'
                }`}>
                  {tx.type === 'earned' && <ArrowUpRight className="w-4 h-4" />}
                  {tx.type === 'spent' && <ArrowDownRight className="w-4 h-4" />}
                  {tx.type === 'bonus' && <Gift className="w-4 h-4" />}
                  {tx.type === 'refund' && <Sparkles className="w-4 h-4" />}
                </div>

                <div>
                  <span className="font-medium text-[#20332D] block">{tx.description}</span>
                  <span className="text-[10px] font-mono text-[#65756F]">
                    {tx.id} · {tx.timestamp}
                  </span>
                </div>
              </div>

              <div className="font-mono font-bold text-sm text-right shrink-0">
                <span className={tx.amount > 0 ? 'text-[#18845B]' : 'text-[#D93838]'}>
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount} cr
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Disclaimer */}
      <div className="p-4 rounded-2xl bg-[#FAFBF7] border border-[#E6ECE7] text-xs text-[#65756F] flex items-center gap-2">
        <Info className="w-4 h-4 text-[#18845B] shrink-0" />
        <span>
          Compute Credits are internal academic tokens designed for resource governance and fair priority queuing. They carry no monetary or cash value.
        </span>
      </div>
    </div>
  );
};
