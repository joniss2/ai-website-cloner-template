import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.19 152 / 12%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-live-pulse" />
              <span className="text-xs font-medium text-white/70">
                1,200+ operators already inside
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-6">
              Copy-Paste The Exact AI Phone Farm I Use To Pull{" "}
              <span className="text-primary">750M Views/Month</span> On
              Autopilot
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-xl">
              The exact device setup, warm-up sequences, and automations used to
              run 1,000+ accounts from a single dashboard.
            </p>

            {/* CTA */}
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 mb-5"
            >
              Get instant access
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-80"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 1.5L8.75 5.25H12.5L9.5 7.5L10.5 11.5L7 9.25L3.5 11.5L4.5 7.5L1.5 5.25H5.25L7 1.5Z"
                    fill="currentColor"
                  />
                </svg>
                14-day guarantee
              </span>
              <span className="w-px h-3 bg-white/15" />
              <span>Instant access</span>
              <span className="w-px h-3 bg-white/15" />
              <span>iPhone &amp; Android</span>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-xl lg:max-w-none">
            <div className="relative w-full max-w-[480px]">
              <div
                className="absolute inset-0 rounded-2xl blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.65 0.19 152 / 18%) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <Image
                src="https://www.profitphones.com/phone-farm-home.png"
                alt="Phone farm dashboard"
                width={480}
                height={400}
                className="relative w-full h-auto rounded-2xl"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
