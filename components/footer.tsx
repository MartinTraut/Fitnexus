import { Logo } from '@/components/ui/logo'
import Link from 'next/link'

const footerLinks = {
  Plattform: [
    { href: '/trainers', label: 'Trainer finden' },
    { href: '/how-it-works', label: 'So funktioniert\'s' },
    { href: '/pricing', label: 'Preise' },
    { href: '/for-coaches', label: 'Für Coaches' },
    { href: '/faq', label: 'FAQ' },
  ],
  'Städte': [
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
  Legal: [
    { href: '/about', label: 'Über uns' },
    { href: '/contact', label: 'Kontakt' },
    { href: '/impressum', label: 'Impressum' },
    { href: '/datenschutz', label: 'Datenschutz' },
    { href: '/agb', label: 'AGB' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[rgba(0,168,255,0.1)] bg-[#080C15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Die All-in-One Fitness Coaching Plattform für Trainer und Kunden.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground tracking-brand mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#00D4FF] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[rgba(0,168,255,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FITNEXUS. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Made with passion for fitness.
          </p>
        </div>
      </div>
    </footer>
  )
}
