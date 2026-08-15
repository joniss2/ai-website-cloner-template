import Image from "next/image";

const footerLinks = [
  { label: "Legal", href: "https://www.profitphones.com/legal" },
  { label: "Privacy", href: "https://www.profitphones.com/privacy" },
  { label: "Terms", href: "https://www.profitphones.com/terms" },
  { label: "Telegram", href: "https://t.me/+cf5ek5eWC_VjZjk0" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <Image
              src="https://www.profitphones.com/profitphones-logo.png"
              alt="Profit Phones"
              width={120}
              height={28}
              className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity"
              unoptimized
            />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-white/15 leading-relaxed mt-8 max-w-3xl">
          Earnings and income representations made by Profit Phones are
          aspirational statements only. Individual results will vary. This
          website contains testimonials that may not represent typical results.
          We make no guarantee that you will earn any money using the techniques
          and ideas in these materials.
        </p>
      </div>
    </footer>
  );
}
