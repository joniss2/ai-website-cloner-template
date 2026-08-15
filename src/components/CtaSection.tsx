export function CtaSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Green radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, oklch(0.65 0.19 152 / 14%) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-8">
          Let&apos;s make you{" "}
          <span className="text-primary">1B+ views.</span>
        </h2>

        <a
          href="#pricing"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-lg px-8 py-4 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
        >
          Get instant access
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9h10M10 5l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
