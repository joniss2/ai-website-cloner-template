export function ComparisonSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] border-y border-white/8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            Why operators switch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl mx-auto">
            Stop struggling for views. Build the machine that gets them.
          </h2>
        </div>

        {/* Comparison cards */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-2xl mx-auto">
          {/* Left — old way */}
          <div className="flex-1 bg-[#111] border border-white/8 rounded-2xl p-8 flex flex-col gap-4">
            <div className="text-3xl font-black text-white/20 leading-none">
              1 account
            </div>
            <div className="text-sm text-white/40">Doing it alone</div>
            <div className="mt-auto">
              <div className="text-4xl font-black text-white/35 leading-none">
                10M
              </div>
              <div className="text-sm text-white/30 mt-1">views</div>
            </div>
          </div>

          {/* VS divider */}
          <div className="flex sm:flex-col items-center justify-center gap-3 py-2 sm:py-0">
            <div className="flex-1 h-px sm:h-auto sm:w-px bg-white/8" />
            <span className="text-xs font-bold text-white/20 uppercase tracking-widest">
              VS
            </span>
            <div className="flex-1 h-px sm:h-auto sm:w-px bg-white/8" />
          </div>

          {/* Right — Profit Phones */}
          <div className="flex-1 bg-[#111] border border-primary/25 rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden">
            {/* Green glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 120%, oklch(0.65 0.19 152 / 12%) 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              <div className="text-3xl font-black text-primary leading-none">
                $197
              </div>
              <div className="text-sm text-white/55 mt-1">Profit Phones</div>
            </div>

            <div className="relative mt-auto">
              <div className="text-4xl font-black text-white leading-none">
                750M+
              </div>
              <div className="text-sm text-white/45 mt-1">views</div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-white/35 text-sm mt-10">
          One system.{" "}
          <span className="text-primary font-semibold">
            750M+ views generated.
          </span>
        </p>
      </div>
    </section>
  );
}
