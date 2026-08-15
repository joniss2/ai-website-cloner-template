const automations = [
  "Device provisioning & setup scripts",
  "Proxy & IP rotation",
  "Account warm-up sequences",
  "Content scheduler & auto-poster",
  "Cross-platform posting (TikTok, IG, YouTube)",
  "Analytics & performance dashboard",
  "Client / rental fleet management",
];

const tutorials = [
  "Sourcing & provisioning devices",
  "Setting up SIMs & proxies",
  "Installing the automation stack",
  "Account creation & warm-up",
  "Sourcing content at scale",
  "Building your posting calendar",
  "Automated posting & scheduling",
  "Avoiding shadowbans & flags",
  "Scaling from 10 to 100+ devices",
  "Renting your farm out to clients",
  "Monetization: funds, affiliate, UGC, brand deals",
  "Tracking performance & payouts",
];

function CheckIcon() {
  return (
    <span className="mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full bg-primary/15 flex items-center justify-center">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path
          d="M1.5 4.5l2.5 2.5 3.5-4"
          stroke="oklch(0.65 0.19 152)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DashboardMockup() {
  return (
    <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl overflow-hidden text-xs font-mono">
      {/* Fleet dashboard */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white">
            Fleet dashboard
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Accounts running", value: "84 / 84" },
            { label: "Posts today", value: "212" },
            { label: "Content buffer", value: "18 days" },
            { label: "Flagged accounts", value: "0" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111] border border-white/6 rounded-lg p-3"
            >
              <p className="text-white/35 text-[10px] mb-1">{item.label}</p>
              <p
                className={`font-semibold ${item.label === "Flagged accounts" ? "text-primary" : "text-white"}`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Mini chart placeholder */}
        <div className="mt-3">
          <p className="text-[10px] text-white/25 mb-2">
            Posts per hour, last 10h
          </p>
          <div className="flex items-end gap-1 h-10">
            {[4, 6, 8, 7, 9, 11, 10, 12, 9, 13].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/25"
                style={{ height: `${(h / 13) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Automation queue */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-white">
            Automation queue
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-live-pulse" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Jobs queued", value: "6" },
            { label: "Running now", value: "12" },
            { label: "Avg. wait time", value: "4s" },
            { label: "Failed today", value: "0" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111] border border-white/6 rounded-lg p-3"
            >
              <p className="text-white/35 text-[10px] mb-1">{item.label}</p>
              <p
                className={`font-semibold ${item.label === "Failed today" ? "text-primary" : "text-white"}`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Mini chart placeholder */}
        <div className="mt-3">
          <p className="text-[10px] text-white/25 mb-2">
            Jobs completed per hour, last 10h
          </p>
          <div className="flex items-end gap-1 h-10">
            {[5, 8, 7, 9, 11, 10, 13, 12, 14, 15].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/20"
                style={{ height: `${(h / 15) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatInsideSection() {
  return (
    <section id="curriculum" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            What&apos;s inside
          </p>
        </div>

        {/* Automations block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
          {/* Dashboard mockup */}
          <DashboardMockup />

          {/* Feature list */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-8">
              7 plug-and-play automations
            </h2>
            <ul className="space-y-3.5">
              {automations.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-white/65 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tutorials block */}
        <div className="bg-[#111] border border-white/8 rounded-2xl p-8 md:p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            16 step-by-step tutorials
          </h2>
          <p className="text-white/45 text-sm mb-8 max-w-lg">
            Years of trial, error, and banned accounts compressed into a few
            focused hours.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tutorials.map((item, i) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 text-[11px] font-bold text-primary/60 w-5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/55 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
