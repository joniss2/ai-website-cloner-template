const features = [
  { label: "Core system — 16 step-by-step tutorials", value: "$497" },
  { label: "7 plug-and-play automation workflows", value: "$997" },
  { label: "3 monetization playbooks", value: "$497" },
  { label: "Proxy, SIM & device provider cheat sheet", value: "$197" },
  { label: "Private operator community access", value: "$297" },
  { label: "Lifetime updates", value: "$364" },
];

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M2 5l2.5 2.5 3.5-4"
          stroke="oklch(0.65 0.19 152)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Card */}
        <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden relative">
          {/* Green glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.19 152 / 10%) 0%, transparent 60%)",
            }}
          />

          <div className="relative p-8 md:p-10">
            {/* Founding pricing badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-full px-3 py-1.5 mb-6">
              Founding pricing
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8">
              Everything you need
            </h2>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-white/65 leading-snug">
                      {feature.label}
                    </span>
                  </div>
                  <span className="text-sm text-white/25 font-mono shrink-0">
                    {feature.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/8 pt-6 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/40">Total value</span>
                <span className="text-sm text-white/40 line-through font-mono">
                  $2,849
                </span>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-white leading-none">
                    $197
                  </div>
                  <div className="text-sm text-white/40 mt-1">
                    Today, one-time
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-base py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 mb-4 w-full"
            >
              Get instant access
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <p className="text-center text-xs text-white/35 mb-6">
              Instant access · One-time payment · No subscriptions · Support
              included
            </p>

            {/* Guarantee */}
            <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🛡️</span>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">
                    14-day guarantee
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Follow the steps — if it genuinely doesn&apos;t work for you,
                    send us your setup and we&apos;ll refund you.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="flex items-center justify-center gap-3 text-xs text-white/25 mb-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-40"
              >
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="10"
                  rx="1.5"
                  stroke="white"
                  strokeWidth="1.2"
                />
                <path d="M1 6h14" stroke="white" strokeWidth="1.2" />
              </svg>
              <span>Secured checkout</span>
              <span className="font-semibold text-white/30">VISA</span>
              <span className="font-semibold text-white/30">PayPal</span>
              <span className="font-semibold text-white/30">AMEX</span>
            </div>

            <p className="text-center text-xs text-white/30">
              1,200+ happy customers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
