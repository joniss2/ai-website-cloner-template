const stats = [
  { value: "25B+", label: "Total views generated" },
  { value: "1,200+", label: "Operators trained" },
  { value: "1 weekend", label: "Avg. setup time" },
];

export function StatsSection() {
  return (
    <section className="border-y border-white/8 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center py-8 sm:py-0 sm:px-10 first:pt-0 last:pb-0 sm:first:pl-0 sm:last:pr-0"
            >
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-white/45 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
