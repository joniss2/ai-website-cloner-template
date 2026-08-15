const problems = [
  {
    title: "Doing it all manually",
    description:
      "Every post, every caption, every account — by hand. You're the bottleneck, and there's only one of you.",
  },
  {
    title: "Renting your growth",
    description:
      "€1,000+/month keeps the lights on for them, not you. The moment you stop paying, you're back to zero.",
  },
  {
    title: "Stuck on one phone",
    description:
      "Most operators never get past a single device — no system to manage more, so growth stalls right where it started.",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle red glow for "the old way" */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.45 0.2 25 / 6%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            The old way
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl">
            You&apos;ve tried the &ldquo;normal&rdquo; way. It doesn&apos;t scale.
          </h2>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="relative bg-[#111111] border border-white/8 rounded-2xl p-7 overflow-hidden group"
            >
              {/* Red accent line at top */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              <div className="flex items-start gap-3 mb-4">
                {/* X icon */}
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 2l6 6M8 2l-6 6"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {problem.title}
                </h3>
              </div>
              <p className="text-sm text-white/45 leading-relaxed pl-8">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
