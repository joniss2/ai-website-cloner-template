"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What exactly do I get?",
    a: "You get the complete Profit Phones system: 16 step-by-step tutorials, 7 plug-and-play automation workflows, 3 monetization playbooks, a proxy/SIM/device provider cheat sheet, access to the private operator community, and lifetime updates — everything you need to set up and scale a phone farm.",
  },
  {
    q: "How long does setup take?",
    a: "Most operators are up and running within a weekend. The tutorials walk you through every step — from sourcing devices to running automated posts — so you don't waste time figuring things out.",
  },
  {
    q: "Do I need technical experience?",
    a: "No. The course is designed for operators at every level. Each tutorial is step-by-step with screen recordings, so you can follow along even if you've never set up automation software before.",
  },
  {
    q: "What devices do I need?",
    a: "Both iPhone and Android are supported. You can start with a single device and scale from there. The system works with any budget — the tutorials cover budget device sourcing options too.",
  },
  {
    q: "Is this risk-free?",
    a: "We offer a 14-day guarantee. If you follow the steps and the system genuinely doesn't work for your setup, send us your configuration and we'll refund you in full.",
  },
  {
    q: "What platforms does this work on?",
    a: "The automations support TikTok, Instagram, and YouTube — the three largest short-form video platforms. The cross-platform posting workflow handles all three simultaneously.",
  },
];

function FaqItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white/80">{faq.q}</span>
        <span
          className={`flex-shrink-0 w-5 h-5 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M4.5 1v7M1 4.5h7"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-white/45 leading-relaxed pb-5 pr-8">
          {faq.a}
        </p>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-[#0f0f0f] border-t border-white/8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">
            Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ list */}
        <div className="bg-[#111] border border-white/8 rounded-2xl px-6">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
