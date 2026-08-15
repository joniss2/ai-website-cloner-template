"use client";

import { useState } from "react";

const incomeStreams = [
  "Creator funds",
  "Affiliate & UGC",
  "Clipping",
  "App promo",
  "TikTok Shop",
  "Ecom / products",
  "Client rentals",
  "Brand deals",
  "OFM",
];

function formatRange(accounts: number): string {
  const low = accounts * 2000;
  const high = accounts * 10000;
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : `$${(n / 1000).toFixed(0)}K`;
  return `${fmt(low)}–${fmt(high)}`;
}

export function CalculatorSection() {
  const [accounts, setAccounts] = useState(50);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            What operators build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl mb-4">
            How operators actually get paid — from your first account to a full
            fleet
          </h2>
          <p className="text-white/45 text-base max-w-2xl">
            You don&apos;t need a huge fleet to make money. Run a single account on
            the side, or stack every stream below across a full farm — the
            system is the same either way.
          </p>
        </div>

        <div className="bg-[#111] border border-white/8 rounded-2xl p-8 md:p-10">
          {/* Slider */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-white/60 mb-4">
              How many accounts do you want to run?
            </label>
            <div className="relative">
              <input
                type="range"
                min={1}
                max={100}
                value={accounts}
                onChange={(e) => setAccounts(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/25 mt-2">
                <span>10</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-[#0a0a0a] border border-white/8 rounded-xl p-6 md:p-8 mb-8">
            <p className="text-xs text-white/35 font-medium mb-2">
              {accounts} account{accounts !== 1 ? "s" : ""} · estimated monthly
              income
            </p>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
              {formatRange(accounts)}
            </div>
            <p className="text-xs text-white/30 leading-relaxed max-w-md">
              Based on $2,000–$10,000/mo per active account from creator funds,
              affiliate &amp; UGC, and clipping — combined.
            </p>
          </div>

          {/* Income streams */}
          <div>
            <p className="text-xs font-medium text-white/35 mb-4">
              What makes up your income
            </p>
            <div className="flex flex-wrap gap-2">
              {incomeStreams.map((stream) => (
                <span
                  key={stream}
                  className="inline-flex items-center text-xs font-medium text-white/55 bg-white/5 border border-white/8 rounded-full px-3 py-1.5"
                >
                  {stream}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white/20 mt-6 leading-relaxed">
            Illustrative estimate based on course strategies — individual setups
            and results vary. Not a guarantee of income.
          </p>
        </div>
      </div>
    </section>
  );
}
