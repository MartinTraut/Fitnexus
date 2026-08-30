import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import { Mail, MapPin, ShieldCheck } from 'lucide-react'

const footerLinks = {
  Plattform: [
    { href: '/trainers', label: 'Trainer finden' },
    { href: '/how-it-works', label: 'So funktioniert’s' },
    { href: '/pricing', label: 'Preise' },
    { href: '/for-coaches', label: 'Für Coaches' },
    { href: '/faq', label: 'FAQ' },
  ],
  Städte: [
    { href: '/city/berlin', label: 'Berlin' },
    { href: '/city/muenchen', label: 'München' },
    { href: '/city/hamburg', label: 'Hamburg' },
    { href: '/city/koeln', label: 'Köln' },
    { href: '/city/frankfurt', label: 'Frankfurt' },
    { href: '/city/stuttgart', label: 'Stuttgart' },
  ],
  Kategorien: [
    { href: '/category/personal-training', label: 'Personal Training' },
    { href: '/category/yoga', label: 'Yoga' },
    { href: '/category/krafttraining', label: 'Krafttraining' },
    { href: '/category/online-coaching', label: 'Online Coaching' },
    { href: '/category/ernaehrungsberatung', label: 'Ernährungsberatung' },
  ],
  Unternehmen: [
    { href: '/about', label: 'Über uns' },
    { href: '/contact', label: 'Kontakt' },
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/agb', label: 'AGB' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(0,168,255,0.1)] bg-[#080C15]">
      {/* Lichtkante am Übergang — trennt den Footer, ohne eine harte Linie zu ziehen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,168,255,0.35),rgba(0,255,148,0.25),transparent)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" />
            <p className="mt-4 t-body text-soft max-w-xs">
              Die All-in-One Coaching-Plattform für Trainer und Kunden.
            </p>
            <ul className="mt-6 space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-faint">
                <MapPin className="w-3.5 h-3.5 text-[#00A8FF]/60 flex-shrink-0" aria-hidden />
                Deutschlandweit &amp; online
              </li>
              <li>
                <a
                  href="mailto:hello@fitnexus.de"
                  className="flex items-center gap-2 text-sm text-faint hover:text-[#00D4FF] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-[#00A8FF]/60 flex-shrink-0" aria-hidden />
                  hello@fitnexus.de
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-faint">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FF94]/60 flex-shrink-0" aria-hidden />
                DSGVO-konform, Server in der EU
              </li>
            </ul>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <nav key={category} aria-label={category}>
              <h2 className="t-eyebrow text-faint mb-5">{category}</h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-soft hover:text-[#00D4FF] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-[rgba(0,168,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-faint">
            &copy; {new Date().getFullYear()} FITNEXUS. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-faint">
            Coaching-Plattform für Deutschland &middot; Betrieb und Support aus Deutschland
          </p>
        </div>
      </div>
    </footer>
  )
}
