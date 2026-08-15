const steps = [
  {
    number: "01",
    title: "Automate the posting engine",
    bullets: [
      "50+ videos auto-generated per week",
      "3 posts/day, fully automated",
      "0 manual uploads, 0 missed days",
    ],
  },
  {
    number: "02",
    title: "Stay off the radar",
    bullets: [
      "IP & device fingerprint rotation built in",
      "Spacing rules that avoid shadowbans",
      "Zero bans across 1,200+ operators",
    ],
  },
  {
    number: "03",
    title: "Scale & monetize",
    bullets: [
      "Scale to 80+ devices, one dashboard",
      "4 monetization channels built in",
      "Real-time tracking on every device",
    ],
  },
];

export function HowItWorksSection() {
  return (
    <section id="system" className="py-24 bg-[#0f0f0f] border-y border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            The complete system
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto">
            Three stages. Everything mapped out, nothing left to guesswork.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-[#111] border border-white/8 rounded-2xl p-8 overflow-hidden"
            >
              {/* Green glow on last step */}
              {i === 2 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 100%, oklch(0.65 0.19 152 / 10%) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* Number */}
              <span className="text-5xl font-black text-white/8 leading-none mb-5 block select-none">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-5">
                {step.title}
              </h3>

              {/* Bullets */}
              <ul className="space-y-3">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M1.5 4l2 2 3-3"
                          stroke="oklch(0.65 0.19 152)"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-white/55 leading-snug">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
