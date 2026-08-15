import Image from "next/image";

const testimonials = [
  {
    username: "joshmoreau",
    time: "18:42",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      "wsg — started running my first 8 phones this week",
      "already have 3 accounts past 10k, no cap",
    ],
  },
  {
    username: "pipelineghost",
    time: "09:12",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    messages: [
      "the warm-up sequence alone saved me from getting banned twice",
      "farm's been stable for 6 weeks straight",
    ],
  },
  {
    username: "rs11",
    time: "14:14",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    messages: [
      "yea safe to say i couldn't have scaled to 40 phones without this",
      "rental clients pay for themselves in a week",
    ],
  },
];

function DiscordMessage({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="bg-[#111] border border-white/8 rounded-2xl p-6">
      {/* Discord-style header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Image
            src={testimonial.avatar}
            alt={testimonial.username}
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-[#111]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {testimonial.username}
            </span>
            <span className="text-[10px] text-white/25">{testimonial.time}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-1 pl-[52px]">
        {testimonial.messages.map((msg, i) => (
          <p key={i} className="text-sm text-white/70 leading-relaxed">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0f0f0f] border-y border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            Proof
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Results from operators
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <DiscordMessage key={t.username} testimonial={t} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/20 mt-8 max-w-lg mx-auto leading-relaxed">
          Illustrative examples — not a guarantee of income. Results depend on
          effort, niche, and execution.
        </p>
      </div>
    </section>
  );
}
